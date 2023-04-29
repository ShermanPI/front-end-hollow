import { selectAll, classSelectorMaker, addClass, fetchFromApi, select, removeElement, removeClass } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"
import { renderLogedPage } from "./render-loged-page.js"
import { loadScreen } from "./loading-screen.js"
import { renderCharacterItems } from "./items-render-navigation.js"


export function firstLoadUser(){
    
    const $adminOption = selectAll(classSelectorMaker(selectors.adminOption))
    
    $adminOption.forEach(el=>{
        addClass(el, 'admin-option-hidden')
    })

    const loginUser = async (fetchFromApi)=>{
        const response = await fetchFromApi

        if(response.username){
            removeElement(select(classSelectorMaker(selectors.unloggedScreen)))

            if(response.type == globalVariables.userAdminType){
                selectAll(classSelectorMaker(selectors.adminOptionHidden)).forEach(el =>{
                    removeClass(el, classSelectorMaker(selectors.adminOptionHidden))
                })
            }

            renderLogedPage(response, false)
        }else{
            loadScreen(false)
            renderCharacterItems(false) //render without the favorite icons
        }
    }

    loginUser(fetchFromApi(globalVariables.loginEndpoint), {credentials: 'include'})
}