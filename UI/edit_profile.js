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
        $closeBtn = d.querySelector(".close-icon"),
        $inUseBox = d.createElement("div"),
        $inUseBoxTxt = d.createElement("div"),
        $lockedProtector = d.createElement("div")
        
    $lockedProtector.classList.add("locked-pfp")
    $lockedProtector.innerHTML = `<img src="img/icons/padlock.png" alt="">`
    
    let markToNewPfp = 1000
    const setLockedPfps = ()=>{
        let unlockedByTheUser = Math.floor((parseInt((localStorage.getItem("HScore"))) || 0) / markToNewPfp)
        console.log("hola", unlockedByTheUser)
        let lockedPfpsCount = 6 - (unlockedByTheUser)
        let availablePfps = $pfps.length - (lockedPfpsCount);

        for(let i = 0; i < $pfps.length; i++){
            if(i >= availablePfps){
                let newLockOverlay = $lockedProtector.cloneNode(true)
                $pfps[i].firstElementChild.appendChild(newLockOverlay)
            }
        }
    }

    const unlockPfps = ()=>{
        let unlockedByTheUser = Math.floor((parseInt((localStorage.getItem("HScore"))) || 0) / markToNewPfp)
        let lockedPfpsCount = 6 - (unlockedByTheUser)
        let availablePfps = $pfps.length - (lockedPfpsCount);

        for(let i = 1; i <= unlockedByTheUser; i++){
            $pfps[availablePfps + i].firstElementChild.remove(newLockOverlay)
        }
    }

    setLockedPfps()

    $inUseBoxTxt.classList.add("pfp-in-use-text")
    $inUseBoxTxt.innerHTML = "<p>In use</p>"
    $inUseBox.classList.add("pfp-in-use")
    $inUseBox.appendChild($inUseBoxTxt)

    console.log($inUseBox)

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

    const setInUsePfp = ()=>{
        let $selectedPfp = d.querySelector(`div[data-pfp="${localStorage.getItem("pfp-id") || 0}"]`)
        $pfps.forEach(el=> el.classList.remove("pfp-in-use-border"))
        $selectedPfp.classList.add("pfp-in-use-border")
        $selectedPfp.firstElementChild.appendChild($inUseBox)
    }

    const removeSelected = () =>{
        $pfps.forEach(el=> el.classList.remove("pfp-pic-selected"))
    }

    const showPfpSelector = ()=>{
        removeSelected()
        $editProfileContainer.classList.add("hide-edit-profile")
    } 

    setInUsePfp()
    setPfp(actualImg)

    d.addEventListener("click", (e)=>{
        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            setInUsePfp()
            unlockPfps()
            $editProfileContainer.classList.remove("hide-edit-profile")
        }

        if(e.target == $editProfileContainer){
            removeSelected()
            $editProfileContainer.classList.add("hide-edit-profile")
        }
        
        if(e.target.matches(".pfp-pic-container")){
            removeSelected()
            e.target.classList.add("pfp-pic-selected")
            
            actualImg = e.target.getAttribute("data-pfp")

            $pfpPreview.firstElementChild.src = e.target.firstElementChild.firstElementChild.getAttribute("src")
        }
        
        if(e.target == $saveBtn){
            setPfp(actualImg)
            showPfpSelector()
        }

        if(e.target == $closeBtn){
            showPfpSelector()
        }
})
}