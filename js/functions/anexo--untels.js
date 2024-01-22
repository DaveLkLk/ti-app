import { getOffice } from "../../utils/anexos.js";
import { createOfficeCard } from "../components/layout.js";
import { createAlert, MESSAGE_TYPE, ALERT_TYPE } from "../components/alert.js"
import { addLocalStorage } from "../components/window-functions.js";


export const anexoLocalStorage = {
    SEARCH_DINAMYC: 'search-dinamyc'
}

export function getEvents(section){

    const divAlert = document.querySelector(".alert");
    const formOfficeSearch = section.querySelector('#office-form-search')
    const officeIndicator = section.querySelector('#office-result-indicator')
    const text = formOfficeSearch.querySelector('#office-inp-search')
    const btnForm = formOfficeSearch.querySelector('#office-btn-search')
    const searchToggle = section.querySelector('#search-dinamyc')
    const officeResponse = section.querySelector('.office_result')
    
    let switchToggle = false
    
    function validateSearchActive(){
        const isActive = searchToggle.classList.contains(`${searchToggle.dataset.class}--active`)
        if(isActive){
            createAlert(divAlert, MESSAGE_TYPE.SEARCH_DINAMYC, ALERT_TYPE.TEMP.success, [], 1200)
            switchToggle = true
        }else if(isActive === false){
            switchToggle = false
        }
        return isActive
    }
    function searchActive(){
        const targetInput = text.value.toLowerCase();
        officeResponse.innerHTML = '';
        if (targetInput === '') {
            officeIndicator.textContent = '-'
            return;
        }
        const matchingItems = getOffice(targetInput);
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

    const toggleStorage = localStorage.getItem(anexoLocalStorage.SEARCH_DINAMYC)
    if(toggleStorage === 'true'){
        searchToggle.classList.toggle(`${searchToggle.dataset.class}--active`)
        switchToggle = true
    }

    searchToggle.addEventListener('click', ()=>{
        searchToggle.classList.toggle(`${searchToggle.dataset.class}--active`)
        const isActive = validateSearchActive()
        addLocalStorage(anexoLocalStorage.SEARCH_DINAMYC, String(isActive))
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

        if(switchToggle) null
        else if(switchToggle === false){
            searchActive()
        }
    })
    text.addEventListener('input', ()=>{
        switchToggle ? searchActive() : null
    })
    return
}