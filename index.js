import { selectors } from "./utils/dom-selectors.js";
import { changeForms } from "./UI/activate-form.js";
import { burgerMenu } from "./UI/burger-menu.js";
import { homeNavigation } from "./UI/home-navigation.js";
import { markAsFavorite } from "./UI/favorite-btn.js";
import { navigatePages } from "./UI/page-navigation.js";
import { makeThemBlink } from "./UI/blinking-arrows.js";

window.addEventListener("DOMContentLoaded", (e)=>{
    homeNavigation()
    navigatePages(selectors.leftFullArrow, selectors.rightFullArrow)
    changeForms(selectors.editFormBtn, selectors.addFormBtn, selectors.editForm, selectors.addForm);
    burgerMenu(selectors.menuBtn, selectors.menu)
    markAsFavorite(selectors.favoriteIcon)
    makeThemBlink()
})