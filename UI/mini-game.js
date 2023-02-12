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
        $actualMultiplierContainer = d.querySelector(".actual-multiplier")
            
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
    }

    const showItemToClick = (leftPxls, topPxls)=>{
        $itemToClick.style.left = leftPxls;
        $itemToClick.style.top = topPxls;
        $itemToClick.classList.remove("hide-multiplier");
    }

    const generateRandomCoord = ()=>{
        let x = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().width - $itemToClick.getBoundingClientRect().width))
        let y = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().height - $itemToClick.getBoundingClientRect().height))
        
        showItemToClick(`${x}px`, `${y}px`)
    }

    const generateRandomMultiplierCoord = ()=>{
        let x = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().width - $itemToClick.getBoundingClientRect().width))
        let y = Math.floor(Math.random() * ($miniGameContainer.getBoundingClientRect().height - $itemToClick.getBoundingClientRect().height))
        
        
    }


    d.addEventListener("click", (e)=>{

        if(e.target == $playBtn){ // # when play btn is pressed
            restartGame()
            scoreMultiplier = 1
            isPlaying = true

            multiplierItemInterval = setInterval(()=>{
                generateRandomCoord()

                setTimeout(()=>{
                    hideItemToClick()
                }, 750)
            }, 3000)

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
            hideItemToClick()
            scoreMultiplier += 1;
            $multiplierTxt.innerHTML = `x${scoreMultiplier}`;
            $actualMultiplierContainer.innerHTML = `x${scoreMultiplier}`;
            $multiplierTxt.classList.remove("hide-multiplier-txt");
            setTimeout(()=>{
                $multiplierTxt.classList.add("hide-multiplier-txt");
            }, 700)
            console.log("se ha dado click al multiplier", scoreMultiplier)
        }
    })
}