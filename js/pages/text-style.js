import { svgAdd, svgBold, svgCopy, svgItalic, svgLock, svgMagic, svgPaste, svgTached, svgUnderline, svgUnlock } from "../components/icons.js";
import { getEvents } from "../functions/text--style.js";

function pageTitleStyle(){
    const div = document.createElement("div");
    div.classList.add('content_title')
    div.innerHTML = `
        <h1 class="text_title">Transform Text App</h1>
    `;
    return div;
}
function pageContentStyle(){
    const div = document.createElement('div');
    div.classList.add('content_text')
    div.innerHTML = `
    <div class="section_title">
    <div class="section_title-header">
      <p data-for="title-1" class="title_header">Controla el formato del texto</p>
    </div>
    <div class="section_title-content">
      <p data-for="txt-3">Guarda tus ajustes para futuras sesiones.</p>
      <p data-for="txt-3">Copia y Pega mejorado con atajos accesibles</p>
      <p data-for="txt-3"><span data-for="cursive-3">Transform Text App</span> te permite mantener tus ajustes personalizados basado en el almacenamiento local o <code data-for="code-2">localStorage</code> del <a href="https://developer.mozilla.org/es/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer" title="Qué es localStorage - MDN Web Docs">objeto window en JavaScript.</a></p>
    </div>
  </div>
  <div class="section_grid">
    <form class="form_text form-panel" id="form_text">
      <div class="form_group">
        <label class="label" for="text_input">Ingrese texto</label>
        <div class="form_group-row">
          <input type="text" id="text_input" autofocus class="form_input text_input">
          <button class="btn_paste btn_icon btn_change" data-type="button" id="btn_paste" type="button" title="Pegar último texto copiado">
            ${svgPaste()}
          </button>
        </div>
      </div>
      <div class="form_group">
        <label for="select_text" class="label">Salida del texto:</label>
        <select id="select_text" class="form_input">
          <option value="text_upper">Mayúsculas</option>
          <option value="text_lower">Minúsculas</option>
          <option value="text_capital">Títulos</option>
          <option value="text_normal">Oración</option>
        </select>
      </div>
      <div class="form_group">
        <button type="submit" data-type="button" class="btn_form btn_submit">Transformar</button>
      </div>
      <div class="form_group">
        <button type="reset" data-type="button" class="btn_form btn_submit">Limpiar</button>
      </div>
    </form>
  </div>
  <div class="section_response process_text" id="process_text">
    <form class="form_text-process form-panel">
      <div class="form_group">
        <div class="form_group-row" data-position="relative">
          <label for="text_output" class="label">Resultado</label>
          <button data-type="button" type="button" id="btn_styles" title="ajustes adicionales" class="btn_icon btn_expand" data-class="btn_expand">
            ${svgAdd()}
          </button>
          <div id="cfg-styles" class="config-style-group" data-active="btn_style--active">
            <div class="form_group-rowcenter">
              <span class="label-sm">Mantener estilos:</span>
              <button id="btn_lock_styles" data-class="btn_lock" class="btn_icon btn_lock" type="button"  title="estilos desbloqueado" >
                ${svgUnlock()}
                ${svgLock()}
              </button>
            </div>
            <div class="config-style-item group-style">
              <button id="bold" title="texto negrita" type="button"class="btn_item btn_style">
                ${svgBold()}
              </button>
              <button id="italic" title="texto cursiva" type="button" class="btn_item btn_style">
                ${svgItalic()}
              </button>
              <button id="strike" title="texto tachado" type="button" class="btn_item btn_style">
                ${svgTached()}
              </button>
              <button id="underline" title="texto subrayado" type="button" class="btn_item btn_style">
                  ${svgUnderline()}
                </button>
            </div>
            <div class="form_group-rowcenter">
              <span class="label-sm">Limpiar espacios:</span>
              <button id="btn_clear-space" class="btn_icon btn_toggle" data-class="btn_toggle" type="button" title="limpiar espacios en blanco">
                ${svgMagic()}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="form_group">
        <div class="form_group-row">
          <textarea class="form_output readonly" id="text_output" title="elemento de solo lectura" readonly placeholder="resultado.."></textarea>
          <button type="button" data-type="button" class="btn_icon btn_change" id="btn_copy" title="Copiar texto">
            ${svgCopy()}
          </button>
        </div>
      </div>
    </form>
  </div>
    `;
    return div;
}
export function sectionStyleText(){
  const section = document.createElement('section')
  section.classList.add('main_content')
  section.classList.add('main_text-container')
  section.appendChild(pageTitleStyle())
  section.appendChild(pageContentStyle())
  getEvents(section)
  return section
}