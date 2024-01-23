import { getOffice, getAnexo } from "../../utils/anexos.js";
import { createOfficeCard } from "../components/layout.js";
import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "../components/alert.js"
import { addLocalStorage } from "../components/window-functions.js";


export const anexoLocalStorage = {
    SEARCH_DINAMYC: 'search-dinamyc',
    SEARCH_ANEXO: 'search-anexo'
}
const typeRequest = {
    ofc: 'office',
    anx: 'anexo'
}

export function getEvents(section){

    const divAlert = document.querySelector(".alert");
    const formOfficeSearch = section.querySelector('#office-form-search')
    const officeIndicator = section.querySelector('#office-result-indicator')
    const text = formOfficeSearch.querySelector('#office-inp-search')
    const btnForm = formOfficeSearch.querySelector('#office-btn-search')
    const searchToggle = section.querySelector('#search-dinamyc')
    const searchAnexoToggle = section.querySelector('#search-anexo')
    const officeResponse = section.querySelector('.office_result')
    
    let switchToggle = false
    let switchAnx = false
    
    function validateType(type, boolean) {
        if(type === undefined || boolean === undefined){
            throw new Error('error en los parámetros recibidos')
        }
        if(type === '') return
        if(boolean === true){
            if(type === typeRequest.ofc) switchToggle = true
            if(type === typeRequest.anx) switchAnx = true
        }
        if(boolean === false){
            if(type === typeRequest.ofc) switchToggle = false
            if(type === typeRequest.anx) switchAnx = false
        }
    }
    function validateElementActive(element, msg, type){
        if(element === undefined || msg === undefined || type === undefined){
            throw new Error("Parámetros no definidos")
        }
        const isActive = element.classList.contains(`${element.dataset.class}--active`)
        if(isActive){
            msg.length > 0 ? createAlert(divAlert, msg, ALERT_TYPE.TEMP.success, [], 1200) : null
            validateType(type, isActive)
        }else if(isActive === false){
            validateType(type, isActive)
        }
        return isActive
    }
    function searchActive(type){
        const targetInput = text.value.toLowerCase();
        officeResponse.innerHTML = '';
        if (targetInput === '') {
            officeIndicator.textContent = '-'
            return;
        }
        const matchingItems = type === typeRequest.ofc ? getOffice(targetInput) : getAnexo(Number(text.value));
        if(matchingItems.length === 0){
            officeIndicator.textContent = 0
            officeResponse.innerHTML = `
            <div class="office_result-card">
                <p class="not_found">No se econtraron resultados..</p>
            </div>
            `;
            return
        }
        officeIndicator.textContent = matchingItems.length       
        matchingItems.forEach(item => {
            officeResponse.innerHTML += createOfficeCard(item).outerHTML;
        });
    }

    const toggleStorage = () => localStorage.getItem(anexoLocalStorage.SEARCH_DINAMYC)
    const anxStorage = () => localStorage.getItem(anexoLocalStorage.SEARCH_ANEXO)
    if(toggleStorage() === 'true'){
        searchToggle.classList.toggle(`${searchToggle.dataset.class}--active`)
        switchToggle = true
    }
    if(anxStorage() === 'true'){
        searchAnexoToggle.classList.toggle(`${searchToggle.dataset.class}--active`)
        switchAnx = true
    }


    searchToggle.addEventListener('click', ()=>{
        searchToggle.classList.toggle(`${searchToggle.dataset.class}--active`)
        const isActive = validateElementActive(searchToggle, MESSAGE_TYPE.SEARCH_DINAMYC, typeRequest.ofc)
        addLocalStorage(anexoLocalStorage.SEARCH_DINAMYC, String(isActive))
    })
    searchAnexoToggle.addEventListener('click', ()=>{
        searchAnexoToggle.classList.toggle(`${searchAnexoToggle.dataset.class}--active`)
        const isActive = validateElementActive(searchAnexoToggle, MESSAGE_TYPE.SEARCH_ANEXO, typeRequest.anx)
        addLocalStorage(anexoLocalStorage.SEARCH_ANEXO, String(isActive))
    })
    
    formOfficeSearch.addEventListener('submit', async (e)=>{
        e.preventDefault();
        if(text.value === ''){
            officeIndicator.textContent = '-'
            officeResponse.innerHTML = '';
            createAlert(divAlert, MESSAGE_TYPE.INFO_VACIO, ALERT_TYPE.TEMP.info, [], 1800)
            return
        }
        formOfficeSearch.classList.add(`${formOfficeSearch.dataset.class}--active`)
        btnForm.classList.add(`${btnForm.dataset.class}--active`)
        setTimeout(()=>{
            formOfficeSearch.classList.remove(`${formOfficeSearch.dataset.class}--active`)
            btnForm.classList.remove(`${btnForm.dataset.class}--active`)
        }, 200)

        if(switchToggle === true) return
        if(switchToggle === false){
            switchAnx ? searchActive(typeRequest.anx) : searchActive(typeRequest.ofc)
        }
    })
    text.addEventListener('input', ()=>{
        if(switchToggle === false){
            return
        }else{
            switchAnx ? searchActive(typeRequest.anx) : searchActive(typeRequest.ofc)
        }
    })
    return
}