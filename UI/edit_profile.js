const d = document

export function editProfile(){
    const $editPfpBtn = d.querySelector(".change-pfp-text"),
        $editPgpBtnIcon = d.querySelector(".edit-profile-icon"),
        $editProfileContainer = d.querySelector(".edit-profile-container"),
        $pfps = d.querySelectorAll(".pfp-pic-container"),
        $AllprofilePicCont = d.querySelectorAll(".pfp-pic-container"),
        $pfpPreview = d.querySelector(".pfp-preview"),
        $saveBtn = d.querySelector(".save-profile-changes"),
        $userPfp = d.querySelector("#user-pfp"),
        $closeBtn = d.querySelector(".close-icon")

    for(let i = 0; i < $AllprofilePicCont.length; i++){
        $AllprofilePicCont[i].setAttribute('data-pfp', i)
    }
    
    const setPfp = (idImg)=>{
        localStorage.setItem("pfp-id", idImg)
        
        let imgSrc = d.querySelector(`div[data-pfp="${idImg}"]`).firstElementChild.firstElementChild.getAttribute("src")
        $pfpPreview.firstElementChild.src = imgSrc
        $userPfp.src = imgSrc
    }

    let actualImg = 0

    if(localStorage.getItem("pfp-id")){
        if(localStorage.getItem("pfp-id") >= 0 && localStorage.getItem("pfp-id") < $AllprofilePicCont.length){
            actualImg = localStorage.getItem("pfp-id")
            console.log("hola")
        }else{
            localStorage.setItem("pfp-id", 0)
            actualImg = 0
        }
    }

    setPfp(actualImg)

    d.addEventListener("click", (e)=>{
        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            $editProfileContainer.classList.remove("hide-edit-profile")
        }

        if(e.target == $editProfileContainer){
            $editProfileContainer.classList.add("hide-edit-profile")
        }
        
        if(e.target.matches(".pfp-pic-container")){
            $pfps.forEach(el=> el.classList.remove("pfp-pic-selected"))
            e.target.classList.add("pfp-pic-selected")
            
            actualImg = e.target.getAttribute("data-pfp")

            $pfpPreview.firstElementChild.src = e.target.firstElementChild.firstElementChild.getAttribute("src")
        }
        
        if(e.target == $saveBtn){
            setPfp(actualImg)
            $editProfileContainer.classList.add("hide-edit-profile")
        }

        if(e.target == $closeBtn){
            $editProfileContainer.classList.add("hide-edit-profile")
        }
})
}