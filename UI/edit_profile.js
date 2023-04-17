const d = document

export function editProfile(customAlert, userObj){

    class ProfilePic{
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
        PfpsLocked = 4,
        $editUsernameInput = d.querySelector(".edit-username"),
        $profileUsername = d.getElementById("user-username"),
        $profilePicNotification = d.querySelector(".profile-pic-notification")

    let initialPfpsUnlocked = userObj.unlockByTheUser

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
            pfpsInfo[pfpsInfo.length - i].blocked = true
        }

        let idCounter = 0
        pfpsInfo.forEach(el=>{
            let newPfp = new ProfilePic(idCounter, el.src, el.blocked)
            pfpsFragment.appendChild(newPfp.createPfpElement())
            idCounter++
        })

        $pfpGrid.appendChild(pfpsFragment)
    }
    
    renderPfpsElement(PfpsLocked - initialPfpsUnlocked)

    const $lockedDivs = d.querySelectorAll(".locked-pfp"),
        usernameRegex = /^[a-zA-Z0-9_-]{3,12}$/
    
    let pfpPointsId = PfpsLocked
    for(let i = $lockedDivs.length - 1; i >= 0; i--){
        $lockedDivs[i].setAttribute("data-locked-pfp-id", pfpPointsId)
        pfpPointsId--;
    }

    $inUseBoxTxt.classList.add("pfp-in-use-text")
    $inUseBoxTxt.innerHTML = "<p>In use</p>"
    $inUseBox.classList.add("pfp-in-use")
    $inUseBox.appendChild($inUseBoxTxt)

    let actualImg = userObj.pfpId

    const $pfps = d.querySelectorAll(".pfp-pic-container")

    const showPfpInUse = (imgIdSelected)=>{
        let $selectedPfp = d.querySelector(`div[data-pfp="${imgIdSelected}"]`)
        $pfps.forEach(el=> el.classList.remove("pfp-in-use-border"))
        $selectedPfp.classList.add("pfp-in-use-border")
        $selectedPfp.firstElementChild.appendChild($inUseBox)
    }
    
    const renderPfpInDOM = (idImg)=>{
        let imgSrc = d.querySelector(`div[data-pfp="${idImg}"]`).firstElementChild.firstElementChild.getAttribute("src")
        $pfpPreview.firstElementChild.src = imgSrc
        $userPfp.src = imgSrc
    }

    const removeSelected = () =>{
        $pfps.forEach(el=> el.classList.remove("pfp-pic-selected"))
    }
    
    const renderUsernameInDom = (username)=>{
        $editUsernameInput.placeholder = `/${username}`
        $profileUsername.innerHTML = `/${username}`
    }
    
    renderUsernameInDom(userObj.username)
    showPfpInUse(userObj.pfpId)
    renderPfpInDOM(actualImg)

    d.addEventListener("click", (e)=>{
        if(e.target.matches(".locked-pfp")){
            customAlert("Need Points to Unlock!", `You can unlock the different profile pictures by playing the mini game "The Last Call" (Available in the profile section from the PC platform). You must get <span class = "points-required">${e.target.getAttribute("data-locked-pfp-id") * 1000}</span> points to be able to unlock this one`)
        }

        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            localStorage.setItem("isFormActivated", true)

            if(!$profilePicNotification.classList.contains("hide-notification")) $profilePicNotification.classList.add("hide-notification")

            // checkIfUnlockedPfps ↓↓↓↓↓
            fetch(`http://127.0.0.1:5000/user/${userObj._id.$oid}`,
            {
                credentials: 'include'
            })
            .then(res =>res.ok? res.json() : Promise.reject(res))
            .then(json=>{
                if(initialPfpsUnlocked < json.unlockByTheUser){
                    let pfpsToUnlock = json.unlockByTheUser - initialPfpsUnlocked,
                        $lockedDivs = d.querySelectorAll(".locked-pfp")
                    
    
                    if(pfpsToUnlock <= $lockedDivs.length){
                        for(let i = 0; i < pfpsToUnlock; i++){
                            $lockedDivs[i].remove()
                        }
                    }
        
                    initialPfpsUnlocked = json.unlockByTheUser
                }
                showPfpInUse(json.pfpId)

                $editUsernameInput.value = ""
                $editProfileContainer.classList.remove("hide-edit-profile")
                let imgSrc = d.querySelector(`div[data-pfp="${json.pfpId}"]`).firstElementChild.firstElementChild.getAttribute("src")
                $pfpPreview.firstElementChild.src = imgSrc
                })
            .catch(err=>{
                console.err(err)
            })

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

            if(!usernameRegex.test($editUsernameInput.value) && $editUsernameInput.value !== ''){ //validate if the user put another username
                customAlert(undefined, "Username must contain only letters (both uppercase and lowercase), numbers, underscores and middle hyphens, with a length of between 3 and 12 characters.")
                return;
            }

            const fetchBody = {},
                pfpsUnlocked = $pfps.length - (PfpsLocked - userObj.unlockByTheUser) - 1

            if ($editUsernameInput.value !== ''){ // validate if the user only want to edit the pfp
                fetchBody.username = $editUsernameInput.value
                renderUsernameInDom($editUsernameInput.value)                    
            }

            if(actualImg !== userObj.pfpId && (actualImg >= 0 && actualImg <= pfpsUnlocked)){
                fetchBody.pfpId = actualImg
            }

            fetch(`http://127.0.0.1:5000/user/${userObj._id.$oid}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchBody)
            })
            .then(res => res.ok? res.json() : res)
            .then(json =>{
                renderPfpInDOM(actualImg)
                removeSelected()
                showPfpInUse(json.pfpId)
                $editProfileContainer.classList.add("hide-edit-profile")
                actualImg = json.pfpId

                localStorage.setItem("isFormActivated", false)
            })
            .catch(err=>{
                if (err.status === 409) {
                    err.json().then(json => {
                        customAlert("Hold Up!", json.message)
                    })
                } else {
                    console.error(err)
                }
            })
        }

        if(e.target == $closeBtn || e.target == $editProfileContainer){
            localStorage.setItem("isFormActivated", false)

            if(($editUsernameInput.value !== userObj.username && $editUsernameInput.value !== "") || actualImg !== userObj.pfpId){
                const alertOptions = {
                    isConfirmType: true,
                    yesFunction(){
                        d.querySelector(".page-overlay").remove()
                    },
                    noFunction(){
                        removeSelected()
                        d.querySelector(".page-overlay").remove()
                        $editProfileContainer.classList.add("hide-edit-profile")
                    }
                }
    
                customAlert("Unsaved Changes", "There are unsaved changes, do you want to continue in the edit profile section?", alertOptions)

            }else{
                removeSelected()
                $editProfileContainer.classList.add("hide-edit-profile")
            }
        }
    })

}