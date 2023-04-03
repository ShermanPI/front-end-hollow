const d = document

export function renderLogedPage(userObj){
    const $loggedOutElements = d.querySelectorAll(".logged-out"),
        $usernameLabel = d.getElementById("user-username")

    $loggedOutElements.forEach(el=>{
        el.classList.replace("logged-out", "logged-in")
    })

    console.log(userObj)


}