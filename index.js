import { selectors } from "./utils/dom-selectors.js";
import { changeForms } from "./UI/activate-form.js";
import { burgerMenu } from "./UI/burger-menu.js";
import { navigationArrows } from "./UI/arrows-function.js";
import { markAsFavorite } from "./UI/favorite-btn.js";

window.addEventListener("DOMContentLoaded", (e)=>{
    navigationArrows(selectors.leftFullArrow, selectors.rightFullArrow)
    changeForms(selectors.editFormBtn, selectors.addFormBtn, selectors.editForm, selectors.addForm);
    // burgerMenu(selectors.menuBtn, selectors.menu)
    markAsFavorite(selectors.favoriteIcon)
})