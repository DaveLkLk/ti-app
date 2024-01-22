import { createAlert, ALERT_TYPE } from "./alert.js"

export const getTextPaste = async ()=>{
  let stateResponse = {}
  try{
    const response = await navigator.clipboard.readText()
    !response || response.trim() === '' 
    ? stateResponse.error = 'Portapapeles vacío \n No se pudo recuperar el texto'
    : stateResponse.msg = response
    return stateResponse;
  }catch(err){
    // console.log(err)
    stateResponse.error = 'Error al obtener el texto del portapapeles';
    throw stateResponse;
  }
}
// ---------------
const typesImage = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'xbm': 'image/x-xbitmap'

}
// problemas en esta funcion, no devuelve el elemento copiado del portapeles, aaaaaaaaaaaaaaaaaaaaaaa ctm
export const getTypePaste = async ()=>{
  let stateResponse = {}
  try{
    const response = await navigator.clipboard.read()
      // validar la existencia de datos
    if(!response || response.length === 0){
      stateResponse.error = 'Portapapeles vacío'
      return stateResponse;
    }
    // 
    console.log(response)
    for (const item of response) {
      let itemType = item.type;
      console.log(item)
      if( itemType.startsWith('text/') ){
        item.getAsString(text =>{
          console.log("texto copiado bro", text)
        })
        stateResponse.msg = item.text;
      }
      else if(Object.values(typesImage).includes(itemType)){
        alert("es una imagen bro")
      }
      else{
        console.log("ni texto ni imagen bro")
      console.log(item)
      }
    }
    return stateResponse;
  }
  catch(err){
   stateResponse.error = 'Ocurrio un error al intentar obtener contenido del portapapeles'; 
  }
}
// escribir al portapapeles
export const setClipboard = async (text)=>{
  let stateResponse = {}
  try{
    await navigator.clipboard.writeText(text)
    stateResponse.msg = 'Texto copiado al portapapeles'
    stateResponse.success = true
    return stateResponse;
  }catch(err){
    stateResponse.error = 'Error al intentar copiar texto al portapapeles';
    stateResponse.success = false
  }
}

// CONTROLAR LOS ESTILOS DEL TEXTO
const typeStyles = {
  bold: 'txt_bold',
  italic: 'txt_italic',
  strike: 'txt_strike',
  underline: 'txt_underline',
}
export function clearStyles(container, output){
  if(!(container instanceof HTMLDivElement)){
    console.log("no es contenedor html")
    return
  }
  const classActive = container.dataset.active;
  const buttons = container.querySelectorAll('button.btn_style');
  buttons.forEach(btn => btn.classList.remove(classActive))
  // QUITAR LOS ESTILOS DE CLASE AL OUTPUT
  const outputStyles = Array.from(output.classList);
  const listStyles = Object.values(typeStyles);
  outputStyles.filter(style => listStyles.includes(style)).forEach(classnames => {
    output.classList.remove(classnames);
  })
  // QUITAR LA CLASE CLEAR ACTIVE
  const btnClear = container.querySelector('#btn_clear-space');
  btnClear.classList.remove(`${btnClear.dataset.class}--active`)
}
export function typeStyleText(containerBTN, output){
  containerBTN.addEventListener('click', e =>{
    const classActive = containerBTN.dataset.active;
    const isBtnStyle = e.target.className.includes('btn_style');
    const isBtnClear = e.target.id === 'btn_clear-space';
    if(isBtnStyle){
      e.target.classList.toggle(classActive);
      const styleBtn = typeStyles[e.target.id]
      if(styleBtn){
        output.classList.toggle(styleBtn)
      }
    }
    if(isBtnClear){
      
    }
    
  })
}
// QUITAR ESPACIOS EN BLANCO SOBRANTES
export function clearText(txt){
  if(typeof txt !== 'string'){
    throw new Error("parametro asignado no es string")
  }
  const trims = {
    SPACES: txt.replace(/\s+/g, ' ').trim(),
    LOWER_SPACES: txt.replace(/\s+/g, ' ').trim().toLowerCase(),
    NO_SPACES: txt.replace(/\s+/g, ''),
    LOWER_NO_SPACES: txt.toLowerCase().replace(/\s+/g, '').trim(),
  }
  return trims;
}
export function clearSpaceActive(target, output){
  const isActive = target.classList.contains(`${target.dataset.class}--active`)
  let isclearActive = false
  if(isActive){
    output.value = clearText(output.value).SPACES
    isclearActive = true
  }
  return isclearActive
}
// ANIMACION CON ADICION DE CLASES
export function elementAnimation(elm, classname, time = 900){
  
  if(elm instanceof HTMLElement){
    elm.classList.add(classname)
    const timeOut = setTimeout(()=>{
      elm.classList.remove(classname)
    },time)
    return timeOut;
  }
}

// SECCION CRUD DEL TEXTO
export function generateId() {
  const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_';

  let id = '';
  for (let i = 0; i < 20; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    id += caracteresPermitidos.charAt(indiceAleatorio);
  }
  return id;
}
export function setCountIndicator(obj){
  if(!(obj instanceof Object)){
    console.log("Parámetro no es instancia de object");
    return
  }
    const listCardTxt = Array.from(obj.childrens())
    obj.setcount.textContent = listCardTxt.length;
}
export function deleteCardTxt(container, id){
  const cardToDelete = document.getElementById(id);
  if(cardToDelete){
    container.removeChild(cardToDelete);
    return true;
  }
  else{
    console.log("Error al intentar eliminar el elemento")
    return false;
  }
}
export function setFixCard(obj){
  if(typeof obj !== "object"){
    return console.log("Error de parámetro a la función")
  }
  obj.fixTitle.textContent = obj.title.textContent
  obj.fixContent.textContent = obj.content.textContent
}
export function validateResponse(obj){
  if(!(obj instanceof Object)){
    return "Se esperaba un objeto";
  }
  const divAlert = document.querySelector('.alert')
  if(obj?.success === undefined){
    console.log("No se encontró la propiedad success en el objeto")
    return
  }
  if(obj?.success === false){
    createAlert(divAlert, obj.msg, ALERT_TYPE.TEMP.error, [], 1000);
    return
  }
  if(obj?.success === true){
    createAlert(divAlert, obj.msg, ALERT_TYPE.TEMP.success, [], 1000);
    return
  }
}
export function addLocalStorage(key, value){
  if(typeof key !== 'string' || typeof value !== 'string'){
    console.log("Error al intentar guardar item, parámetros no contemplados",key,value);
    return
  }
  window.localStorage.setItem(key, value)
}
export function deleteLocalStorage(key, value){
  if(typeof key !== 'string' || typeof value !== 'string'){
    console.log("Error al intentar eliminar item, parámetros no contemplados");
    return
  }
  window.localStorage.removeItem(key, value)
}
