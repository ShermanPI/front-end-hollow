const d = document,
w = window;

export function homeNavigation(leftArrowSelector, rightArrowSelector){
    
    const $items = d.querySelectorAll(".item-list > .item"),
        $sections = document.querySelectorAll(".section-container"),
        $firstItem = d.querySelector(".first-item"),
        $lastItem = d.querySelector(".last-item"),
        $itemList = d.getElementById("home-list"),
        $arrowsDivisor = d.getElementById("actual-item-height"),
        $arrowUp = d.querySelector(".navigate-item-up"),
        $arrowDown = d.querySelector(".navigate-item-down")
        
    const resizeArrowDivisor = ()=>{
        $arrowsDivisor.style.height = `calc(${$items[actualItem].getBoundingClientRect().height}px + 0.2rem)`
    } 

    for(let i = 0; i<$items.length; i++){
        $items[i].setAttribute("data-item-id", i);
    }
    
    // NAVIGATE ITEMS IN computer
    const animationTiming = {
        duration: 250,
        iterations: 1,
    }
    //NavigateItemDown
    const navigateItemDown = ()=>{
        if(actualItem < $items.length - 1){
            actualItem++;
        }

        resizeArrowDivisor()
        $arrowDown.animate([
            {transform: 'translateY(1rem)'},
            {transform: 'translate(0)'}], animationTiming)

        console.log("actual item by wheel event or keyboard: ", actualItem)

        $items[actualItem].scrollIntoView({block: "center"})
        $items[actualItem].classList.add("selected-item")
        $items[actualItem - 1].classList.remove("selected-item")

        if(actualItem == 1){
            $items[actualItem].style.marginBlock = "5rem";
            $firstItem.style.marginBottom = "1rem";
            return;
        }

        if(actualItem == $items.length - 1){
            $lastItem.style.marginTop = "5rem"
            $lastItem.previousElementSibling.style.marginBlock = "1rem";
            return;
        }

        $items[actualItem].style.marginBlock = "5rem"
        $items[actualItem].previousElementSibling.style.marginBlock = "1rem"
    }
    //NavigateItemUp
    const navigateItemUp = ()=>{
        if(actualItem > 0){
            actualItem--;
        }

        resizeArrowDivisor()
        $arrowUp.animate([
            {transform: 'translateY(-1rem)'},
            {transform: 'translate(0)'}], animationTiming)

        console.log("item actual by wheel event: ", actualItem)

        $items[actualItem].scrollIntoView({block: "center"})
        $items[actualItem].classList.add("selected-item")
        $items[parseInt(actualItem) + 1].classList.remove("selected-item")

        if(actualItem == $items.length - 2){
            $lastItem.style.marginTop = "1rem";
            $items[actualItem].style.marginBlock = "5rem";
            return;
        }

        if(actualItem == 0){
            $firstItem.style.marginBottom = "5rem"
            $items[actualItem].nextElementSibling.style.marginBlock = "1rem";
            return;
        }
        
        $items[actualItem].style.marginBlock = "5rem"
        $items[actualItem].nextElementSibling.style.marginBlock = "1rem"
    }

    let actualItem = 0;

    if(innerWidth >= 1024){
        $items[actualItem].style.marginBottom = "5rem"
        resizeArrowDivisor()
    }
    
    $itemList.addEventListener("wheel", (e)=>{
        e.preventDefault()
        if (e.deltaY > 0) { //wheels down
            navigateItemDown()
        } else { //wheels up
            navigateItemUp()
        }

    })


    // NAVIGATE ITEMS in cellphone
    const moveToItem = (actualItem)=>{
        if($items[parseInt(actualItem) - 1]){
            $items[parseInt(actualItem) - 1].classList.remove("selected-item")
        }

        if($items[parseInt(actualItem) + 1]){
            $items[parseInt(actualItem) + 1].classList.remove("selected-item")
        }
        
        $items[actualItem].classList.add("selected-item")
    }

    let getTheMiddle = ()=>{
        let itemHeight = $items[0].getBoundingClientRect().height,
        listHeight = $itemList.getBoundingClientRect().height
        
        return  `-${((listHeight/2) - (itemHeight/2))}px 0px -${((listHeight/2) - (itemHeight/2))}px 0px`
    }

    let observeItemFunc = (entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                actualItem = entry.target.getAttribute("data-item-id")
                console.log("actual item detected by intersection: ", actualItem)
                moveToItem(actualItem)
            }
        })
    }

    
    let itemsObserver = new IntersectionObserver(observeItemFunc, 
        {root: $itemList, rootMargin: getTheMiddle(), threshold: 0.6});
    
    $items.forEach(el=>{
        itemsObserver.observe(el)
    })

    w.addEventListener("resize", (e)=>{
        resizeArrowDivisor()
        itemsObserver.disconnect() //stop the last intersectionObserver and re make it with the new values of observation
        itemsObserver = new IntersectionObserver(observeItemFunc, 
            {root: $itemList, rootMargin: getTheMiddle(), threshold: 0.6});

        $items.forEach(el=>{
            itemsObserver.observe(el)
        })
    })

    $items[actualItem].classList.add("selected-item")

    const navigateItems = (e)=>{
        e.preventDefault()
        if(e.key == "ArrowDown"){
            navigateItemDown()
        }

        if(e.key == "ArrowUp"){
            navigateItemUp()
        }
    }
    
    const observerOptions = {
        threshold: 0.9
    }
    const observerCallback = (entries)=>{ //to know the actual page
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
 
    d.addEventListener("click", (e)=>{
        if(e.target == $arrowUp)navigateItemUp();
        if(e.target == $arrowDown) navigateItemDown();
    })

}