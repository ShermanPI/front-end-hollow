import { selectByClass, addClass, append, classSelectorMaker, create, elementContainsClass, fetchFromApi, removeClass, removeElement, select, selectAllByClass, selectById } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"

export function editProfile(customAlert, userObj){

    class ProfilePic{
        constructor(id, imgSrc, blocked = false){
            this.id = id,
            this.imgSrc = imgSrc,
            this.blocked = blocked
        }
    
        createPfpElement(){
            let pfpElement = create('div'),
                pfpImgContainer = create('div'), 
                imgTag = create('img')
        
            imgTag.src = this.imgSrc
    
            addClass(pfpElement, selectors.pfpPicContainer)
            pfpElement.setAttribute('data-pfp', this.id)
            addClass(pfpImgContainer, selectors.profilePic)
            append(pfpImgContainer, imgTag)
            append(pfpElement, pfpImgContainer)
    
            if(this.blocked){
                const $lockedProtector = create('div')
                addClass($lockedProtector, selectors.lockedPfp)
                $lockedProtector.innerHTML = `<img src="img/icons/padlock.png" alt="">`
                append(pfpImgContainer, $lockedProtector)                
            }
    
            this.pfpElement = pfpElement
    
            return pfpElement
        }
    
    }

    const $editPfpBtn = selectByClass((selectors.changePfpText)),
        $editPgpBtnIcon = selectByClass((selectors.editProfileIcon)),
        $editProfileContainer = selectByClass((selectors.editProfileContainer)),
        $pfpPreview = selectByClass((selectors.pfpPreview)),
        $saveBtn = selectByClass((selectors.saveProfileChanges)),
        $userPfp = selectById(selectors.userPfp),
        $closeBtn = selectByClass((selectors.closeIcon)),
        $inUseBox = create("div"),
        $inUseBoxTxt = create("div"),
        $pfpGrid = selectByClass((selectors.pfpsGrid)),
        PfpsLocked = 4,
        $editUsernameInput = selectByClass((selectors.editUsername)),
        $profileUsername = selectById(selectors.userUsername),
        $profilePicNotification = selectByClass((selectors.profilePicNotification))

    let initialPfpsUnlocked = userObj.unlockByTheUser

    const renderPfpsElement = (lockedPfps)=>{
        const pfpsFragment = globalVariables.d.createDocumentFragment()

        const pfpsInfo = [
            {
                src: "img/profile-pictures/image-1.jpg",
            },
            {
                src: "img/profile-pictures/image-2.jpg",
            },
            {
                src: "img/profile-pictures/image-3.jpg",
            },
            {
                src: "img/profile-pictures/image-4.jpg",
            },
            {
                src: "img/profile-pictures/image-5.jpg",
            },
            {
                src: "img/profile-pictures/image-6.jpg",
            },
            {
                src: "img/profile-pictures/image-7.jpg",
            },
            {
                src: "img/profile-pictures/image-8.jpg",
            },
            {
                src: "img/profile-pictures/image-9.jpg"
            },
            {
                src: "img/profile-pictures/image-10.jpg"
            },
            {
                src: "img/profile-pictures/image-11.jpg"
            },
            {
                src: "img/profile-pictures/image-12.jpg"
            }
        ]
    
        for(let i = 1; i <= lockedPfps; i++){
            pfpsInfo[pfpsInfo.length - i].blocked = true
        }

        let idCounter = 0
        pfpsInfo.forEach(el=>{
            let newPfp = new ProfilePic(idCounter, el.src, el.blocked)
            append(pfpsFragment, newPfp.createPfpElement())
            idCounter++
        })

        $pfpGrid.appendChild(pfpsFragment)
    }
    
    renderPfpsElement(PfpsLocked - initialPfpsUnlocked)

    const $lockedDivs = selectAllByClass((selectors.lockedPfp)),
        usernameRegex = /^[a-zA-Z0-9_-]{3,12}$/
    
    let pfpPointsId = PfpsLocked
    for(let i = $lockedDivs.length - 1; i >= 0; i--){
        $lockedDivs[i].setAttribute("data-locked-pfp-id", pfpPointsId)
        pfpPointsId--;
    }

    addClass($inUseBoxTxt, selectors.pfpInUseText)
    $inUseBoxTxt.innerHTML = "<p>In use</p>"
    addClass($inUseBox, selectors.pfpInUse)
    append($inUseBox, $inUseBoxTxt)

    let actualImg = userObj.pfpId

    const $pfps = selectAllByClass((selectors.pfpPicContainer))

    const showPfpInUse = (imgIdSelected)=>{
        let $selectedPfp = select(`div[data-pfp="${imgIdSelected}"]`)

        $pfps.forEach(el=> removeClass(el, selectors.pfpInUseBorder))

        addClass($selectedPfp, selectors.pfpInUseBorder)
        append($selectedPfp.firstElementChild, $inUseBox)
    }
    
    const renderPfpInDOM = (idImg)=>{
        let imgSrc = select(`div[data-pfp="${idImg}"]`).firstElementChild.firstElementChild.getAttribute("src")
        $pfpPreview.firstElementChild.src = imgSrc
        $userPfp.src = imgSrc
    }

    const removeSelected = () =>{
        $pfps.forEach(el=> removeClass(el, selectors.pfpPicSelected))
    }
    
    const renderUsernameInDom = (username)=>{
        $editUsernameInput.placeholder = `/${username}`
        $profileUsername.innerHTML = `/${username}`
    }
    
    renderUsernameInDom(userObj.username)
    showPfpInUse(userObj.pfpId)
    renderPfpInDOM(actualImg)

    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target.matches(classSelectorMaker(selectors.lockedPfp))){
            customAlert("Need Points to Unlock!", `Play the mini game "Soul Collector" (Only available in PC platform). You must get <span class = "points-required">${e.target.getAttribute("data-locked-pfp-id") * 1000}</span> points to be able to unlock this profile picture`)
        }

        if(e.target == $editPfpBtn || e.target == $editPgpBtnIcon){
            localStorage.setItem("isFormActivated", true)

            if(!elementContainsClass($profilePicNotification, selectors.hideNotification)) addClass($profilePicNotification, selectors.hideNotification)

            // checkIfUnlockedPfps ↓
            if(localStorage.getItem('pictureUnlocked') == 'true'){
                customAlert(undefined, `Loading...`, {isFlashAlert: true})
                fetchFromApi(`user/${userObj._id.$oid}`)
                .then(json=>{
                    if(initialPfpsUnlocked < json.unlockByTheUser){
                        let pfpsToUnlock = json.unlockByTheUser - initialPfpsUnlocked,
                            $lockedDivs = selectAllByClass((selectors.lockedPfp))                    
        
                        if(pfpsToUnlock <= $lockedDivs.length){
                            for(let i = 0; i < pfpsToUnlock; i++){
                                removeElement($lockedDivs[i])
                            }
                        }
            
                        initialPfpsUnlocked = json.unlockByTheUser
                        localStorage.setItem('pictureUnlocked', 'false')
                    }

                })
                .catch(err=>{
                    console.error(err)
                })
            }

            showPfpInUse(userObj.pfpId)

            $editUsernameInput.value = ""
            removeClass($editProfileContainer, selectors.hideEditProfile)
            let imgSrc = select(`div[data-pfp="${userObj.pfpId}"]`).firstElementChild.firstElementChild.getAttribute("src")
            $pfpPreview.firstElementChild.src = imgSrc

        }

        if(e.target.matches(classSelectorMaker(selectors.pfpPicContainer))){
            const $lockedDivs = selectAllByClass((selectors.lockedPfp)) 
            
            if(e.target.getAttribute("data-pfp") < ($pfps.length - $lockedDivs.length)){
                removeSelected()
                addClass(e.target, selectors.pfpPicSelected)
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
                pfpsUnlocked = $pfps.length - (PfpsLocked - initialPfpsUnlocked) - 1

            if ($editUsernameInput.value !== ''){ // validate if the user only want to edit the pfp
                fetchBody.username = $editUsernameInput.value
                renderUsernameInDom($editUsernameInput.value)                    
            }

            if(actualImg !== userObj.pfpId && (actualImg >= 0 && actualImg <= pfpsUnlocked)){
                fetchBody.pfpId = actualImg
            }

            fetchFromApi(`user/${userObj._id.$oid}`, 
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchBody)
            })
            .then(json =>{
                renderPfpInDOM(actualImg)
                removeSelected()
                showPfpInUse(json.pfpId)
                addClass($editProfileContainer, selectors.hideEditProfile)
                actualImg = json.pfpId
                userObj.pfpId = json.pfpId

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
                        removeElement(selectByClass((selectors.pageOverlay)))
                    },
                    noFunction(){
                        removeSelected()
                        removeElement(selectByClass((selectors.pageOverlay)))
                        addClass($editProfileContainer, selectors.hideEditProfile)
                    }
                }
    
                customAlert("Unsaved Changes", "There are unsaved changes, do you want to continue in the edit profile section?", alertOptions)

            }else{
                removeSelected()
                addClass($editProfileContainer, selectors.hideEditProfile)
            }
        }
    })

}