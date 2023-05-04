import { globalVariables } from "./global-variables.js";


export const fetchFromApi = async (endpoint = "", options = {}) => {
    const {
        method = "GET",
        headers = {},
        body = null
    } = options;

    const response = await fetch(`${globalVariables.apiURL}/${endpoint}`, {
        method,
        headers, 
        credentials: 'include',
        body: body
    });
    
    const payload = response.ok ? response.json() : Promise.reject(response);
    return payload;
};

export const classSelectorMaker = (selector) => {
    return `.${selector}`;
};

export const createFragment = () => {
    return globalVariables.d.createDocumentFragment();
};

export const select = (selector) => {
    return globalVariables.d.querySelector(selector);
};

export const selectByClass = (className) =>{
    return select(classSelectorMaker(className));
}

export const selectById = (selector) => {
    return globalVariables.d.getElementById(selector);
};

export const selectAll = (selector) => {
    return globalVariables.d.querySelectorAll(selector);
};

export const selectAllByClass = (className) => {
    return selectAll(classSelectorMaker(className));
};

export const create = (element) => {
    return globalVariables.d.createElement(element);
};

export const append = (parent, child) => {
    return parent.appendChild(child);
};

export const remove = (parent, child) => {
    return parent.removeChild(child);
};

export const removeElement = (element) => {
    return element.remove();
};

export const addClass = (element, className) => {
    return element.classList.add(className);
};

export const removeClass = (element, className) => {
    return element.classList.remove(className);
};

export const toggleClass = (element, className) => {
    return element.classList.toggle(className);
};

export const elementContainsClass = (element, elClass) => {
    return element.classList.contains(elClass);
};