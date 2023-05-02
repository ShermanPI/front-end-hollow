import { addClass, classSelectorMaker, removeClass, select } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";
import { selectors } from "../utils/selectors.js";

export function changeForms(){
    const $editFormBtn = select(classSelectorMaker(selectors.editFormBtn)),
        $addFormBtn = select(classSelectorMaker(selectors.addFormBtn)), 
        $editForm = select(classSelectorMaker(selectors.editForm)),
        $addForm = select(classSelectorMaker(selectors.addForm))

    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $editFormBtn){
            addClass($editFormBtn, selectors.btnActivated)
            removeClass($editForm, selectors.hideForm)
            
            addClass($addForm, selectors.hideForm)
            removeClass($addFormBtn, selectors.btnActivated)
        }
        if(e.target == $addFormBtn){
            addClass($addFormBtn, selectors.btnActivated)
            removeClass($addForm, selectors.hideForm)
            
            addClass($editForm, selectors.hideForm)
            removeClass($editFormBtn, selectors.btnActivated)
        }
    })
}