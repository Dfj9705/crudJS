const formulario = document.querySelector('form')
const btnGuardar = document.querySelector('#btnGuardar');
const btnBuscar = document.querySelector('#btnBuscar');
const btnModificar = document.querySelector('#btnModificar');
const btnCancelar = document.querySelector('#btnCancelar');
const btnLimpiar = document.querySelector('#btnLimpiar');
const tablaProductos = document.querySelector('#tablaProductos');

btnModificar.parentElement.style.display = 'none'
btnModificar.disabled = true;
btnCancelar.parentElement.style.display = 'none'
btnCancelar.disabled = true;

const guardar = async (e) => {
    e.preventDefault();


    if(validarFormulario(formulario, ['producto_id'])){
        
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
            alert(mensaje)

            switch (codigo) {
                case 1:
                    formulario.reset();
                    buscar()
                    break;
                case 0:
                    console.log(detalle)

                    break;
            
                default:
                    break;
            }

           
        } catch (error) {
            console.log(error)
        }
        

    }else{
        alert('Debe llenar todos los datos')
        
        return;

    }
}

const buscar = async e => {
    e && e.preventDefault();
    let nombre = formulario.producto_nombre.value
    let precio = formulario.producto_precio.value
    const url = `/crudJS/controllers/productos/index.php?producto_nombre=${nombre}&producto_precio=${precio}`
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

                
                btnModificar.classList.add('btn', 'btn-warning')
                btnModificar.innerText = 'Modificar'
                btnModificar.addEventListener('click', () => llenarDatos(producto) )
                btnEliminar.innerText = 'Eliminar'
                btnEliminar.classList.add('btn', 'btn-danger')
                btnEliminar.addEventListener('click', () => eliminar(producto.PRODUCTO_ID) )
                
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
   
    removerValidaciones(formulario);
    formulario.producto_id.value = producto.PRODUCTO_ID
    formulario.producto_nombre.value = producto.PRODUCTO_NOMBRE
    formulario.producto_precio.value = producto.PRODUCTO_PRECIO
    
    tablaProductos.parentElement.parentElement.style.display = 'none'
    btnGuardar.parentElement.style.display = 'none'
    btnGuardar.disabled = true;
    btnBuscar.parentElement.style.display = 'none'
    btnBuscar.disabled = true;
    btnLimpiar.parentElement.style.display = 'none'
    btnLimpiar.disabled = true;

    btnModificar.parentElement.style.display = ''
    btnModificar.disabled = false;
    btnCancelar.parentElement.style.display = ''
    btnCancelar.disabled = false;
}

const limpiar = (e) => {
    e.preventDefault()
    removerValidaciones(formulario);
    formulario.reset();
}

const cancelar = () => {

    formulario.reset();
    removerValidaciones(formulario);
    tablaProductos.parentElement.parentElement.style.display = ''
    btnGuardar.parentElement.style.display = ''
    btnGuardar.disabled = false;
    btnBuscar.parentElement.style.display = ''
    btnBuscar.disabled = false;
    btnLimpiar.parentElement.style.display = ''
    btnLimpiar.disabled = false;

    btnModificar.parentElement.style.display = 'none'
    btnModificar.disabled = true;
    btnCancelar.parentElement.style.display = 'none'
    btnCancelar.disabled = true;
}

const modificar = async (e) => {
    e.preventDefault();


    if(validarFormulario(formulario)){
        
        const formData = new FormData(formulario);
        formData.append('tipo', 2)
        const url = `/crudJS/controllers/productos/index.php`
        const config = {
            method : 'POST',
            body: formData
        }
        try {
           
            const respuesta = await fetch(url, config);  
            const data = await respuesta.json();  
            
            const {codigo, mensaje,detalle} = data;
            alert(mensaje)

            switch (codigo) {
                case 1:
                    formulario.reset();
                    buscar()
                    cancelar();
                    break;
                case 0:
                    console.log(detalle)

                    break;
            
                default:
                    break;
            }

           
        } catch (error) {
            console.log(error)
        }
        

    }else{
        alert('Debe llenar todos los datos')
        
        return;

    }
}

const eliminar = async (id) => {

    if(confirm('¿Esta seguro que desea eliminarlo?')){
        
        const formData = new FormData();
        formData.append('tipo', 3)
        formData.append('producto_id', id)
        const url = `/crudJS/controllers/productos/index.php`
        const config = {
            method : 'POST',
            body: formData
        }
        try {
           
            const respuesta = await fetch(url, config);  
            const data = await respuesta.json();  
            
            const {codigo, mensaje,detalle} = data;
            alert(mensaje)

            switch (codigo) {
                case 1:
                    buscar()
                    break;
                case 0:
                    console.log(detalle)

                    break;
            
                default:
                    break;
            }

           
        } catch (error) {
            console.log(error)
        }
        

    }
}

buscar();
formulario.addEventListener('submit', guardar )
btnBuscar.addEventListener('click', buscar)
btnCancelar.addEventListener('click', cancelar)
btnLimpiar.addEventListener('click', limpiar)
btnModificar.addEventListener('click', modificar)