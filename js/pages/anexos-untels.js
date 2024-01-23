import { getEvents } from "../functions/anexo--untels.js";
import { svgLupa } from "../components/icons.js";

function pageTitleAnexo(){
    const div = document.createElement("div");
    div.classList.add('content_title')
    div.innerHTML = `
        <h1 class="text_title">Directorios UNTELS</h1>
    `;
    return div;
}
function pageContentAnexo(){
    const div = document.createElement('div');
    div.classList.add('content_office')
    div.innerHTML = `
    <!-- TITULO DE OFICINAS -->
    <!-- <div class="office_item office_group-title">
      <h1 class="office_title">Directorios Telefónicos UNTELS</h1>
    </div> -->
    <!-- BUSQUEDA DE OFICINAS -->
    <div class="office_item office_group-search">
      <div class="office_search-config">
        <div class="label_toggle">
          <span>Búsqueda dinámica:</span>
          <div class="office_toggle" id="search-dinamyc" data-class="office_toggle" title="desactivar / activar">
            <div class="circle-toggle"></div>
          </div>
        </div>
        <div class="label_toggle">
          <span>Búsqueda por Anexo</span>
          <div class="office_toggle" id="search-anexo" data-class="office_toggle" title="desactivar / activar">
            <div class="circle-toggle"></div>
          </div>
        </div>
      </div>
      <form class="form_search form-panel" id="office-form-search" data-class="form_search">
        <div class="form_group">
          <div class="form_group-row">
            <input type="search" id="office-inp-search" placeholder="buscar.." class="form_input" autocomplete="off" title="escribe aqui..">
            <button class="btn_icon btn_fixed" type="submit" id="office-btn-search" title="buscar.." data-class="btn_fixed">
              ${svgLupa()}
            </button>
          </div>
        </div>
      </form>
      <div class="office_search-indicator">
        <h2 id="office-result-indicator" class="indicator_count" title="número de resultados">-</h2>
        <p>resultados</p>
      </div>
    </div>
    <!-- RESPUESTA DE BUSQUEDA DE OFICINAS -->
    <div class="office_item office_group-result">
      <div class="office_result">

      </div>
    </div>
    `;
    return div;
}
export function sectionAnexoUNTELS(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_office-container')
    section.appendChild(pageTitleAnexo())
    section.appendChild(pageContentAnexo())
    getEvents(section)
    return section
}