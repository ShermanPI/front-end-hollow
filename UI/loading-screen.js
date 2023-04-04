const d = document

export const loadScreen = (isActivated = true)=>{

    const $loadingScreen = d.querySelector(".loading-container")
    if(isActivated){
        $loadingScreen.classList.remove("logged-in")
    }else{
        $loadingScreen.classList.add("logged-in")
    }
}