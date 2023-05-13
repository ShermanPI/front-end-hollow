import { addClass, classSelectorMaker, elementContainsClass, removeClass, selectByClass, selectAllByClass, selectById } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"

export function navigatePages(){
    const $sections = selectAllByClass((selectors.sectionContainer)),
        $leftArrow = selectByClass((selectors.leftFullArrow)),
        $rightArrow = selectByClass((selectors.rightFullArrow)),
        $nextPageIndicator = selectByClass((selectors.nextPageIndicator)),
        $prevPageIndicator = selectByClass((selectors.prevPageIndicator)),
        $actualPageTitle = selectByClass((selectors.actualPage))

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
        let $sections = selectAllByClass(selectors.sectionContainer)

        if($sections[parseInt(currentIndex) + 1] && !elementContainsClass($sections[(parseInt(currentIndex) + 1)], selectors.adminOptionHidden)){
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
        const $sections = selectAllByClass(selectors.sectionContainer)

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

    globalVariables.d.addEventListener("click", (e)=>{
        if(e.target == $rightArrow || e.target == $nextPageIndicator || e.target == selectByClass(selectors.nextIconPageIndicator)){
            animateArrow($rightArrow)
            movePages(1)
        }
        if(e.target == $leftArrow || e.target == $prevPageIndicator || e.target == selectByClass(selectors.prevIconPageIndicator)){
            animateArrow($leftArrow)
            movePages(-1)
        }
    })

    addEventListener("keydown", (e)=>{
        
        if(e.key == globalVariables.keyBoardRightKey){
            if(localStorage.getItem("isFormActivated") == "false"){
                e.preventDefault()
                animateArrow($rightArrow)
                movePages(1)
            }
        }

        if(e.key == globalVariables.keyBoardleftKey){
            if(localStorage.getItem("isFormActivated") == "false"){
                e.preventDefault()
                animateArrow($leftArrow)
                movePages(-1)
            }
        }

    })
    
    
    globalVariables.d.addEventListener("click", (e)=>{
        const menuItems = selectAllByClass((selectors.pageMenuAnchor))

        if(e.target.matches(classSelectorMaker(selectors.pageMenuAnchor))){
            e.preventDefault()
            
            let pageToMoveInto = selectById(e.target.getAttribute("href").slice(1))

            menuItems.forEach(el=>{
                removeClass(el, selectors.menuItemSelected)
            })

            addClass(e.target, selectors.menuItemSelected)
            $sections[pageToMoveInto.getAttribute("data-page-number")].scrollIntoView();
        }

    })
}