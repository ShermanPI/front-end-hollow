const d = document,
    w = window

export function navigatePages(leftArrowSelector, rightArrowSelector){
    const $sections = document.querySelectorAll(".section-container"),
        $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector),
        $nextPageIndicator = d.querySelector(".next-page"),
        $prevPageIndicator = d.querySelector(".prev-page"),
        $actualPageTitle = d.querySelector(".actual-page")

    for(let i = 0; i <=$sections.length - 1; i++){
        $sections[i].setAttribute("data-page-number", i)
    }

    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
        // navigate in "mobile"
    }
    else{
        // navigate in "computer"

    }

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
    $sections[currentIndex].scrollIntoView()

    let pageObserverCallback = function(entries){
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                currentIndex = entry.target.getAttribute("data-page-number")
                showSideSections()
                $actualPageTitle.textContent = $sections[currentIndex].id
                console.log("Actual page id: ", entry.target.getAttribute("data-page-number"))
            }
        })
    }

    let pageObserver = new IntersectionObserver(pageObserverCallback, {threshold: 0.9})

    $sections.forEach(el=>{
        pageObserver.observe(el)
    })

    const showSideSections = ()=>{
        if($sections[parseInt(currentIndex) + 1]){
            $nextPageIndicator.innerHTML = 
            `${$sections[parseInt(currentIndex) + 1].id.charAt(0).toUpperCase() + $sections[parseInt(currentIndex) + 1].id.slice(1)}
            <img src="img/UI/Expandarrow.png" alt="">`
        }else{
            $nextPageIndicator.innerHTML = ""
        }

        if($sections[parseInt(currentIndex) - 1]){
            $prevPageIndicator.innerHTML = 
            `<img src="img/UI/Expandarrow.png" alt="">
            ${$sections[parseInt(currentIndex) - 1].id.charAt(0).toUpperCase() + $sections[parseInt(currentIndex) - 1].id.slice(1)}`
        }else{
            $prevPageIndicator.innerHTML = ""
        }
    }

    showSideSections()

    const movePages = (steps)=>{ //me quedé aquí XD
        if((steps + parseInt(currentIndex)) < 0) return;
        if(steps + parseInt(currentIndex) > $sections.length - 1)  return;    
        currentIndex = steps + parseInt(currentIndex)

        $sections[currentIndex].scrollIntoView()
        showSideSections()
        
    }

    d.addEventListener("click", (e)=>{
        if(e.target == $rightArrow){
            animateArrow($rightArrow)
            movePages(1)
        }
        if(e.target == $leftArrow){
            animateArrow($leftArrow)
            movePages(-1)
        }
    })

    w.addEventListener("keydown", (e)=>{
        e.preventDefault()

        if(e.key == "ArrowRight"){
            animateArrow($rightArrow)
            movePages(1)
        }

        if(e.key == "ArrowLeft"){
            animateArrow($leftArrow)
            movePages(-1)
        }

    })
}