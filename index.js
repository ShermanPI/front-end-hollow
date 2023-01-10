import { selectors } from "./utils/dom-selectors.js";
import { setMaxHeight } from "./UI/max-height-setter.js";
import { changeForms } from "./UI/activate-form.js";

window.addEventListener("DOMContentLoaded", (e)=>{
    setMaxHeight(selectors.characterInfo, selectors.profileContainer, selectors.adminContainer);
    changeForms(selectors.editFormBtn, selectors.addFormBtn, selectors.editForm, selectors.addForm);
})
