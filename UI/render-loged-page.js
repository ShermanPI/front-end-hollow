import { loadScreen } from "./loading-screen.js"
import { editProfile } from "./edit_profile.js"
import { customAlert } from "./custom_alerts.js"
import { miniGame } from "./mini-game.js"
import { renderCharacterItems } from "./items-render-navigation.js"

const d = document

export const renderLogedPage = (userObj, isRenderingFromForm)=>{
    
    if(userObj.type == "admin"){
        const $adminSections = d.querySelectorAll(".admin-option-hidden")
        if($adminSections){
            $adminSections.forEach(el=>{
                el.classList.remove("admin-option-hidden")
            })
        }
        
    }
    const $loggedOutElements = d.querySelectorAll(".logged-out"),
        $logoutBtn = d.querySelector(".log-out-btn"),
        $mobileSignOutBtn = d.createElement("a")
    
    $mobileSignOutBtn.href = "#"
    $mobileSignOutBtn.classList.add("menu-anchor")
    $mobileSignOutBtn.innerHTML = "Log Out"

    d.querySelector(".menu").appendChild($mobileSignOutBtn)
    
    d.addEventListener("click", (e)=>{
        if(e.target == $logoutBtn || e.target == $mobileSignOutBtn){
            customAlert("Log Out", "Are you sure you want to log out?", {
                isConfirmType: true,
                yesFunction: function(){
                    fetch("http://127.0.0.1:5000/logout",{
                        credentials: 'include'
                    })
                    .then(res => res.ok? res.json() : res)
                    .then(json=>{
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

    // first step - this render the pfp, username, and let you edit your profile
    editProfile(customAlert, userObj) 
    
    // second step - render the favorite items
    if(isRenderingFromForm){
        renderCharacterItems(true, userObj)
    }else{
        renderCharacterItems(false, userObj)
    }

    // third step - render profile favorite Items (is renderind in renderCharacterItems)
    // profileFavoritesRender(userObj)

    // fourth step - this render the HScore and time in the DOM, and the pfpsUnlocked
    miniGame(userObj, customAlert)

    loadScreen(false)
}