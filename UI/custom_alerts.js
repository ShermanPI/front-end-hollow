const d = document

export function customAlert(title = undefined, alertMsg = "There is no msg here ⚔️", alertOptions = {}){
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

    console.log("eso se debio disparar")
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
            }

            if(e.target == $cancelBtnClone){
                alertOptions.noFunction()
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