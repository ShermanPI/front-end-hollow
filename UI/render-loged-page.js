const d = document

export const renderLogedPage = (userObj, loadingScreen, editProfile, customAlert, miniGame, renderCharacterItems, isRenderingFromForm, profileFavoritesRender)=>{
    const $loggedOutElements = d.querySelectorAll(".logged-out")

    $loggedOutElements.forEach(el=>{
        el.classList.replace("logged-out", "logged-in")
    })

    // first step - this render the pfp, username, and let you edit your profile
    editProfile(customAlert, userObj) 
    
    // second step - render the favorite items
    if(isRenderingFromForm){
        renderCharacterItems(customAlert, true, userObj)
    }else{
        renderCharacterItems(customAlert, false, userObj)
    }

    // third step - render profile favorite Items
    profileFavoritesRender(userObj)

    // fourth step - this render the HScore and time in the DOM, and the pfpsUnlocked
    miniGame(userObj) 

    loadingScreen(false)
}