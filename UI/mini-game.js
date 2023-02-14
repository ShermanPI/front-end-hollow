const d = document

export function miniGameScore (){
    const $totemImg = d.querySelector(".game-icon img"),
        $actualScoreContainer = d.querySelector(".actual-score"),
        $highScoreContainer = d.getElementById("high-score"),
        $gameTimeContainer = d.getElementById("game-time"),
        $playBtn = d.getElementById("play-btn"),
        $restartBtn = d.getElementById("restart-btn"),
        $miniGameContainer = d.querySelector(".mini-game"),
        $itemToClick = d.querySelector(".item-to-click"),
        $multiplierTxt = d.querySelector(".multiplier-txt"),
        $actualMultiplierContainer = d.querySelector(".actual-multiplier"),
        $timeSum = d.querySelector(".time-sum"),
        $gameIconContainer = d.querySelector(".icon-container")
            
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

    if(localStorage.getItem("HScore")){
        highScore = parseInt(localStorage.getItem("HScore"))
        $highScoreContainer.innerHTML = addExtraZeros(highScore)
    }

    const setScoreInScreen = (score)=>{
        $actualScoreContainer.innerHTML = addExtraZeros(score)
    }

    const checkNewRecord = ()=>{
        if(actualScore > highScore){
            highScore = actualScore
            localStorage.setItem("HScore", highScore)
            $highScoreContainer.innerHTML = addExtraZeros(highScore)
        }
    }

    const restartGame = ()=>{
        $multiplierTxt.innerHTML = `x1`
        $actualMultiplierContainer.innerHTML= "x1"
        checkNewRecord()
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
        $itemToClick.classList.add("hide-multiplier");
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
        $itemToClick.classList.remove("hide-multiplier");
    }

    const generateRandomCoord = ()=>{
        let x = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().width - $itemToClick.getBoundingClientRect().width))
        let y = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().height - $itemToClick.getBoundingClientRect().height))
        
        showItemToClick(`${x}px`, `${y}px`)
    }

    let hideItemTimeOut;

    d.addEventListener("click", (e)=>{

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
                    $gameTimeContainer.classList.remove("little-time")
                    checkNewRecord()
                }else{
                    gameTime -= 1;
                    if(gameTime <= 5){
                        $gameTimeContainer.classList.add("little-time")
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
                checkNewRecord()
                setScoreInScreen(actualScore)
                
            }

        }

        if(e.target == $restartBtn){ // # when restart btn is pressed
            restartGame()
            setScoreInScreen(0)
        }

        if(e.target == $itemToClick){
            if($itemToClick.getAttribute("data-item-type") == "addTime"){
                console.log($itemToClick.getAttribute("data-item-type"))
                gameTime+= 5
                $gameTimeContainer.classList.remove("little-time")
                $timeSum.classList.remove("hide-multiplier-txt")

                setTimeout(()=>{
                    $timeSum.classList.add("hide-multiplier-txt")
                }, 700)
            }
            if($itemToClick.getAttribute("data-item-type") == "multiplier"){
                scoreMultiplier += 1;
                $multiplierTxt.innerHTML = `x${scoreMultiplier}`;
                $actualMultiplierContainer.innerHTML = `x${scoreMultiplier}`;
                $multiplierTxt.classList.remove("hide-multiplier-txt");

                setTimeout(()=>{
                    $multiplierTxt.classList.add("hide-multiplier-txt");
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

    d.addEventListener("click", function(e) {
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