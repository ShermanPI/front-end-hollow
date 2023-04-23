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
    $sections[currentIndex].scrollIntoView({behavior: "auto"})

    let pageObserverCallback = function(entries){
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                currentIndex = entry.target.getAttribute("data-page-number")
                showSideSections()
                $actualPageTitle.textContent = $sections[currentIndex].id.toUpperCase()
            }
        })
    }

    let pageObserver = new IntersectionObserver(pageObserverCallback, {threshold: 0.9})

    $sections.forEach(el=>{
        pageObserver.observe(el)
    })

    const showSideSections = ()=>{
        let $sections = document.querySelectorAll(".section-container")

        if($sections[parseInt(currentIndex) + 1] && !$sections[(parseInt(currentIndex) + 1)].classList.contains("admin-option-hidden")){
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

    const movePages = (steps)=>{        
        const $sections = document.querySelectorAll(".section-container")

        if((steps + parseInt(currentIndex)) < 0) return;
        if(steps + parseInt(currentIndex) > $sections.length - 1)  return;

        if($sections[(parseInt(currentIndex) + 1)] && steps > 0){
            if(!$sections[(parseInt(currentIndex) + 1)].classList.contains("admin-option-hidden")){
                currentIndex = steps + parseInt(currentIndex)
                $sections[currentIndex].scrollIntoView({behavior: "smooth"})
                showSideSections()
            }
        }else{
            currentIndex = steps + parseInt(currentIndex)
            $sections[currentIndex].scrollIntoView({behavior: "smooth"})
            showSideSections()
        }

    }

    d.addEventListener("click", (e)=>{
        if(e.target == $rightArrow || e.target == $nextPageIndicator){
            animateArrow($rightArrow)
            movePages(1)
        }
        if(e.target == $leftArrow || e.target == $prevPageIndicator){
            animateArrow($leftArrow)
            movePages(-1)
        }
    })

    w.addEventListener("keydown", (e)=>{
        
        if(e.key == "ArrowRight"){
            if(localStorage.getItem("isFormActivated") == "false"){
                e.preventDefault()
                animateArrow($rightArrow)
                movePages(1)
            }
        }

        if(e.key == "ArrowLeft"){
            if(localStorage.getItem("isFormActivated") == "false"){
                e.preventDefault()
                animateArrow($leftArrow)
                movePages(-1)
            }
        }

    })

    const menuItems = d.querySelectorAll(".page-menu-anchor") 

    d.addEventListener("click", (e)=>{

        if(e.target.matches(".page-menu-anchor")){
            e.preventDefault()
            
            let pageToMoveInto = document.getElementById(e.target.getAttribute("href").slice(1))

            // removing the hover from all items
            menuItems.forEach(el=>{
                el.classList.remove("menu-item-selected")
            })

            e.target.classList.add("menu-item-selected")
            $sections[pageToMoveInto.getAttribute("data-page-number")].scrollIntoView();
        }

    })
}