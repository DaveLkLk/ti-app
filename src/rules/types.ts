export type Page = {
    id: string;
    page: Function;
}
export type PageApp = {
    TEXT_STYLE: Page;
    TEXT_CRUD: Page;
    UNTELS: Page;
    NOT_FOUND: Page;
}

export interface AnyInputs {
    disabled?: boolean;
    dataset?: {
        type?:string;
    }
    style?: {
        cursor?: string;
        setProperty?: Function;
    };
    type?: string;
    section?: HTMLElement;
}
export interface ClipBoard {
    err?: (string | null);
    msg?: (string | null);
    success?: (boolean | null);
}
export type TypeStyles = {
    bold: string;
    italic: string;
    strike: string;
    underline: string;
  }

  export interface ObjectParam {
    childrens?: Function;
    setcount?: { textContent?: string };
    fixTitle?: { textContent?: string};
    fixContent?: { textContent?: string};
    title?: { textContent?: string};
    content?: { textContent?: string};
    success?: (boolean | undefined);
    msg?: string;
  }
  export interface StorageParam {
    key?: string;
    value?: (string | null);
  }
  export interface CardTextParam {
    group?: string;
    title?: string;
    content?: string;
  }
  export interface OfficeCardParam {
    id?: string;
    anexo?: string;
    office?: string;
  }

  type TextTransformFunction = (txt: string) => string;
  type GeneralFunction = (TextTransformFunction | (() => string));
  export interface TypeOption {
    text_lower?: TextTransformFunction;
    text_upper?: TextTransformFunction;
    text_capital?: () => string;
    text_normal?: () => string;
    [key: string]: GeneralFunction | undefined;
  }