import { loadScreen } from "./loading-screen.js"
import { editProfile } from "./edit_profile.js"
import { customAlert } from "./custom_alerts.js"
import { miniGame } from "./mini-game.js"
import { renderCharacterItems } from "./items-render-navigation.js"
import { globalVariables } from "../utils/global-variables.js"
import { removeClass, selectByClass, selectAllByClass, create, addClass, append, fetchFromApi } from "../utils/dom-functions.js"
import { selectors } from "../utils/selectors.js"


export const renderLogedPage = (userObj, isRenderingFromForm)=>{
    
    if(userObj.type == "admin"){
        const $adminSections = selectAllByClass(selectors.adminOptionHidden)
        if($adminSections){
            $adminSections.forEach(el=>{
                removeClass(el, selectors.adminOptionHidden)
            })
        }
        
    }
    const $loggedOutElements = selectAllByClass(selectors.loggedOut),
        $logoutBtn = selectByClass(selectors.logOutBtn),
        $mobileSignOutBtn = create('a') 
    
    $mobileSignOutBtn.href = "#"
    addClass($mobileSignOutBtn, selectors.menuAnchor)
    $mobileSignOutBtn.innerHTML = "Log Out"

    append(selectByClass(selectors.menu), $mobileSignOutBtn)    
    
    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $logoutBtn || e.target == $mobileSignOutBtn){
            customAlert("Log Out", "Are you sure you want to log out?", {
                isConfirmType: true,
                yesFunction: function(){
                    fetchFromApi('/logout')
                    .then(()=>{
                        location.reload()
                    })
                    .catch(err=> console.error(err))
                }
            })
        } 
    })

    $loggedOutElements.forEach(el=>{
        el.classList.replace("logged-out", "logged-in")
    })

    editProfile(customAlert, userObj) 

    if(isRenderingFromForm){
        renderCharacterItems(true, userObj)
    }else{
        renderCharacterItems(false, userObj)
    }
    miniGame(userObj, customAlert)

    loadScreen(false)
}