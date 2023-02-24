const d = document

/// ALL THE THINGS TO THE INDEX.js
export function editProfile(){
    class Pfp{
        constructor(id, imgSrc, blocked = false){
            this.id = id,
            this.imgSrc = imgSrc, //--->> this.imgSrc
            this.blocked = blocked //--->> this.blocked
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
        $pfpGrid = d.querySelector(".pfps-grid")
        
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

    renderPfpsElement(4)

    const checkIfUnlockPfps = ()=>{

    } 
    

    $inUseBoxTxt.classList.add("pfp-in-use-text")
    $inUseBoxTxt.innerHTML = "<p>In use</p>"
    $inUseBox.classList.add("pfp-in-use")
    $inUseBox.appendChild($inUseBoxTxt)

    let actualImg = 0

    
    const $pfps = d.querySelectorAll(".pfp-pic-container")
    
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
        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
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