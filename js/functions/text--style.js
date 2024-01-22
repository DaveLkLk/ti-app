import { createAlert, ALERT_TYPE, MESSAGE_TYPE } from "../components/alert.js";
import { getTextPaste, setClipboard } from "../components/window-functions.js";
import { clearText, typeStyleText, validateResponse } from "../components/window-functions.js";
import { elementAnimation, clearSpaceActive, clearStyles, addLocalStorage } from "../components/window-functions.js";

const divAlert = document.querySelector('.alert');

export const stylesLocalStorage = {
  STYLES_BLOQUED: 'style-bloqued',
  BTN_CLEAR: 'btn-clear'
}

function formElements(section){
  const formData = {
    input: section.querySelector('#text_input'),
    option: section.querySelector('#select_text'),
    inputValue: section.querySelector('#text_input').value,
    optionValue: section.querySelector('#select_text').value,
    formData: section.querySelectorAll('.form-panel input, .form-panel select, .form-panel button, .form-panel textarea')
  }
  return formData;
}


function pasteText(btn, element){
  btn.addEventListener('click', async () => {
    try {
      const textPaste = await getTextPaste()

      if(textPaste?.error?.length > 0){
        createAlert(divAlert, textPaste.error, ALERT_TYPE.ERROR, formElements().formData,2500);
        return
      }
      if(textPaste?.msg?.length > 0){
        element.value = textPaste.msg;
      }
    } catch (error) {
      createAlert(divAlert, error.error, ALERT_TYPE.ERROR, [],2500);
      console.log(error)
    }
  })
}

export function getEvents(section){
  const formText = section.querySelector('#form_text');
  const textOutput = section.querySelector('#text_output');
  const btnCopy = section.querySelector('#btn_copy');
  const btnPaste = section.querySelector('#btn_paste');
  
  const btnLockStyles = section.querySelector('#btn_lock_styles');
  const btnStyleAction = section.querySelector('#btn_styles');
  const containerCfgStyle = section.querySelector('#cfg-styles');
  const btnClearSpace = section.querySelector('#btn_clear-space');

  pasteText(btnPaste, formElements(section).input)

  const lockActive = window.localStorage.getItem(stylesLocalStorage.STYLES_BLOQUED)
  if(lockActive === 'true'){
    const clearActive = window.localStorage.getItem(stylesLocalStorage.BTN_CLEAR)
    clearActive === 'true' ? btnClearSpace.classList.add(`${btnClearSpace.dataset.class}--active`) : null
    btnLockStyles.classList.add(`${btnLockStyles.dataset.class}--active`)
  }

  function validateElementActive(element){
    if(!(element instanceof HTMLElement)){
      throw new Error("Parámetro inválido", element)
    }
    const classActive = `${element.dataset.class}--active`;
    element.classList.toggle(classActive);

    const isActive = element.classList.contains(`${element.dataset.class}--active`);
    if(isActive){
      element.setAttribute('title', 'estilos bloqueado')
      createAlert(divAlert, MESSAGE_TYPE.LOCK_STYLES, ALERT_TYPE.TEMP.success, [], 1100)
    }
    else if(isActive === false){
      element.setAttribute('title', 'estilos desbloqueado')
    }
    return isActive
  }

  
  formText.addEventListener('submit', e =>{
    e.preventDefault();
    if(formElements(section).inputValue === ''){
      createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.INFO, formElements(section).formData);
      elementAnimation(formElements(section).input, 'text_input--active', 900)
      return
    }
    const text = formElements(section).inputValue;
    const option = formElements(section).optionValue;
    const Output = new OutputText(text, option);
    const result = Output.validateOption();
    textOutput.value = result;
    clearSpaceActive(btnClearSpace, textOutput);
    // estilos al textarea de salida
    textOutput.style.height = 'auto';
    textOutput.style.height = (textOutput.scrollHeight) + 'px';
  })
  
  formText.addEventListener('reset', () =>{
    textOutput.value = '';
    textOutput.style.height = '32px';
  
    const dataClassLock = btnLockStyles.dataset.class;
    const isBtnLockActive = btnLockStyles.classList.contains(`${dataClassLock}--active`);
    !isBtnLockActive ? clearStyles(containerCfgStyle, textOutput) : null
    
    if(formElements(section).inputValue === ''){
      elementAnimation(formElements(section).input, 'text_input--active', 900)
      createAlert(divAlert, MESSAGE_TYPE.CLEAR_NULL, ALERT_TYPE.TEMP.info, formElements(section).formData, 1000)
    }else{
      createAlert(divAlert, MESSAGE_TYPE.FORM_CLEAR, ALERT_TYPE.TEMP.default, formElements(section).formData, 700)
      }
  })
   // mejorar aqui
   btnCopy.addEventListener('click', async() =>{
    if(textOutput.value === ''){
      createAlert(divAlert, MESSAGE_TYPE.COPY_NULL, ALERT_TYPE.TEMP.info, [], 1100)
      return
    }
    const stateRes = await setClipboard(textOutput.value);
    validateResponse(stateRes);
    createAlert(divAlert, MESSAGE_TYPE.COPY, ALERT_TYPE.TEMP.success, [], 1000);
  })
  
  btnStyleAction.addEventListener('click', () =>{
    btnStyleAction.classList.toggle(`${btnStyleAction.dataset.class}--active`);
  })
  // ESTILOS AL TEXTO DE RESULTADO
  typeStyleText(containerCfgStyle, textOutput)
  
  btnLockStyles.addEventListener('click', ()=>{
    const isActive = validateElementActive(btnLockStyles);
    addLocalStorage(stylesLocalStorage.STYLES_BLOQUED, String(isActive))
  })
  btnClearSpace.addEventListener('click', e => {
    // e.target.classList.toggle(`${e.target.dataset.class}--active`)
    const clearActive = validateElementActive(e.target)
    clearSpaceActive(e.target, textOutput)
    addLocalStorage(stylesLocalStorage.BTN_CLEAR, String(clearActive))
  })
  document.addEventListener('click', e =>{
    if(!containerCfgStyle.contains(e.target) && !btnStyleAction.contains(e.target)){
      btnStyleAction.classList.remove(`${btnStyleAction.dataset.class}--active`);
    }
  })
}
  class OutputText {
    constructor(text, opt){
      this.text = text,
      this.option = opt
    }
    textNormal() {
      const txtCleared = clearText(this.text).SPACES;
      const textResult = txtCleared.toLowerCase().replace(/^\w/, match => match.toUpperCase());
      return textResult+"."
    }
    textCapitalize(){
      return this.text.toLowerCase().replace(/\b\w/g, function(match) {
        return match.toUpperCase();
      });
    }
    validateOption(){
      const txtValue = String(this.text);
      const optValue = String(this.option);
      const typeOptions = {
        text_upper: txt => txt.toUpperCase(),
        text_lower: txt => txt.toLowerCase(),
        text_capital: () => this.textCapitalize(),
        text_normal: () => this.textNormal()
      };
      if (!(optValue in typeOptions)) {
        throw new Error("Invalid text type");
      }
      return typeOptions[optValue](txtValue);
    }
  }