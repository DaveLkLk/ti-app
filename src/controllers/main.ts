import { sectionNotFound } from "../modules/404";
import { sectionTextCRUD } from "../modules/text-crud";
import { sectionStyleText } from "../modules/text-style";
import { sectionAnexoUNTELS } from "../modules/untels";
import { PageApp } from "../rules/types";

const pagesApp:PageApp = {
    TEXT_STYLE: {
        id: 'text-style',
        page: sectionStyleText
    },
    TEXT_CRUD: {
        id: 'text-crud',
        page: sectionTextCRUD
    },
    UNTELS: {
        id: 'anexo-untels',
        page: sectionAnexoUNTELS
    },
    NOT_FOUND: {
        id: 'not-found',
        page: sectionNotFound
    }
}