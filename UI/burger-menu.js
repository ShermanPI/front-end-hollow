import { selectByClass, toggleClass } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";
import { selectors } from "../utils/selectors.js";

export function burgerMenu(){
    const $menuBtn = selectByClass((selectors.menuBtn)),
        $menu = selectByClass((selectors.menu))
        
    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $menuBtn){
            toggleClass($menu, selectors.hideMenu)
            toggleClass($menuBtn, selectors.openMenu)
        }
    })
}