import { addClass, append, create, removeElement, select, selectByClass } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"

export function customAlert(title = undefined, alertMsg = "There is no msg here ⚔️", alertOptions = {}){
    if(alertOptions.isFlashAlert){

        if(selectByClass((selectors.flashAlert))){
            removeElement(selectByClass((selectors.flashAlert)))
        }

        const $flashAlertContainer = create('div'),
            $flashAlertImgContainer = create("div"),
            $flashAlertImg = create("img"),
            $flashMessage = create("p")
        
        addClass($flashAlertContainer, selectors.flashAlert)
        addClass($flashAlertImgContainer, selectors.flashAlertIconContainer)
        append($flashAlertImgContainer, $flashAlertImg)
        $flashAlertImg.src = "img/icons/mask-shard.png"
        addClass($flashMessage, selectors.flashAlertMessage)
        $flashMessage.innerHTML = alertMsg

        append($flashAlertContainer, $flashAlertImgContainer)
        append($flashAlertContainer, $flashMessage)
        append($flashAlertContainer, $flashAlertImgContainer.cloneNode(true))
        select(selectors.body).prepend($flashAlertContainer)
        
        setTimeout(()=>{
            if(selectByClass((selectors.flashAlert))){
                removeElement(selectByClass((selectors.flashAlert)))
            }
        }, 3000)
        return;
    }

    const $alertBackOverlay = create("div"),
        $alertContainer = create("div"),
        $alertTitle = create("b"),
        $alertMsg = create("p"),
        $alertImgTop = create("img"),
        $alertImgBottom = create("img"),
        $alertOkBtn = create("b"),
        $body = select(selectors.body)

    $alertImgTop.src = "img/icons/Dialogue_Top.png"
    $alertImgBottom.src = "img/icons/Dialogue_Bottom.png"

    addClass($alertBackOverlay, selectors.pageOverlay)
    addClass($alertContainer, selectors.alertcontainer)
    addClass($alertTitle, selectors.alertTitle)
    addClass($alertMsg, selectors.alertMsg)
    addClass($alertOkBtn, selectors.alertOkBtn)
    $alertOkBtn.innerHTML = "Accept"

    if(title){
        $alertTitle.innerHTML = title
    }
    $alertMsg.innerHTML = alertMsg

    append($alertBackOverlay, $alertContainer)

    let alertContainerChilds = [$alertImgTop, $alertImgBottom, $alertTitle, $alertMsg]

    if(alertOptions.isConfirmType){
        const $cancelBtnClone = $alertOkBtn.cloneNode()
        const $btnsContainer = create("div")
        $alertOkBtn.innerHTML = "Yes"
        $cancelBtnClone.innerHTML = "No"
        append($btnsContainer, $alertOkBtn)
        append($btnsContainer, $cancelBtnClone)
        addClass($btnsContainer, selectors.confirmBtnContainer)

        alertContainerChilds = [...alertContainerChilds, $btnsContainer]
        
        globalVariables.d.addEventListener("click", (e)=>{
            if(e.target == $alertOkBtn){
                alertOptions.yesFunction()
                removeElement($alertBackOverlay)
            }

            if(e.target == $cancelBtnClone){
                if(alertOptions.noFunction){
                    alertOptions.noFunction()
                }else{
                    removeElement($alertBackOverlay)
                }
            }
        })

    }else{
        alertContainerChilds = [...alertContainerChilds, $alertOkBtn]

        globalVariables.d.addEventListener("click", (e)=>{
            if(e.target == $alertOkBtn){
                removeElement($alertBackOverlay)
            }
        })
    }

    alertContainerChilds.forEach(el=>{
        append($alertContainer, el)
    })

    $body.insertBefore($alertBackOverlay, $body.firstElementChild)
}