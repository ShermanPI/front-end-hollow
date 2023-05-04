import { removeClass, selectByClass, addClass } from "../utils/dom-functions.js"
import { selectors } from "../utils/selectors.js"

export const loadScreen = (isActivated = true)=>{

    const $loadingScreen = selectByClass(selectors.loadingContainer)
    if(isActivated){
        removeClass($loadingScreen, selectors.loggedIn)
    }else{
        addClass($loadingScreen, selectors.loggedIn)
    }
}