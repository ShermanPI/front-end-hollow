const d = document

export const renderLogedPage = (userObj, loadingScreen, editProfile, customAlert)=>{
    const $loggedOutElements = d.querySelectorAll(".logged-out")
    console.log("hey")

    $loggedOutElements.forEach(el=>{
        el.classList.replace("logged-out", "logged-in")
    })

    // $usernameLabel.innerHTML = `/${userObj.username}`
    editProfile(customAlert, userObj)

    loadingScreen(false)
}