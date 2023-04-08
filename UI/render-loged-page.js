const d = document

export const renderLogedPage = (userObj, loadingScreen, editProfile, customAlert, miniGame)=>{
    const $loggedOutElements = d.querySelectorAll(".logged-out")
    console.log("hey, esto es dentro de render loged page", userObj)

    $loggedOutElements.forEach(el=>{
        el.classList.replace("logged-out", "logged-in")
    })

    editProfile(customAlert, userObj) // first step - this render the pfp, username, and let you edit your profile
    miniGame(userObj) // secondStep - this render the HScore and time in the DOM, and the pfpsUnlocked

    loadingScreen(false)
}