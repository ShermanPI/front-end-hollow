const d = document

export function loadUser(renderLogedPage, loadingScreen, customAlert, editProfile){
    const $logoutBtn = d.querySelector(".log-out-btn"),
        $loginBtn = d.getElementById("login-btn")

    const loginUser = ()=>{
        fetch("http://127.0.0.1:5000/login",
        {
            credentials: 'include'
        })
        .then(res => res.ok? res.json() : res)
        .then(json => {
            console.log("This user is still loged in: ", json)
            if(json.username){
                renderLogedPage(json, loadingScreen, editProfile, customAlert)
            }else{
                loadingScreen(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
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
                    .catch(err=> console.error(err))
                }
            })
        } 
    })

}