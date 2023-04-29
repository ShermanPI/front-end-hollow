import { globalVariables } from "./global-variables.js";

export const fetchFromApi = async (endpoint = "", options = {}, errorFunction= ()=>{} ) => {
    // const {
    //   method = "GET",
    //   headers = {},
    // } = options;

    console.log(options)
    try {
        const response = await fetch(`${globalVariables.apiURL}${endpoint}`,
            options
        );
        const json = await response.json();
        return json;
    } catch (err) {
        errorFunction(err)
        console.error(err);
    }
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

export const addInnerHtml = (element, inner) => {
    return element.innerHTML = inner;
};

export const setImgSrc = (imgElement, src) => {
    return imgElement.src = src;
};

export const elementContainsClass = (element, elClass) => {
    return element.classList.contains(elClass);
};