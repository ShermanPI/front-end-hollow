const d = document

export function customAlert(title = undefined, alertMsg = "There is no msg here ⚔️"){
    const $alertBackOverlay = d.querySelector(".page-overlay"),
        $alertTitle = d.querySelector(".alert-title"),
        $alertMsg = d.querySelector(".alert-msg")


    console.log("esto se debio disparar")
    if(title){
        $alertTitle.innerHTML = title
    }

    $alertMsg.innerHTML = alertMsg

    $alertBackOverlay.classList.remove("hide-alert")
    
    d.addEventListener("click", (e)=>{
        if(e.target.matches(".alert-ok-btn")){
            $alertBackOverlay.classList.add("hide-alert")
        }

    })
}