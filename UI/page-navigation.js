const d = document,
    w = window

export function navigatePages(leftArrowSelector, rightArrowSelector){
    const $sections = document.querySelectorAll(".section-container"),
        $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector),
        $nextPageIndicator = d.querySelector(".next-page"),
        $prevPageIndicator = d.querySelector(".prev-page")

        

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
    
    let currentIndex = 0;

    const showSideSections = ()=>{
        if($sections[parseInt(currentIndex) + 1]){
            $nextPageIndicator.innerHTML = 
            `${$sections[parseInt(currentIndex) + 1].getAttribute("id")}
            <img src="img/UI/Expandarrow.png" alt="">`
        }else{
            $nextPageIndicator.innerHTML = ""
        }

        if($sections[parseInt(currentIndex) - 1]){
            $prevPageIndicator.innerHTML = 
            `<img src="img/UI/Expandarrow.png" alt="">
            ${$sections[parseInt(currentIndex) - 1].getAttribute("id")}`
        }else{
            $prevPageIndicator.innerHTML = ""
        }
    }

    showSideSections()

    function moveToRight(){
        if(currentIndex !== $sections.length - 1) {
            currentIndex++;
        }

        $sections[currentIndex].scrollIntoView()
        showSideSections()

    }

    function moveToLeft(){
        if(currentIndex !== 0) {
            currentIndex--;
        }

        $sections[currentIndex].scrollIntoView()
        showSideSections()

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