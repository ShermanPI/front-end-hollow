const d = document

export function miniGameScore (){
    const $totemImg = d.querySelector(".game-icon img"),
        $actualScoreContainer = d.querySelector(".actual-score"),
        $highScoreContainer = d.getElementById("high-score"),
        $gameTimeContainer = d.getElementById("game-time"),
        $playBtn = d.getElementById("play-btn"),
        $restartBtn = d.getElementById("restart-btn"),
        $miniGameContainer = d.querySelector(".mini-game")

    console.log($miniGameContainer.getBoundingClientRect())
            
    const gameDuration = 20;

    let actualScore = 0, 
        isPlaying = false,
        gameTime = gameDuration;

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
        checkNewRecord()
        $gameTimeContainer.classList.remove("little-time")
        actualScore = 0
        $actualScoreContainer.innerHTML = "000"
        gameTime = gameDuration;
        $gameTimeContainer.innerHTML = gameTime
        clearInterval(gameTimeInterval)
        isPlaying = false
    }

    let gameTimeInterval;

    d.addEventListener("click", (e)=>{
        if(e.target == $playBtn){ // # when play btn is pressed
            restartGame()
            isPlaying = true

            gameTimeInterval = setInterval(()=>{
                if(gameTime <= 0){
                    clearInterval(gameTimeInterval)
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
                actualScore += 3;
                checkNewRecord()
                setScoreInScreen(actualScore)
            }

        }

        if(e.target == $restartBtn){ // # when restart btn is pressed
            restartGame()
            setScoreInScreen(0)
        }


    })
}