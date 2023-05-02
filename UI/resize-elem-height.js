import { classSelectorMaker, select } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";

export function resizeItemToHeight(itemToResize, ...elemToRest){
    const $elemToResize = select(classSelectorMaker(itemToResize))
    
    

    const resizeElement = ()=>{
        if(globalVariables.w.innerWidth < 1024){
            let totalHeightToRest = 0;

            elemToRest.forEach(el=>{
                const $elem = select((classSelectorMaker(el)))
                totalHeightToRest += $elem.getBoundingClientRect().height;
            })

            $elemToResize.style.height = `calc(100vh - ${totalHeightToRest}px)`
        }else{
            if ($elemToResize.hasAttribute("style")){
                $elemToResize.removeAttribute("style");
            }
        }
    }
    resizeElement()
    
    window.addEventListener("resize",()=>{
        resizeElement()
    })
}