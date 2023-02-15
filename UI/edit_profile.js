const d = document

export function editProfile(){
    const $editPfpBtn = d.querySelector(".change-pfp-text"),
        $editPgpBtnIcon = d.querySelector(".edit-profile-icon"),
        $editProfileContainer = d.querySelector(".edit-profile-container"),
        $pfps = d.querySelectorAll(".pfp-pic-container")


    d.addEventListener("click", (e)=>{
        console.log(e.target)
        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            $editProfileContainer.classList.remove("hide-edit-profile")
        }

        if(e.target == $editProfileContainer){
            $editProfileContainer.classList.add("hide-edit-profile")
        }
        
        if(e.target.matches(".pfp-pic-container")){
            $pfps.forEach(el=> el.classList.remove("pfp-pic-selected"))
            e.target.classList.add("pfp-pic-selected")
        }
})
}