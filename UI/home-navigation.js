const d = document,
w = window;

export function homeNavigation(leftArrowSelector, rightArrowSelector){
    
    const $sections = document.querySelectorAll(".section-container"),
        $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector),
        $items = d.querySelectorAll(".item-list > .item"),
        $itemList = d.getElementById("home-list")

        
        for(let i = 0; i<$items.length; i++){
            $items[i].setAttribute("data-item-id", i);
        }

    // to know if the user stopped scroll
    // let timeOut;
    // $itemList.addEventListener("scroll", (e)=>{
    //     clearTimeout(timeOut)
    //     timeOut = setTimeout(()=>{
    //         console.log("se ha parado de escrollear")
    //     }, 100)
    //     e.stopPropagation()
    // })

    $itemList.addEventListener("wheel", (e)=>{
        e.preventDefault()
        console.log("hola")
    })
    
    // know the active items in the middle of item-list

    let getTheMiddle = ()=>{
        let itemHeight = $items[0].getBoundingClientRect().height,
        listHeight = $itemList.getBoundingClientRect().height
        
        return  `-${((listHeight/2) - (itemHeight/2))}px 0px -${((listHeight/2) - (itemHeight/2))}px 0px`
    }
    
    let actualItem = 0;

    const moveToItem = (actualItem)=>{
        $items[actualItem].classList.add("selected-item")

        if(actualItem !== 0){
            $items[(actualItem - 1)].classList.remove("selected-item")
        }

        if(((actualItem+1) < $items.length)){
            $items[(actualItem + 1)].classList.remove("selected-item")
        }
            

    }

    let observeItemFunc = (entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                console.log(entry.target, " esta en el medio")
                actualItem = entry.target.getAttribute("data-item-id")
                console.log(actualItem)
                moveToItem(actualItem)
            }
        })
    }

    let itemsObserver = new IntersectionObserver(observeItemFunc, 
        {root: $itemList, rootMargin: getTheMiddle()});
    
    $items.forEach(el=>{
        itemsObserver.observe(el)
    })

    w.addEventListener("resize", (e)=>{
        itemsObserver.disconnect() //stop the last intersectionObserver and re make it with the new values of observation
        itemsObserver = new IntersectionObserver(observeItemFunc, 
            {root: $itemList, rootMargin: getTheMiddle()});
        

        $items.forEach(el=>{
            itemsObserver.observe(el)
        })
    })


    // console.log(document.querySelector(`[data-item-id="${2}"]`))

    $items[actualItem].classList.add("selected-item")

    const navigateItems = (e)=>{
        e.preventDefault()
        if(e.key == "ArrowDown"){

            if(actualItem < $items.length - 1){
                actualItem++;
            }

            $items[actualItem].scrollIntoView({block: "center"})
            $items[actualItem].classList.add("selected-item")
            $items[actualItem - 1].classList.remove("selected-item")
        }

        if(e.key == "ArrowUp"){
            if(actualItem > 0){
                actualItem--;
            }
            
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