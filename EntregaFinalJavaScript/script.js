document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.getElementById("contenedor");

    const formularioHTML = `
        <form id="formulario">
            <div class="row divForm">
                <div class="col">
                    <input type="text" class="form-control" id="nombreUsuario" placeholder="Nombre" aria-label="First name">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="apellidoUsuario"  placeholder="Apellido" aria-label="Last name">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="dniUsuario"  placeholder="Documento" aria-label="Documento">
                </div>

                <select class="form-select" id="select-comida" aria-label="Default select example">
                    <option selected>Seleccione una comida a su gusto</option>
                </select>

                <select class="form-select" id="select-bebida" aria-label="Default select example">
                    <option selected>Seleccione una bebida a su gusto</option>
                </select>

                <div class="col buttom"> 
                    <button type="submit" class="btn btn-outline-secondary" id="btnEnvio">Enviar</button>
                </div>
            </div> 
        </form>
    `;

    contenedor.innerHTML = formularioHTML;

    const PRODUCTOS_COMIDAS = []
    const PRODUCTOS_BEBIDAS =[]

    const agregarOpcionesComidas = () => {
    const menu_comida = document.getElementById("select-comida")
    PRODUCTOS_COMIDAS.forEach((producto) => {
        const opcion = document.createElement('option')
        opcion.value = producto.precio
        opcion.textContent = producto.comida  
        menu_comida.appendChild(opcion)
    });
    }

    const agregarOpcionesBebidas = () => {
    const menu_bebida = document.getElementById("select-bebida")
    PRODUCTOS_BEBIDAS.forEach((producto) => {
        const opcion = document.createElement('option')
        opcion.value = producto.precio
        opcion.textContent = producto.bebida  
        menu_bebida.appendChild(opcion)
    });
    }

    const menu = async () => {
    try{
        const resultado = await fetch('./productos.json')
        const datos = await resultado.json();
        datos.comidas.forEach(e => {
        let objetos = {
            comida: e.comida,
            precio: e.precio
        }
        PRODUCTOS_COMIDAS.push(objetos)
        console.log(PRODUCTOS_COMIDAS)
        })
        datos.bebidas.forEach(e => {
        let objetos = {
            bebida: e.bebida,
            precio: e.precio
        }
        PRODUCTOS_BEBIDAS.push(objetos)
        });
        agregarOpcionesComidas()
        agregarOpcionesBebidas()
    }catch (error) {
        console.error("error,",error)
    }
    }

    const nombre = document.getElementById("nombreUsuario")

    nombre.onmousedown = () => {
    console.log("down");
    };

    nombre.onkeyup = () => {
    console.log("keyup");
    };

    contenedor.onsubmit = (e) => {
    e.preventDefault()
    let infoUsuario = e.target;
    let nombreUsuario = infoUsuario.querySelector("#nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    localStorage.setItem("nombre", nombreUsuario);

    let mensaje = localStorage.getItem("nombre");
    console.log(mensaje);

    const usuario = { id: 4, Nombre: nombreUsuario + " " + apellido };
    const enJSON = JSON.stringify(usuario);
    localStorage.setItem("usuario", enJSON);

    let parseado1 = JSON.parse(enJSON);
    localStorage.setItem("usuarioID", parseado1.id);

    const dni = document.getElementById("dniUsuario")

    let valorDni = dni.value;
    localStorage.setItem("D.N.I", valorDni);

    let valorComida = document.getElementById("select-comida").value;
    localStorage.setItem("Comida", valorComida);

    let valorBebida = document.getElementById("select-bebida").value;
    localStorage.setItem("Bebida", valorBebida);
    };

    const boton = document.getElementById("btnEnvio")

    boton.onclick = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su pedido fue enviado',
        showConfirmButton: false,
        timer: 2500
    });
    }

    agregarOpcionesComidas();
    agregarOpcionesBebidas();
    menu();
});
