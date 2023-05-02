import { classSelectorMaker, removeClass, addClass,select } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"

export function scrollsBtn() {

    const $favoriteListContainer = select(classSelectorMaker(selectors.favoritesListContainer)),
        $scrollBtn = select(classSelectorMaker(selectors.scrollBtn))

    $favoriteListContainer.addEventListener("scroll", (e)=>{
        if($favoriteListContainer.scrollTop > 300){
            removeClass($scrollBtn, selectors.hideScrollBtn)
        }else{
            addClass($scrollBtn, selectors.hideScrollBtn)
        }
    })

    
    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $scrollBtn){
            e.stopPropagation()
            $favoriteListContainer.scrollTo({top: 0, behavior: "smooth"})
        }
    });
}