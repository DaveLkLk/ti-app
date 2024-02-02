import { svgConfig, svgLupa, svgPaste } from "../components/icons.js";
import { getEvents } from "../functions/text--crud.js";

function pageTitleCRUD(){
    const div = document.createElement("div");
    div.classList.add('content_title')
    div.innerHTML = `
        <h1 class="text_title">Gestión de textos almacenados</h1>
    `;
    return div;
}
function pageContentCRUD(){
    const div = document.createElement('div');
    div.classList.add('content_crud')
    div.innerHTML = `
    <div class="section_crud crud_form-container">
    <!-- INSERTAR TEXTO -->
    <div class="crud_form">
      <form class="form-panel form_txt-crud">
        <div class="form_group">
          <label class="label" for="txt_content">Inserte texto:</label>
          <div class="form_group-row">
            <input type="text" class="form_input" id="txt_content">
            <button class="btn_paste btn_icon btn_change" id="btn-form_crud-paste" data-type="button" type="button" title="Pegar último texto copiado">
              ${svgPaste()}
            </button>
          </div>
        </div>
        <div class="form_group">
          <label class="label" for="txt_title">Inserte título del texto</label>
          <input type="text" class="form_input" title="alias del texto a guardar" id="txt_title">
        </div>
        <div class="form_group">
          <label class="label" for="txt_group">Inserte grupo del texto</label>
          <input type="text" class="form_input" title="necesario para agrupar titulos bajo un contexto" id="txt_group">
        </div>
        <div class="form_group">
          <button class="btn_form btn_submit" type="submit" id="btn_txt-submit">GUARDAR</button>
        </div>
      </form>
    </div>
  </div>
  <div class="section_crud crud_response-container">
    <!-- BUSCAR TEXTO -->
    <div class="crud_response-item crud_found">
      <form class="form_found">
        <div class="form_found-group found_options">
          <div class="found_options-group" data-title="buscar por">
            <select id="found-select" class="found_opt found_select">
              <option value="null" selected>ninguno</option>
              <option value="title">título</option>
              <option value="group">grupo</option>
            </select>
          </div>
        </div>
        <div class="form_found-group found_search">
          <input type="search" id="found-search" class="found_opt found_inp" placeholder="buscar por..">
        </div>
        <div class="form_found-group found_submit">
          <button type="submit" class="btn_icon btn_found">
            ${svgLupa()}
          </button>
        </div>
      </form>
    </div>
    <!-- CONTAINER GROUPS -->
    <div class="crud_response-item cards_group-container">
      <!-- CADA GRUPO - grupo 1 -->
      <div class="card_group" data-group="group 1">
        <!-- ajustes de grupo -->
        <div class="card_group-item group_config">
          <div class="group_config-item config_indicator">
            <span class="indicator indicator_title">Nombre del grupo</span>
          </div>
          <div class="group_config-item config_indicator">
            <span class="indicator indicator_count" id="indicator-count" title="Número de items en el grupo">0</span>
          </div>
          <div class="group_config-item config_tools">
            <button class="btn_icon btn_toggle" type="button" id="btn_res-group-config" title="ajustes de grupo">
              ${svgConfig()}
            </button>
          </div>
        </div>
        <!-- contenido fijado de grupo-->
        <div class="card_group-item group_show-data">
          <div class="show_data-container">
            <div class="show_data--title">
              <h3 id="fix-data-title">Título fijado</h3>
            </div>
            <div class="show_data--text">
              <p id="fix-data-text">Lorem ipsum dolor sit, amet</p>
            </div>
          </div>
        </div>
        <!-- cada card de texto añadido en el grupo-->
        <div class="card_group-item group_data">
          <!-- contenedor de cada texto -->
          <div class="group_data-scroll">
            <div class="group_data-content">
              <!-- cada texto -->
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
    `;
    return div;
}
export function sectionTextCRUD(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_crud-container')
    section.appendChild(pageTitleCRUD())
    section.appendChild(pageContentCRUD())
    getEvents(section)
    return section
}