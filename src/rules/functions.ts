import { createAlert, ALERT_TYPE } from "../components/alert"
import { ClipBoard, ObjectParam, StorageParam, TypeStyles } from "./types"

export const getTextPaste = async ()=>{
    let stateResponse:ClipBoard = {}
  try{
    const response = await navigator.clipboard.readText()
    !response || response.trim() === '' 
    ? stateResponse.err = 'Portapapeles vacío \n No se pudo recuperar el texto'
    : stateResponse.msg = response
    return stateResponse;
  }catch(err) {
    console.log(err);
    stateResponse.err = 'Error al obtener el texto del portapapeles';
    throw stateResponse;
  }
}
// ---------------
const typesImage = Object.freeze({
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'tiff': 'image/tiff',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'xbm': 'image/x-xbitmap'
});

// escribir al portapapeles
export const setClipboard = async (text:string)=>{
  let stateResponse:ClipBoard = {}
  try{
    await navigator.clipboard.writeText(text)
    stateResponse.msg = 'Texto copiado al portapapeles'
    stateResponse.success = true
    return stateResponse;
  }catch(err){
    stateResponse.err = 'Error al intentar copiar texto al portapapeles';
    stateResponse.success = false
  }
}

// CONTROLAR LOS ESTILOS DEL TEXTO
const typeStyles:TypeStyles = {
  bold: 'txt_bold',
  italic: 'txt_italic',
  strike: 'txt_strike',
  underline: 'txt_underline',
}
export function clearStyles(container:HTMLElement, output:HTMLElement){
  if(!(container instanceof HTMLDivElement)){
    console.log("no es contenedor html")
    return
  }
  const classActive = container.dataset.active || '';
  const buttons = container.querySelectorAll('button.btn_style');
  buttons.forEach(btn => btn.classList.remove(classActive))
  // QUITAR LOS ESTILOS DE CLASE AL OUTPUT
  const outputStyles = Array.from(output.classList);
  const listStyles = Object.values(typeStyles);
  outputStyles.filter(style => listStyles.includes(style)).forEach(classnames => {
    output.classList.remove(classnames);
  })
  // QUITAR LA CLASE CLEAR ACTIVE
  const btnClear = container.querySelector('#btn_clear-space') as HTMLElement;
  btnClear.classList.remove(`${btnClear.dataset.class}--active`)
}
export function typeStyleText(containerBTN:HTMLElement, output:HTMLElement){
  containerBTN.addEventListener('click', (e) =>{
    const classActive = String(containerBTN.dataset.active);
    const isBtnStyle = e.target instanceof HTMLElement && e.target.className.includes('btn_style');
    // const isBtnClear = e.target.id === 'btn_clear-space';
    if(isBtnStyle){
      e.target.classList.toggle(classActive);
      const styleBtn = typeStyles[e.target.id as keyof TypeStyles];
      if(styleBtn){
        output.classList.toggle(styleBtn)
      }
    }
  })
}
// QUITAR ESPACIOS EN BLANCO SOBRANTES
export function clearText(txt:string){
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
export function clearSpaceActive(target:HTMLElement, output:(HTMLTextAreaElement | HTMLInputElement)){
  const isActive = target.classList.contains(`${target.dataset.class}--active`)
  let isclearActive = false
  if(isActive){
    output.value = clearText(output.value).SPACES
    isclearActive = true
  }
  return isclearActive
}
// ANIMACION CON ADICION DE CLASES
export function elementAnimation(elm:HTMLElement, classname:string, time:number = 900){
    elm.classList.add(classname)
    const timeOut = setTimeout(()=>{
      elm.classList.remove(classname)
    },time)
    return timeOut;
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
export function setCountIndicator(obj:ObjectParam){
    const listCardTxt = obj.childrens ? Array.from(obj.childrens()) : []
    obj.setcount ? obj.setcount.textContent = listCardTxt.length.toString() : null
}
export function deleteCardTxt(container:HTMLElement, id:string){
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
export function setFixCard(obj:ObjectParam){
  obj.fixTitle && obj.title ? obj.fixTitle.textContent = obj.title.textContent : null;
  obj.fixContent && obj.content ? obj.fixContent.textContent = obj.content.textContent : null;
}
export function validateResponse(obj:ObjectParam){
  const divAlert = document.querySelector('.alert') as HTMLElement
  const msg = obj.msg ? obj.msg : 'no se pudo obtener el mensage'
  if(obj?.success === undefined){
    console.log("No se encontró la propiedad success en el objeto")
    return
  }
  if(obj?.success === false){
    createAlert(divAlert, msg, ALERT_TYPE.TEMP.error, [], 1000);
    return
  }
  if(obj?.success === true){
    createAlert(divAlert, msg, ALERT_TYPE.TEMP.success, [], 1000);
    return
  }
}
export function addLocalStorage(key:string, value:string): void {
 window.localStorage.setItem(key, value)
}
export function deleteLocalStorage(key:string):void {
  window.localStorage.removeItem(key)
}