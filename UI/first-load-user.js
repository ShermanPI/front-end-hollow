const d = document

export function firstLoadUser(renderLogedPage, loadingScreen, customAlert, editProfile, miniGame, renderCharacterItems){
    
    const $adminOption = d.querySelectorAll(".admin-option")
    $adminOption.forEach(el=>{
        el.classList.add("admin-option-hidden")
    })

    const loginUser = ()=>{
        fetch("http://127.0.0.1:5000/login",
        {
            credentials: 'include'
        })
        .then(res => res.ok? res.json() : res)
        .then(json => {
            if(json.username){
                d.querySelector('.unlogged-screen').remove()

                if(json.type == 'admin'){
                    d.querySelectorAll(".admin-option-hidden").forEach(el =>{
                        el.classList.remove("admin-option-hidden")
                    })
                }
                renderLogedPage(json, loadingScreen, editProfile, customAlert, miniGame, renderCharacterItems, false)
            }else{
                loadingScreen(false)
                renderCharacterItems(customAlert, false) //render without the favorite icons
            }
        })
        .catch(err=>console.error(err))
    }

    loginUser()

}