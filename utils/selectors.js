import {globalVariables} from "./global-variables.js"

class ElemToResize {
    constructor(name, elementsToRestlist) {
        this.name = name;
        this.elementsToRest = elementsToRestlist;
    }
}

export const selectors = Object.freeze({

    characterInfo: new ElemToResize(".character-full-info", [".section-header", ".item-list"]),
    profileContainer: new ElemToResize(".profile-container", [".section-header"]),
    adminContainer: new ElemToResize(".admin-container", [".section-header"]),

    addFormBtn: ".add-form-btn",
    editFormBtn: ".edit-form-btn",
    editForm: ".edit-form",
    addForm: ".add-form",
    menuBtn: ".burger-icon",
    menu: ".menu",


    favoriteIcon: ".favorite-icon img",
    header: ".section-header",
    profileControlPanel: ".profile-control-panel",
    favoritesTitle: ".favorite-title",
    favoritesListContainer: ".favorite-list-container",

    /// new selectors
    allForms: globalVariables.d.querySelectorAll("form"), 
    adminOption: "admin-option",
    unloggedScreen: "unlogged-screen",
    adminOptionHidden: 'admin-option-hidden',
    signUpForm: 'sign-up-form',
    loginForm: 'login-form',
    addCharacterForm: 'add-character-form',
    editCharacterForm: 'edit-character-form',
    registerFormContainer: 'register-form-container',
    loginFormContainer: 'login-form-container',
    characterEditList: "character-edit-list",
    hideForm: 'hide-form',
    errorField: 'error-field',
    error: 'error',
    characterEditItem: 'character-edit-item',
    characterEditImg: "character-edit-img",
    characterEditName: 'character-edit-name',
    signUpBtn: 'signUp-btn',
    createAccountSpan: 'create-account-span',
    registerAnchor: 'register-anchor',
    signupUnloggedBtn: 'signup-unlogged-btn',
    loginBtn: 'login-btn',
    loginSpan: 'login-span',
    loginAnchor: 'login-anchor',
    loginUnloggedBtn: 'login-unlogged-btn',
    hideEditList: 'hide-edit-list',
    leftFullArrow: "left-full-arrow",
    rightFullArrow: "right-full-arrow",
    sectionContainer: 'section-container',
    nextPageIndicator: 'next-page',
    prevPageIndicator: 'prev-page',
    actualPage: 'actual-page',
    pageMenuAnchor: 'page-menu-anchor',
    menuItemSelected: "menu-item-selected"

});
