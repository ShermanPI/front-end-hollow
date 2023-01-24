const d = document


export function navigationArrows(leftArrowSelector, rightArrowSelector){
    const $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector),
        $sections = d.querySelectorAll(".section-container")

    let currentIndex = 0;

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

    function hideArrow(arrow){
        arrow.style.visibility = "hidden"
    }
    
    if(currentIndex == 0) hideArrow($leftArrow);
    if(currentIndex == ($sections.length - 1)) hideArrow($rightArrow);

    function moveToRight(){

        if(currentIndex < $sections.length) {
            currentIndex++;
        }

        if(currentIndex > 0)$leftArrow.style.visibility = "visible";
        
        if(currentIndex == ($sections.length - 1)){
            currentIndex = $sections.length - 1;
            hideArrow($rightArrow);
        }

        $sections[currentIndex].scrollIntoView()

    }

    function moveToLeft(){
        
        if(currentIndex > 0) {
            currentIndex--;
        }

        if(currentIndex == 0){
            hideArrow($leftArrow)
            currentIndex = 0;
        }

        if(currentIndex < ($sections.length - 1)){
            $rightArrow.style.visibility = "visible"
        }

        $sections[currentIndex].scrollIntoView()
            
    }

    d.addEventListener("click", (e)=>{
        
        if(e.target == $rightArrow){
            animateArrow($rightArrow)
            moveToRight()
        }
        if(e.target == $leftArrow){
            animateArrow($leftArrow)
            moveToLeft()
        }
    })

    window.addEventListener("keydown", (e)=>{
        e.preventDefault()

        if(e.key == "ArrowRight"){
            animateArrow($rightArrow)
            moveToRight()
        }

        if(e.key == "ArrowLeft"){
            animateArrow($leftArrow)
            moveToLeft()
        }

    })
}