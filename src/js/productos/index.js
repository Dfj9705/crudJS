const formulario = document.querySelector('form')
const alerta = document.querySelector('#alert')

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

formulario.addEventListener('submit', guardar )