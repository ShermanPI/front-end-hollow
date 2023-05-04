import { selectAllByClass, classSelectorMaker, addClass, fetchFromApi, removeElement, removeClass, selectByClass } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"
import { renderLogedPage } from "./render-loged-page.js"
import { loadScreen } from "./loading-screen.js"
import { renderCharacterItems } from "./items-render-navigation.js"


export function firstLoadUser(){
    
    const $adminOption = selectAllByClass((selectors.adminOption))
    
    $adminOption.forEach(el=>{
        addClass(el, selectors.adminOptionHidden)
    })

    
    fetchFromApi(globalVariables.loginEndpoint)
    .then(response => {
        if(response.username){
            removeElement(selectByClass((selectors.unloggedScreen)))

            if(response.type == globalVariables.userAdminType){
                selectAllByClass((selectors.adminOptionHidden)).forEach(el =>{
                    removeClass(el, classSelectorMaker(selectors.adminOptionHidden))
                })
            }

            renderLogedPage(response, false)
        }else{
            loadScreen(false)
            renderCharacterItems(false) //render home items without the favorite icon
        }
    })
}