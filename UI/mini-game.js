import { addClass, fetchFromApi, removeClass, selectByClass, selectById } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";
import { selectors } from "../utils/selectors.js";

export function miniGame(userObj, customAlert){
    const $totemImg = selectByClass(selectors.gameIconImg),
        $actualScoreContainer = selectByClass(selectors.actualScore),
        $highScoreContainer = selectById(selectors.highScore),
        $gameTimeContainer = selectById(selectors.gameTime),
        $playBtn = selectById(selectors.playBtn),
        $restartBtn = selectById(selectors.restartBtn),
        $miniGameContainer = selectByClass(selectors.miniGame),
        $itemToClick = selectByClass(selectors.itemToClick),
        $multiplierTxt = selectByClass(selectors.multiplierTxt),
        $actualMultiplierContainer = selectByClass(selectors.actualMultiplier),
        $timeSum = selectByClass(selectors.timeSum),
        $gameIconContainer = selectByClass(selectors.iconContainer),
        $profilePicNotification = selectByClass(selectors.profilePicNotification)
            
    const gameDuration = 20;

    let actualScore = 0, 
        isPlaying = false,
        gameTime = gameDuration,
        scoreMultiplier = 1;

    let highScore = 0
    
    $gameTimeContainer.innerHTML = gameTime

    const addExtraZeros = (number)=>{
        if(number < 10){
            number = "00" + number
            return number
        }

        if(number < 100 && number > 9){
            number = "0" + number
            return number
        }

        return number
    }

    highScore = userObj.HScore
    $highScoreContainer.innerHTML = addExtraZeros(highScore)
    

    const showScoreInDOM = (score)=>{
        $actualScoreContainer.innerHTML = addExtraZeros(score)
    }

    let initialPfpsUnlocked = userObj.unlockByTheUser

    const checkNewRecord = (goalToNewPfp)=>{
        if(actualScore > highScore){
            highScore = actualScore
            const fetchBody = {}
            
            fetchBody.HScore = highScore
            let unlockedByTheUser = Math.floor((highScore) / goalToNewPfp)
            fetchBody.unlockByTheUser = unlockedByTheUser

            fetchFromApi(`user/${userObj._id.$oid}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(fetchBody)
            })
            .then(json =>{
                $highScoreContainer.innerHTML = addExtraZeros(highScore)
                if(initialPfpsUnlocked < json.unlockByTheUser){
                    localStorage.setItem('pictureUnlocked', 'true')
                    removeClass($profilePicNotification, selectors.hideNotification)
                    customAlert(undefined, "New profile picture unlocked!", {isFlashAlert: true})
                    initialPfpsUnlocked = json.unlockByTheUser
                }
            })
            .catch(err=>console.error(err))

        }
    }

    checkNewRecord(1000)

    const restartGame = ()=>{
        $multiplierTxt.innerHTML = `x1`
        $actualMultiplierContainer.innerHTML= "x1"
        checkNewRecord(1000)
        $gameTimeContainer.classList.remove("little-time")
        actualScore = 0
        $actualScoreContainer.innerHTML = "000"
        gameTime = gameDuration;
        $gameTimeContainer.innerHTML = gameTime
        clearInterval(gameTimeInterval)
        clearInterval(multiplierItemInterval)
        isPlaying = false
    }

    let gameTimeInterval,
        multiplierItemInterval;
    
    const hideItemToClick = ()=>{
        addClass($itemToClick, selectors.hideMultiplier)
        $itemToClick.firstElementChild.src = ""

    }

    const showItemToClick = (leftPxls, topPxls)=>{
        let randomNum = Math.floor(Math.random() * 4)

        if(randomNum !== 2){
            $itemToClick.setAttribute("data-item-type", 'multiplier')
            $itemToClick.firstElementChild.src = "../img/character/Vengefly.webp"
        }else{
            $itemToClick.setAttribute("data-item-type", 'addTime')
            $itemToClick.firstElementChild.src = "../img/character/Lifeseed.webp"
        }
        $itemToClick.style.left = leftPxls;
        $itemToClick.style.top = topPxls;
        removeClass($itemToClick, selectors.hideMultiplier)
    }

    const generateRandomCoord = ()=>{
        let x = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().width - $itemToClick.getBoundingClientRect().width))
        let y = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().height - $itemToClick.getBoundingClientRect().height))
        
        showItemToClick(`${x}px`, `${y}px`)
    }

    let hideItemTimeOut;

    globalVariables.d.addEventListener("click", (e)=>{

        if(e.target == $playBtn){ // # when play btn is pressed
            restartGame()
            scoreMultiplier = 1
            isPlaying = true

            multiplierItemInterval = setInterval(()=>{
                generateRandomCoord()

                hideItemTimeOut = setTimeout(()=>{
                    hideItemToClick()
                }, 1000)
            }, Math.random() * (3000 - 2000) + 2000)

            gameTimeInterval = setInterval(()=>{
                if(gameTime <= 0){
                    clearInterval(gameTimeInterval)
                    clearInterval(multiplierItemInterval)
                    isPlaying = false
                    removeClass($gameTimeContainer, selectors.littleTime)
                    checkNewRecord(1000)
                }else{
                    gameTime -= 1;
                    if(gameTime <= 5){
                        addClass($gameTimeContainer, selectors.littleTime)
                    }

                    if(gameTime < 10){
                        $gameTimeContainer.innerHTML = "0" + gameTime.toString()
                    }else{
                        $gameTimeContainer.innerHTML = gameTime
                    }
                }


            }, 1000)
        }

        if(e.target == $totemImg){ // # when totem btn is pressed
            if(isPlaying){
                actualScore += (3 * scoreMultiplier);
                if(actualScore > highScore){
                    $highScoreContainer.innerHTML = addExtraZeros(actualScore)
                }
                showScoreInDOM(actualScore)
            }
        }

        if(e.target == $restartBtn){
            restartGame()
            showScoreInDOM(0)
        }

        if(e.target == $itemToClick){
            if($itemToClick.getAttribute("data-item-type") == "addTime"){
                gameTime+= 5
                removeClass($gameTimeContainer, selectors.littleTime)
                removeClass($timeSum, selectors.hideMultiplierTxt)

                setTimeout(()=>{
                    addClass($timeSum, selectors.hideMultiplierTxt)
                }, 700)
            }
            if($itemToClick.getAttribute("data-item-type") == "multiplier"){
                scoreMultiplier += 1;
                $multiplierTxt.innerHTML = `x${scoreMultiplier}`;
                $actualMultiplierContainer.innerHTML = `x${scoreMultiplier}`;
                removeClass($multiplierTxt, selectors.hideMultiplierTxt)

                setTimeout(()=>{
                    addClass($multiplierTxt, selectors.hideMultiplierTxt)
                }, 700)
            }

            hideItemToClick()
            clearTimeout(hideItemTimeOut)
        }
    })

    const initialGradient = 28;
    let gradientSumGap = initialGradient;
    let maxGradientValue = 53;
    let decreaseBackground;

    globalVariables.d.addEventListener("click", function(e) {
        if(e.target == $totemImg && isPlaying){
            if(gradientSumGap <= maxGradientValue){
                gradientSumGap+=3
                $gameIconContainer.style.background = `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) ${gradientSumGap}%)`    
            }

            clearInterval(decreaseBackground);

            decreaseBackground = setInterval(()=>{
                if(gradientSumGap <= initialGradient){
                    clearInterval(decreaseBackground)
                }else{
                    gradientSumGap -= 1;
                    $gameIconContainer.style.background = `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) ${gradientSumGap}%)`   
                }
            }, 200)

        }
    });
}