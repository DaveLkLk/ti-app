import { svgCopy, svgDelete, svgPin } from './icons.js';
import { generateId } from './window-functions.js'

export function createCardText(obj) {
  if(!(obj instanceof Object)){
    throw new Error('No se recibio un objeto para crear la tarjeta de texto');
  }
  const tagId = generateId();
  const cardId = `card_groupname:${obj.group}:${tagId}`;
  const cardText = document.createElement('div');
  cardText.id = cardId;
  cardText.classList.add('group_data-txt')
  cardText.setAttribute('data-class', 'group_data-txt')
  // ESTABLECER LOS DATOS
  cardText.innerHTML = `
    <div class="form_group-col4">
      <span class="label-line label-btn" data-for="button" title="click para mostrar contenido">${obj.title}</span>
      <button class="btn_icon btn_fixed" id="${cardId}-fix" data-for="pinCard" title="fijar elemento">
        ${svgPin()}
      </button>
      <button class="btn_icon btn_copy" type="button" data-for="copyContent" title="copiar contenido">
        ${svgCopy()}
      </button>
      <button class="btn_icon btn_delete" id="${cardId}" data-for="deleteCard" title="eliminar título">
        ${svgDelete()}
      </button>
    </div>
    <div class="data_txt-tooltip">
      <div class="tooltip_container">
        <h3 class="tooltip-title">${obj.title}</h3>
        <p class="tooltip-content">${obj.content}</p>
      </div>
    </div>
  `;
  return cardText;
}
export function createOfficeCard(obj){
  if(!(obj instanceof Object)){
    throw new Error('No se recibio un objeto para crear la tarjeta de texto');
  }
  const tagId = generateId();
  const div = document.createElement('div')
  div.classList.add('office_result-card')
  div.title = `id: ${obj.id}`
  div.id = `office-card-${tagId}`;
  div.innerHTML = `
    <div class="anexo_container">
      <span class="anexo" title="anexo">${obj.anexo}</span>
    </div>
    <div class="oficina_container">
      <span class="oficina" title="oficina">${obj.office}</span>
    </div>
  `;
  return div
}