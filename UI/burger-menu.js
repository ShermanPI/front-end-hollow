import { classSelectorMaker, select, toggleClass } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";
import { selectors } from "../utils/selectors.js";

export function burgerMenu(){
    const $menuBtn = select(classSelectorMaker(selectors.menuBtn)),
        $menu = select(classSelectorMaker(selectors.menu))
        
    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $menuBtn){
            toggleClass($menu, selectors.hideMenu)
            toggleClass($menuBtn, selectors.openMenu)
        }
    })
}