const d = document

export function editProfile(customAlert){
    class Pfp{
        constructor(id, imgSrc, blocked = false){
            this.id = id,
            this.imgSrc = imgSrc,
            this.blocked = blocked
        }
    
        createPfpElement(){
            let pfpElement = d.createElement("div"),
                pfpImgContainer = d.createElement("div"),
                imgTag = d.createElement("img")
        
            imgTag.src = this.imgSrc
    
            pfpElement.classList.add("pfp-pic-container")
            pfpElement.setAttribute('data-pfp', this.id)
            pfpImgContainer.classList.add("profile-pic")
            pfpImgContainer.appendChild(imgTag)
            pfpElement.appendChild(pfpImgContainer)
    
            if(this.blocked){
                let $lockedProtector = d.createElement("div")        
                $lockedProtector.classList.add("locked-pfp")
                $lockedProtector.innerHTML = `<img src="img/icons/padlock.png" alt="">`
    
                pfpImgContainer.appendChild($lockedProtector)
            }
    
            this.pfpElement = pfpElement
    
            return pfpElement
        }
    
    }

    const $editPfpBtn = d.querySelector(".change-pfp-text"),
        $editPgpBtnIcon = d.querySelector(".edit-profile-icon"),
        $editProfileContainer = d.querySelector(".edit-profile-container"),
        $pfpPreview = d.querySelector(".pfp-preview"),
        $saveBtn = d.querySelector(".save-profile-changes"),
        $userPfp = d.querySelector("#user-pfp"),
        $closeBtn = d.querySelector(".close-icon"),
        $inUseBox = d.createElement("div"),
        $inUseBoxTxt = d.createElement("div"),
        $pfpGrid = d.querySelector(".pfps-grid"),
        PfpsLocked = 4;

    let initialPfpsUnlocked = localStorage.getItem("unlockByTheUser")
        
    const renderPfpsElement = (lockedPfps)=>{
        const pfpsFragment = d.createDocumentFragment()

        const pfpsInfo = [
            {
                src: "img/character/Hornet_Idle.webp",
            },
            {
                src: "img/character/The_Knight.webp",
            },
            {
                src: "img/character/Lifeseed.webp",
            },
            {
                src: "img/character/Vengefly.webp",
            },
            {
                src: "img/character/The_Knight.webp",
            },
            {
                src: "img/character/Lifeseed.webp",
            },
            {
                src: "img/character/Vengefly.webp",
            },
            {
                src: "img/character/Vengefly.webp",
            },
            {
                src: "img/character/Vengefly.webp"
            },
            {
                src: "img/character/Hornet_Idle.webp"
            },
            {
                src: "img/character/Hornet_Idle.webp"
            },
            {
                src: "img/character/Hornet_Idle.webp"
            }
        ]
    
        for(let i = 1; i <= lockedPfps; i++){
            console.log(pfpsInfo.length - i)
            pfpsInfo[pfpsInfo.length - i].blocked = true
        }

        let idCounter = 0
        pfpsInfo.forEach(el=>{
            let newPfp = new Pfp(idCounter, el.src, el.blocked)
            pfpsFragment.appendChild(newPfp.createPfpElement())
            idCounter++
        })

        $pfpGrid.appendChild(pfpsFragment)
    }
    
    renderPfpsElement(PfpsLocked - initialPfpsUnlocked)

    const $lockedDivs = d.querySelectorAll(".locked-pfp")
    let pfpPointsId = PfpsLocked

    for(let i = $lockedDivs.length - 1; i >= 0; i--){
        $lockedDivs[i].setAttribute("data-locked-pfp-id", pfpPointsId)
        pfpPointsId--;
    }

    $inUseBoxTxt.classList.add("pfp-in-use-text")
    $inUseBoxTxt.innerHTML = "<p>In use</p>"
    $inUseBox.classList.add("pfp-in-use")
    $inUseBox.appendChild($inUseBoxTxt)

    let actualImg = 0

    const $pfps = d.querySelectorAll(".pfp-pic-container")

    const checkIfUnlockedPfps = ()=>{
        console.log("pfpsToUnlock", localStorage.getItem("unlockByTheUser") - initialPfpsUnlocked)
        if(initialPfpsUnlocked < localStorage.getItem("unlockByTheUser")){
            let pfpsToUnlock = localStorage.getItem("unlockByTheUser") - initialPfpsUnlocked,
                $lockedDivs = d.querySelectorAll(".locked-pfp")
            
            console.log($lockedDivs)
            if(pfpsToUnlock <= $lockedDivs.length){
                for(let i = 0; i < pfpsToUnlock; i++){
                    console.log("div to remove", $lockedDivs[i], i)
                    $lockedDivs[i].remove()
                }
            }

            initialPfpsUnlocked = localStorage.getItem("unlockByTheUser")
        }
    } 
    
    if(localStorage.getItem("pfp-id")){
        if(localStorage.getItem("pfp-id") >= 0 && localStorage.getItem("pfp-id") < $pfps.length){
            actualImg = localStorage.getItem("pfp-id")
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
    
    const setPfp = (idImg)=>{
        localStorage.setItem("pfp-id", idImg)
        
        let imgSrc = d.querySelector(`div[data-pfp="${idImg}"]`).firstElementChild.firstElementChild.getAttribute("src")
        $pfpPreview.firstElementChild.src = imgSrc
        $userPfp.src = imgSrc
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
        if(e.target.matches(".locked-pfp")){
            customAlert("Need Points to Unlock!", `You can unlock the different profile pictures by playing the mini game "The Last Call" (Available in the profile section from the PC platform). You must get <span class = "points-required">${e.target.getAttribute("data-locked-pfp-id") * 1000}</span> points to be able to unlock this one`)
        }

        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            checkIfUnlockedPfps()
            setInUsePfp()
            $editProfileContainer.classList.remove("hide-edit-profile")
            let imgSrc = d.querySelector(`div[data-pfp="${localStorage.getItem("pfp-id") || 0}"]`).firstElementChild.firstElementChild.getAttribute("src")
            $pfpPreview.firstElementChild.src = imgSrc
        }

        if(e.target == $editProfileContainer){
            removeSelected()
            $editProfileContainer.classList.add("hide-edit-profile")
        }
        
        if(e.target.matches(".pfp-pic-container")){
            const $lockedDivs = d.querySelectorAll(".locked-pfp")
            
            if(e.target.getAttribute("data-pfp") < ($pfps.length - $lockedDivs.length)){
                removeSelected()
                e.target.classList.add("pfp-pic-selected")
                actualImg = e.target.getAttribute("data-pfp")
                $pfpPreview.firstElementChild.src = e.target.firstElementChild.firstElementChild.getAttribute("src")
            }
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