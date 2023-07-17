const formulario = document.querySelector('form')
const alerta = document.querySelector('#alert')
const btnBuscar = document.querySelector('#btnBuscar');
const tablaProductos = document.querySelector('#tablaProductos');

alerta.style.display = 'none'

const guardar = async (e) => {
    e.preventDefault();


    if(validarFormulario(formulario, ['producto_id'])){
        alerta.classList.remove('alert-warning')
        alerta.textContent = ''
        alerta.style.display = 'none'

        const formData = new FormData(formulario);
        formData.append('tipo', 1)
        formData.delete('producto_id')
        const url = `/crudJS/controllers/productos/index.php`
        const config = {
            method : 'POST',
            body: formData
        }
        try {
           
            const respuesta = await fetch(url, config);  
            const data = await respuesta.json();  
            
            const {codigo, mensaje,detalle} = data;

            switch (codigo) {
                case 1:
                    alerta.classList.add('alert-success')
                    formulario.reset();
                    buscar()
                    break;
            
                default:
                    break;
            }
            alerta.textContent = mensaje
            alerta.style.display = ''
           
        } catch (error) {
            console.log(error)
        }
        

    }else{
        alerta.classList.add('alert-warning')
        alerta.textContent = 'Debe llenar todos los datos'
        alerta.style.display = ''
        return;

    }
}

const buscar = async e => {
    e && e.preventDefault();
    const url = `/crudJS/controllers/productos/index.php`
    const config = {
        method : 'GET'
    }
    try {
           
        const respuesta = await fetch(url, config);  
        const data = await respuesta.json();  
        tablaProductos.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        if(data.length > 0){
            let contador = 1;
            data.forEach(producto => {
                const tr = tablaProductos.tBodies[0].insertRow(-1);
                const tdNo= tr.insertCell(0)
                const tdNombre= tr.insertCell(1)
                const tdPrecio= tr.insertCell(2)
                const tdModificar= tr.insertCell(3)
                const tdEliminar= tr.insertCell(4)

                const btnModificar = document.createElement('button')
                const btnEliminar = document.createElement('button')

                btnModificar.addEventListener('click', () => llenarDatos(producto) )

                btnModificar.classList.add('btn', 'btn-warning')
                btnModificar.innerText = 'Modificar'
                btnEliminar.innerText = 'Eliminar'
                btnEliminar.classList.add('btn', 'btn-danger')

                tdNo.textContent = contador++
                tdNombre.textContent = producto.PRODUCTO_NOMBRE
                tdPrecio.textContent = producto.PRODUCTO_PRECIO
                tdModificar.appendChild(btnModificar)
                tdEliminar.appendChild(btnEliminar)
            });

        }else{
            const tr = document.createElement('tr')
            const td = document.createElement('td')

            td.colSpan = 5
            td.innerText = 'No hay productos disponibles'

            tr.appendChild(td)
            fragment.appendChild(tr)
        }
        tablaProductos.tBodies[0].appendChild(fragment)

       
    } catch (error) {
        console.log(error)
    }
    
}

const llenarDatos = (producto) => {
    formulario.producto_id.value = producto.PRODUCTO_ID
    formulario.producto_nombre.value = producto.PRODUCTO_NOMBRE
    formulario.producto_precio.value = producto.PRODUCTO_PRECIO
}

buscar();
formulario.addEventListener('submit', guardar )
btnBuscar.addEventListener('click', buscar)