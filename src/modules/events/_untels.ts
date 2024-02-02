import { getOffice, getAnexo } from "../../data/anexos";
import { createOfficeCard } from "../../layouts/Layout";
import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "../../components/alert"
import { addLocalStorage } from "../../rules/functions";


export const anexoLocalStorage = {
    SEARCH_DINAMYC: 'search-dinamyc',
    SEARCH_ANEXO: 'search-anexo'
}
const typeRequest = {
    ofc: 'office',
    anx: 'anexo'
}

export function getEvents(section:HTMLElement){

    const divAlert = document.querySelector(".alert") as HTMLElement;
    const formOfficeSearch = section.querySelector('#office-form-search') as HTMLFormElement;
    const officeIndicator = section.querySelector('#office-result-indicator') as HTMLElement
    const text = formOfficeSearch.querySelector('#office-inp-search') as HTMLInputElement
    const btnForm = formOfficeSearch.querySelector('#office-btn-search') as HTMLButtonElement
    const searchToggle = section.querySelector('#search-dinamyc') as HTMLElement
    const searchAnexoToggle = section.querySelector('#search-anexo') as HTMLElement
    const officeResponse = section.querySelector('.office_result') as HTMLElement
    
    let switchToggle = false
    let switchAnx = false
    
    function validateType(type:string, boolean:Boolean) {
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
    function validateElementActive(element:HTMLElement, msg:string, type:string){
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
    function searchActive(type:string){
        const targetInput = text.value.toLowerCase();
        officeResponse.innerHTML = '';
        if (targetInput === '') {
            officeIndicator.textContent = '-'
            return;
        }
        const matchingItems = type === typeRequest.ofc ? getOffice(targetInput) : getAnexo(Number(text.value));
        if(matchingItems && matchingItems.length === 0){
            officeIndicator.textContent = '0'
            officeResponse.innerHTML = `
            <div class="office_result-card">
                <p class="not_found">No se econtraron resultados..</p>
            </div>
            `;
            return
        }
        officeIndicator.textContent = matchingItems ? matchingItems.length.toString() : null
        matchingItems && matchingItems.forEach((item:any) => {
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
    
    formOfficeSearch.addEventListener('submit', async (e:any)=>{
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