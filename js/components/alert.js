//FUNCION PARA DESHABILITAR Y HABILITAR LAS ENTRADAS MIENTRAS LA ALERTA ESTA ACTIVA
// CSS ALERT
export const ALERT_TYPE = {
    INFO: "alert--info",
    ERROR: "alert--error",
    WAIT: "alert--wait",
    SUCCESS: "alert--success",
    FATAL: "alert--fatal",
    ACTIVE: "alert--active",
    TEMP: {
      default: "alert--temp-default",
      info: "alert--temp-info",
      error: "alert--temp-error",
      success: "alert--temp-success",
    }
}
export const MESSAGE_TYPE = {
    // server message
    ERROR_SERVER: "Error en la respuesta del servidor",
    ERROR_DATA: "Error en el envio de los datos",
    INFO_LIMIT: "Se alcanzó el limite de caracteres",
    INFO_VACIO: "Complete los campos requeridos",
    SUCCESS_DATA: "Datos enviados satisfactoriamente",
    SUCCESS_SERVER: "Nuevo registro guardado",
    WAIT_POST: "Enviando datos al servidor..",
    WAIT_GET: "Esperando respuesta del servidor..",
    // client message
    ALERT: 'Complete todos los campos',
    ERROR: 'Ocurrió un error',
    ERROR_PASTE: 'Error al leer el portapapeles :(',
    NO_DISPONIBLE: 'Característica no agregada..',
    INVALIDO: 'El resgistro ingresado no es válido',
    DUPLICADO: 'Este registro ya existe!',
    SUCCESS: 'Datos guardados satisfactoriamente!',
    NO_SELECT: 'Seleccione una opción!',
    ESPERANDO: 'Procesando solicitud...',
    LOADING: 'Cargando datos...',
    CLAVE_INVALID: 'Contraseña inválida',
    LOGIN: 'Inicio de sesion exitoso',
    CLAVE_VALID: 'Contraseña correcta',
    NO_EXISTE: 'No se encontró ningún registro',
    COPY: 'Texto copiado!',
    COPY_NULL: 'Nada que copiar..',
    CLEAR_NULL: 'Nada que limpiar..',
    FORM_CLEAR: 'Formulario limpiado!',
    PASTE_ACCESS: 'Permita el Acceso al portapapeles',
    LOCK_STYLES: 'Estilos bloqueado',
    UNLOCK_STYLES: 'Estilos desbloqueado',
    PIN_SUCCESS: 'Elemento fijado',
    PIN_ERROR: 'Error al intentar fijar el elemento',
    SEARCH_DINAMYC: 'Búsqueda dinámica activada'
};

// Eliminar clases del tipo temp si ya existian
function setClassTemp(arrClass){
  const classTempArr = Array.from(arrClass).filter(clase => 
    clase.startsWith('alert--temp')
  );
  if(classTempArr.length > 0){
    classTempArr.forEach(clase => arrClass.remove(clase))
  }
}

export function borrarContenido(arr){
    arr.forEach(item => {
        if(item instanceof HTMLInputElement){
            return item.value = ''
        }else{
            return item.textContent = ''
        }
    })
};
export function inputDisabled(items){
    items.forEach(item =>{
        item.disabled = true
        item.dataset.type === 'button' ? item.style.cursor = 'not-allowed' : null
    })
};
export function inputEnabled(items){
    items.forEach(item =>{
        item.disabled = false
        item.dataset.type === 'button' ? item.style.cursor = 'pointer' : null
    })
};
export function createAlert(
  container, 
  message, 
  classAlert, 
  elementsForm, 
  timeTemp = 3000)
{
    inputDisabled(elementsForm)
    const alert = container

    const buttonExiste = document.querySelector('.alert button')
    const messageExiste = document.querySelector('.alert p')
    if(buttonExiste && messageExiste){
        alert.innerHTML = ''
    }
    alert.classList.add(ALERT_TYPE.ACTIVE)
  // -----------------------------------------------------------------
  //  ELIMINAR CLASES DUPLICADAS DEL TIPO 'alert--temp'
    setClassTemp(alert.classList)
  // -----------------------------------------------------------------------
    alert.classList.add(classAlert)

    const buttonAlert = document.createElement('button')
    buttonAlert.textContent = 'X'
    buttonAlert.type = 'button'
    const messageAlert = document.createElement('p')
    messageAlert.textContent = message
    alert.appendChild(messageAlert)
    alert.appendChild(buttonAlert)

    // CONTROLAR EL TIEMPO DE ESPERA DE LA ALERTA
    let timeOutID;
    if(Object.values(ALERT_TYPE.TEMP).includes(classAlert)){
        inputEnabled(elementsForm)
        timeOutID = setTimeout(() => {
            alert.classList.remove(ALERT_TYPE.ACTIVE)
            alert.classList.remove(classAlert)
        }, timeTemp)
    }

    buttonAlert.addEventListener('click', ()=>{
        inputEnabled(elementsForm)
        alert.classList.remove(ALERT_TYPE.ACTIVE)
      // limpiar timeouts si existen
        if(timeOutID) clearTimeout(timeOutID)
      // 
        setTimeout(()=>{
            alert.classList.remove(classAlert)
        }, 310)
        console.log("mostrarAlerta -> success");
    })
};