import { sectionStyleText } from "../pages/text-style.js";
import { sectionTextCRUD } from "../pages/text-crud.js";
import { sectionAnexoUNTELS } from "../pages/anexos-untels.js";
import { sectionNotFound } from "../pages/not-found.js";

import { anexoLocalStorage } from "../functions/anexo--untels.js";
import { stylesLocalStorage } from "../functions/text--style.js";

const pagesApp = {
    TEXT_STYLE: {
        id: 'text-style',
        page: sectionStyleText
    },
    TEXT_CRUD: {
        id: 'text-crud',
        page: sectionTextCRUD
    },
    ANEXOS: {
        id: 'anexo-untels',
        page: sectionAnexoUNTELS
    },
    NOT_FOUND: {
        id: 'not-found',
        page: sectionNotFound
    }
}
export function pageManagerApp(dataset){
    const dataPage = dataset
    const pageFound = Object.values(pagesApp).find(entry => entry.id === dataPage)
    if(pageFound){
        const showPage = {
            page: pageFound.page,
            state: true
        }
        return showPage
    }
    else{
        return undefined;
    }
}
export function managerLocalStorage(){
    const itemsLocalStorage = {
        anexos: anexoLocalStorage,
        styles: stylesLocalStorage
    }
    return itemsLocalStorage;
}