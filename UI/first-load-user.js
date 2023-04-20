const d = document

export function firstLoadUser(renderLogedPage, loadingScreen, customAlert, editProfile, miniGame, renderCharacterItems){
    const $logoutBtn = d.querySelector(".log-out-btn")

    const loginUser = ()=>{
        fetch("http://127.0.0.1:5000/login",
        {
            credentials: 'include'
        })
        .then(res => res.ok? res.json() : res)
        .then(json => {
            if(json.username){
                renderLogedPage(json, loadingScreen, editProfile, customAlert, miniGame, renderCharacterItems, false)
            }else{
                loadingScreen(false)
                renderCharacterItems(customAlert, false) //render without the favorite icons
            }
        })
        .catch(err=>console.error(err))
    }

    loginUser()

    d.addEventListener("click", (e)=>{
        if(e.target == $logoutBtn){
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

}