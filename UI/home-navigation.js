const d = document,
w = window;

export function homeNavigation(){
    
    const $items = d.querySelectorAll(".item-list > .item"),
        $sections = document.querySelectorAll(".section-container"),
        $itemList = d.getElementById("home-list"),
        $arrowsDivisor = d.getElementById("actual-item-height")
    
    let actualItem = 1;

    const resizeArrowDivisor = ()=>{
        $arrowsDivisor.style.height = `calc(${$items[actualItem].getBoundingClientRect().height}px + 0.2rem)`
    }

    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
        // navigate in "mobile"
        $arrowsDivisor.style.width = "100%"
        $arrowsDivisor.classList.add("selected-item")

        let getTheMiddle = ()=>{
            let itemHeight = $items[0].getBoundingClientRect().height,
            listHeight = $itemList.getBoundingClientRect().height
            return  `-${((listHeight/2) - (itemHeight/2))}px 0px -${((listHeight/2) - (itemHeight/2))}px 0px`
        }

        let timeOut;

        let observeItemFunc = (entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    resizeArrowDivisor()
                    clearTimeout(timeOut)
                    timeOut = setTimeout(()=>{
                        actualItem = entry.target.getAttribute("data-item-id")
                    }, 500)
                }
            })
        }

        let itemsObserver = new IntersectionObserver(observeItemFunc, 
            {root: $itemList, rootMargin: getTheMiddle(), threshold: 0.6});

        $items.forEach(el=>{
            itemsObserver.observe(el)
        })

    } else {
        // navigate in "computer"        
        let $arrowUp = d.querySelector(".navigate-item-up"),
            $arrowDown = d.querySelector(".navigate-item-down")

        $items[actualItem].classList.add("selected-item")

        resizeArrowDivisor()

        const navigateItems = (e)=>{
            if(e.key == "ArrowDown"){
                e.preventDefault()
                navigateItemDown()
                console.log(actualItem)
            }

            if(e.key == "ArrowUp"){
                e.preventDefault()
                navigateItemUp()
                console.log(actualItem)

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
                }
            });        
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        $sections.forEach(el=>observer.observe(el));

        const animationTiming = {
            duration: 250,
            iterations: 1
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

            $items[actualItem].scrollIntoView({block: "center"})
            $items[actualItem].classList.add("selected-item")
            $items[actualItem - 1].classList.remove("selected-item")

            if(actualItem == 1){
                $items[actualItem].style.marginBlock = "5rem";
                $items[0].style.marginBottom = "1rem";
                return;
            }

            if(actualItem == $items.length - 1){
                $items[$items.length - 1].style.marginTop = "5rem"
                $items[$items.length - 1].previousElementSibling.style.marginBlock = "1rem";
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

            $items[actualItem].scrollIntoView({block: "center"})
            $items[actualItem].classList.add("selected-item")
            $items[parseInt(actualItem) + 1].classList.remove("selected-item")

            if(actualItem == $items.length - 2){
                $items[$items.length - 1].style.marginTop = "1rem";
                $items[actualItem].style.marginBlock = "5rem";
                return;
            }

            if(actualItem == 0){
                $items[0].style.marginBottom = "5rem"
                $items[actualItem].nextElementSibling.style.marginBlock = "1rem";
                return;
            }
            
            $items[actualItem].style.marginBlock = "5rem"
            $items[actualItem].nextElementSibling.style.marginBlock = "1rem"
        }

        
        $items[actualItem].style.marginBottom = "5rem"

        $itemList.addEventListener("wheel", (e)=>{
            e.preventDefault()
            if (e.deltaY > 0) { //wheels down
                navigateItemDown()
            } else { //wheels up
                navigateItemUp()
            }

        })

        d.addEventListener("click", (e)=>{
            if(e.target == $arrowUp)navigateItemUp();
            if(e.target == $arrowDown) navigateItemDown();
        })
    }

}

