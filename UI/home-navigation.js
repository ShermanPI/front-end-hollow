const d = document,
w = window;

export function homeNavigation(leftArrowSelector, rightArrowSelector){
    
    const $sections = document.querySelectorAll(".section-container"),
        $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector),
        $items = d.querySelectorAll(".item-list > .item")
    
    let actualItem = 0;
    $items[actualItem].classList.add("selected-item")

    const navigateItems = (e)=>{
        e.preventDefault()
        if(e.key == "ArrowDown"){

            if(actualItem < $items.length - 1){
                actualItem++;
            }

            console.log($items[actualItem])
            $items[actualItem].scrollIntoView({block: "center"})
            $items[actualItem].classList.add("selected-item")
            $items[actualItem - 1].classList.remove("selected-item")
        }

        if(e.key == "ArrowUp"){

            if(actualItem > 0){
                actualItem--;
            }
            
            console.log($items[actualItem])
            $items[actualItem].scrollIntoView({block: "center"})
            $items[actualItem].classList.add("selected-item")
            $items[actualItem + 1].classList.remove("selected-item")
        }
    }
    
    const observerOptions = {
        threshold: 0.9
    }
    const observerCallback = (entries)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(entry.target.getAttribute("id") == "home"){
                    w.addEventListener("keydown", navigateItems)
                }else{
                    w.removeEventListener("keydown", navigateItems)
                }

                // if(entry.target.getAttribute("id") == "profile")console.log("This is the profile");
                // if(entry.target.getAttribute("id") == "admin")console.log("This is the admin");
            }
        });        
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    $sections.forEach(el=>observer.observe(el));
    


    // for(let i = 0; i<$sections.length; i++){
    //     $sections[i].setAttribute("data-id", i);
    // } set the number of the page
 
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