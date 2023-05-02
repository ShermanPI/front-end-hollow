import { globalVariables } from "./global-variables.js";


export const fetchFromApi = async (endpoint = "", options = {}) => {
    const {
        method = "GET",
        headers = {},
        body = null
    } = options;

    const response = await fetch(`${globalVariables.apiURL}/${endpoint}`, {
        method,
        'Content-Type': headers['Content-Type'] ? headers['Content-Type'] : null, // I make this inside options fetch's object because I need to put it mannually to use the FormData object type to the browser can parser it
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

export const selectById = (selector) => {
    return globalVariables.d.getElementById(selector);
};

export const selectAll = (selector) => {
    return globalVariables.d.querySelectorAll(selector);
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