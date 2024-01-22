import {createAlert, ALERT_TYPE, MESSAGE_TYPE} from "../components/alert.js";
import { setCountIndicator, getTextPaste, clearText, deleteCardTxt } from "../components/window-functions.js";
import { createCardText } from "../components/layout.js";
import { setClipboard, setFixCard, validateResponse } from "../components/window-functions.js";


export function getEvents(section){
  const divAlert = document.querySelector('.alert')
  const formCrud = section.querySelector('.form_txt-crud');
  const groupCardText = section.querySelector('.group_data-content');
  const indicatorCount = section.querySelector('#indicator-count');
  const indicatorGroup = section.querySelector('#indicator-title');
  const updateIndicators = {
    arr: groupCardText,
    setcount: indicatorCount,
    childrens: () => groupCardText.querySelectorAll('.group_data-txt')
  }
  const crudContent = formCrud.querySelector('#txt_content');
  const btnCrudPaste = section.querySelector('#btn-form_crud-paste');
  const crudTitle = formCrud.querySelector('#txt_title');
  const crudGroup = formCrud.querySelector('#txt_group');
  crudGroup.addEventListener('input', ()=>{
    let inpvalue = crudGroup.value;
    let maxCharacter = 18
    if(inpvalue.length > maxCharacter){
      crudGroup.value = inpvalue.slice(0, maxCharacter);
    }
  })
btnCrudPaste.addEventListener('click', async () =>{
  const text = await getTextPaste()
  if(text?.error?.length > 0){
    createAlert(divAlert, text.error, ALERT_TYPE.ERROR, formElements().formData,2500);
    return
  }else{
    crudContent.value = String(text.msg);
  }
})

formCrud.addEventListener('submit', (e)=>{
  e.preventDefault();
  const txtTitle = crudTitle.value;
  const txtContent = crudContent.value;
  const txtGroup = crudGroup.value;

  // SANITIZACION DE LOS DATOS
  const clearTitle = clearText(txtTitle).SPACES;
  const clearContent = clearText(txtContent).SPACES;
  const cleaGroup = clearText(txtGroup).SPACES;
  if(clearTitle === '' || clearContent === '' || cleaGroup === ''){
    createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.INFO, []);
  }
  else{
    const objForm = {
      title: clearText(txtTitle).SPACES,
      content: txtContent,
      group: clearText(txtGroup).LOWER_NO_SPACES,
      cardLenght: Array.from(groupCardText.children).length + 1
    }
    groupCardText.innerHTML += createCardText(objForm).outerHTML;
    setCountIndicator(updateIndicators)
    formCrud.reset();
  }
})

groupCardText.addEventListener('click', async e =>{
  const isLabel = e.target.classList.contains('label-btn')
  if(isLabel){
    const containerLabel = e.target.parentNode.parentNode;
    const parentClass = containerLabel.dataset.class;
    const listCardsGroup = Array.from(updateIndicators.childrens())
    if(containerLabel.classList.contains(`${parentClass}--active`)){
      containerLabel.classList.toggle(`${parentClass}--active`, false);
      return
    }
    listCardsGroup.forEach(card => card.classList.remove(`${parentClass}--active`))
    containerLabel.classList.toggle(`${parentClass}--active`)
    return
  }
  const isBtnDelete = e.target.tagName === 'BUTTON' && e.target.getAttribute('data-for') === 'deleteCard';
  if(isBtnDelete){
    deleteCardTxt(groupCardText, e.target.id)
    setCountIndicator(updateIndicators)
    return
  }
  const isBtnCopy = e.target.tagName === 'BUTTON' && e.target.getAttribute('data-for') === 'copyContent'
  if(isBtnCopy){
    const parent = e.target.parentNode.parentNode
    const content = parent.querySelector('.tooltip-content').textContent
    const stateCopy = await setClipboard(content)
    validateResponse(stateCopy)
    return
  }
  const isBtnFixed = e.target.tagName === 'BUTTON' && e.target.getAttribute('data-for') === 'pinCard'
  if(isBtnFixed){
    const parent = e.target.parentNode.parentNode
    const objFix = {
      title: parent.querySelector('.tooltip-title'),
      content: parent.querySelector('.tooltip-content'),
      group: e.target.closest('.card_group'),
      fixTitle: e.target.closest('.card_group').querySelector('#fix-data-title'),
      fixContent: e.target.closest('.card_group').querySelector('#fix-data-text'),
    }
    setFixCard(objFix)
    createAlert(divAlert, MESSAGE_TYPE.PIN_SUCCESS, ALERT_TYPE.TEMP.success, [], 900)
  }
})

document.addEventListener('click', e =>{
  // Ocultar el modal style si pierde el focus
  const isLabelBtn = e.target.classList.contains('label-btn')
  if(!isLabelBtn){
    const parentsLabelBtn = updateIndicators.childrens();
    parentsLabelBtn.forEach(parent =>{
      parent.classList.remove(`${parent.dataset.class}--active`);
    })
  }
})
document.addEventListener('DOMContentLoaded', ()=>{
  setCountIndicator(updateIndicators)
  console.log("dom content loaded");
})
}
