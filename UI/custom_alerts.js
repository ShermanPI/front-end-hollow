const d = document

export function customAlert(title = undefined, alertMsg = "There is no msg here ⚔️", alertOptions = {}){
    if(alertOptions.isFlashAlert){

        if(d.querySelector(".flash-alert")){
            d.querySelector(".flash-alert").remove()
        }

        const $flashAlertContainer = d.createElement("div"),
            $flashAlertImgContainer = d.createElement("div"),
            $flashAlertImg = d.createElement("img"),
            $flashMessage = d.createElement("p")
        
        $flashAlertContainer.classList.add("flash-alert")
        $flashAlertImgContainer.classList.add("flash-alert-icon-container")
        $flashAlertImgContainer.appendChild($flashAlertImg)
        $flashAlertImg.src = "img/icons/mask-shard.png"
        $flashMessage.classList.add("flash-alert-message")
        $flashMessage.innerHTML = alertMsg

        $flashAlertContainer.appendChild($flashAlertImgContainer)
        $flashAlertContainer.appendChild($flashMessage)
        $flashAlertContainer.appendChild($flashAlertImgContainer.cloneNode(true))
        d.querySelector("body").prepend($flashAlertContainer)

        setTimeout(()=>{
            if(d.querySelector(".flash-alert")){
                d.querySelector(".flash-alert").remove()
            }
        }, 3000)
        return;
    }

    const $alertBackOverlay = d.createElement("div"),
        $alertContainer = d.createElement("div"),
        $alertTitle = d.createElement("b"),
        $alertMsg = d.createElement("p"),
        $alertImgTop = d.createElement("img"),
        $alertImgBottom = d.createElement("img"),
        $alertOkBtn = d.createElement("b"),
        $body = d.querySelector("body")

    $alertImgTop.src = "img/icons/Dialogue_Top.png"
    $alertImgBottom.src = "img/icons/Dialogue_Bottom.png"

    $alertBackOverlay.classList.add("page-overlay")
    $alertContainer.classList.add("alert-container")
    $alertTitle.classList.add("alert-title")
    $alertMsg.classList.add("alert-msg")
    $alertOkBtn.classList.add("alert-ok-btn")
    $alertOkBtn.innerHTML = "Accept"

    if(title){
        $alertTitle.innerHTML = title
    }
    $alertMsg.innerHTML = alertMsg

    $alertBackOverlay.appendChild($alertContainer)

    let alertContainerChilds = [$alertImgTop, $alertImgBottom, $alertTitle, $alertMsg]

    if(alertOptions.isConfirmType){
        const $cancelBtnClone = $alertOkBtn.cloneNode()
        const $btnsContainer = d.createElement("div")
        $alertOkBtn.innerHTML = "Yes"
        $cancelBtnClone.innerHTML = "No"
        $btnsContainer.appendChild($alertOkBtn)
        $btnsContainer.appendChild($cancelBtnClone)
        $btnsContainer.classList.add("confirm-btn-container")

        alertContainerChilds = [...alertContainerChilds, $btnsContainer]
        
        d.addEventListener("click", (e)=>{
            if(e.target == $alertOkBtn){
                alertOptions.yesFunction()
                $alertBackOverlay.remove()
            }

            if(e.target == $cancelBtnClone){
                if(alertOptions.noFunction){
                    alertOptions.noFunction()
                }else{
                    $alertBackOverlay.remove()
                }
            }
        })

    }else{
        alertContainerChilds = [...alertContainerChilds, $alertOkBtn]

        d.addEventListener("click", (e)=>{
            if(e.target == $alertOkBtn){
                $alertBackOverlay.remove()
            }
        })
    }

    alertContainerChilds.forEach(el=>{
        $alertContainer.appendChild(el)
    })

    $body.insertBefore($alertBackOverlay, $body.firstElementChild)
}