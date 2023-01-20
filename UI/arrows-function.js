const d = document

export function navigationArrows(leftArrowSelector, rightArrowSelector){
    const $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector)
    
    const animateArrow = function(arrow){
        const animationTiming = {
            duration: 300,
            iterations: 1,
        }
        
        if(arrow == $rightArrow){
            arrow.animate([
                {transform: 'translateX(0.5rem)'},
                {transform: 'translateX(1rem)'},
                {transform: 'translateX(1.5rem)'},
                {transform: 'translate(0)'}], animationTiming)
        }else{
            arrow.animate([
                {transform: 'translateX(-0.5rem)'},
                {transform: 'translateX(-1rem)'},
                {transform: 'translateX(-1.5rem)'},
                {transform: 'translateX(0)'}], animationTiming)
        }

    }

    window.addEventListener("keydown", (e)=>{
        console.log(e)

        if(e.key == "ArrowRight"){
            console.log("derecha")
            animateArrow($rightArrow)
        }

        if(e.key == "ArrowLeft"){
            animateArrow($leftArrow)
        }

    })
}