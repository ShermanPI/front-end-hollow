const d = document,
    w = window,
    backendAPIRestUrl = "http://127.0.0.1:5000"

let itemsInfo = []

class HomeItem{
    constructor(listIndex, characterImgSrc, characterName, characterMainInfo, characterSecondaryInfo){
        this.listIndex = listIndex,
        this.characterImgSrc = characterImgSrc,
        this.characterName = characterName,
        this.characterMainInfo = characterMainInfo,
        this.characterSecondaryInfo = characterSecondaryInfo
    }

    createItemNode(){
        const $item = d.createElement("li"),
            $listBorderContainer = d.createElement("div"),
            $borderImg = d.createElement("img"),
            $characterImgContainer = d.createElement("div"),
            $characterImg = d.createElement("img"),
            $characterName = d.createElement("p")

        $item.classList.add("item")
        $listBorderContainer.classList.add("list-border")
        $characterImgContainer.classList.add("character-img")
    
        $item.appendChild($listBorderContainer)
        $item.appendChild($characterImgContainer)
        $item.appendChild($characterName)
        $listBorderContainer.appendChild($borderImg)
        $characterImgContainer.appendChild($characterImg)
    
        $item.setAttribute("data-item-id", this.listIndex)
        $borderImg.src = "img/UI/item-border.png"
        $characterImg.src = backendAPIRestUrl + this.characterImgSrc
        $characterName.innerHTML = this.characterName

        return $item
    }
}


export function renderCharacterItems(customAlert, isListAlreadyRendered, jsonUser = undefined){

    const $sections = document.querySelectorAll(".section-container"),
        $itemList = d.getElementById("home-list"),
        $arrowsDivisor = d.getElementById("actual-item-height"),
        $homeItemList = d.getElementById("home-list"),
        $characterNameContainer = d.querySelector(".character-name"),
        $characterImgContainer = d.querySelector(".character-full-img"),
        $favoriteIconContainer = d.querySelector(".home-favorite-icon"),
        $bestiaryImgContainer = d.querySelector(".info-divisor-img"),
        $characterTextInfo = d.getElementById("character-text-info"),
        $characterExtraTextInfo = d.getElementById("character-more-text"),
        characterNumberToRender = 8
    
    let actualItem = 0,
        $items,
        actualFavoriteItems = [];

    const renderItemsList = (listToRender)=>{

        const $itemsFragment = d.createDocumentFragment(),
            itemsAlreadyRendered = d.querySelectorAll(".item-list .item") ? d.querySelectorAll(".item-list .item").length : 0
        
        listToRender.forEach((el, index) =>{
            let newItem = new HomeItem(itemsAlreadyRendered + index, el.characterImgSrc, el.characterName, el.characterMainInfo, el.characterSecondaryInfo)
            $itemsFragment.appendChild(newItem.createItemNode())
        })

        $homeItemList.appendChild($itemsFragment)
        $items = d.querySelectorAll(".item-list > .item") 
    }


    const checkIsFavorite = (itemArrayIndex)=>{
        // console.log("checkiiin", jsonUser, "ACTUAL ITEM", itemArrayIndex)
        const $items = d.querySelectorAll(".item-list > .item")
        
        if(jsonUser){
            actualFavoriteItems = jsonUser.favoriteCharacters
            if(actualFavoriteItems.includes($items[itemArrayIndex].lastElementChild.innerHTML)){
                // console.log("ES FAVORITO")
                $favoriteIconContainer.firstElementChild.src = "img/icons/favorite.png"
            }else{
                // console.log("NO ES FAVORITO")
                $favoriteIconContainer.firstElementChild.src = "img/icons/unfavorite.png"
            }
        }
    }

    const renderItemInfo = (itemArrayIndex) =>{
        console.log("RENDERED ", itemsInfo[itemArrayIndex].characterName)
        
        $characterNameContainer.firstElementChild.innerHTML = itemsInfo[itemArrayIndex].characterName
        $characterImgContainer.firstElementChild.src = backendAPIRestUrl + itemsInfo[itemArrayIndex].characterImgSrc
        $characterTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterMainInfo

        checkIsFavorite(itemArrayIndex)
        

        if(itemsInfo[itemArrayIndex].characterSecondaryInfo){
            $bestiaryImgContainer.style.display = "block"
            $characterExtraTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterSecondaryInfo
        }else{
            $bestiaryImgContainer.style.display = "none"
        }
        
        if(itemArrayIndex == itemsInfo.length - 1){
            
            const itemsInfoName = []
            itemsInfo.forEach(el=>{
                itemsInfoName.push(el.characterName)
            })

            fetch(backendAPIRestUrl + "/charactersSample/" + characterNumberToRender,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: itemsInfoName})
            })
            .then(res => res.ok? res.json() : Promise.reject(res))
            .then((json)=>{
                if(json[0]){ //if the db still have items
                    
                    customAlert(undefined, "Loading...", {isFlashAlert: true})
                    console.log("ANTES DEL RENDIRZADO ", itemsInfo)
                    itemsInfo = [...itemsInfo, ...json]
                    renderItemsList(json)
                    console.log("se ha renderizado una lista, la SEGUNDA, se renderizo lo siguiente ", json)
                    $items = d.querySelectorAll(".item-list > .item")
                    
                    if(actualItem !== 0 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600))){
                        $items[actualItem].style.marginBlock = "5rem";
                    }
                }else{
                    customAlert(undefined, "It seems you have reached the end of the list.", {isFlashAlert: true})
                }
            })
            .catch(err=>console.error(err))
        }
        
    }

    const setItemListeners = (itemRenderFunction)=>{

        const resizeArrowDivisor = ()=>{
            const $items = d.querySelectorAll(".item-list > .item")
            $arrowsDivisor.style.height = `calc(${$items[actualItem].getBoundingClientRect().height}px + 0.2rem)`
        }
        
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
            // navigate in "mobile"
            $items = d.querySelectorAll(".item-list > .item")

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
                            itemRenderFunction(actualItem)
                        }, 500)
                    }
                })
            }

            let itemsObserver = new IntersectionObserver(observeItemFunc, 
                {root: $itemList, rootMargin: getTheMiddle(), threshold: 0.6});

            $items.forEach(el=>{
                itemsObserver.observe(el)
            })

            // Parent element to observe
            const parentElement = document.getElementById("home-list");

            // Create an instance of MutationObserver
            const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Check if new child elements were added
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    itemsObserver.disconnect()
                    $items = d.querySelectorAll("#home-list .item")

                    $items.forEach(el=>{
                        itemsObserver.observe(el)
                    })

                    console.log("New child elements added to the parent element.");
                }
            });    
            });

            const mutationObserverConfig = {
                childList: true,
                subtree: true
            };

            // Start observing
            observer.observe(parentElement, mutationObserverConfig);

        } else {
            $items = d.querySelectorAll("#home-list .item")
            
            // Parent element to observe
            const parentElement = document.getElementById("home-list");

            // Create an instance of MutationObserver
            const mutationObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Check if new child elements were added
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    // itemsObserver.disconnect()
                    $items = d.querySelectorAll("#home-list .item")

                    // $items.forEach(el=>{
                    //     itemsObserver.observe(el)
                    // })

                    console.log("New child elements added to the parent element.");
                }
            });    
            });

            const mutationObserverConfig = {
                childList: true,
                subtree: true
            };

            // Start observing
            mutationObserver.observe(parentElement, mutationObserverConfig);


            console.log($items)
            // navigate        
            const $arrowUp = d.querySelector(".navigate-item-up"),
                $arrowDown = d.querySelector(".navigate-item-down")
            
            // actualItem
            if(isListAlreadyRendered){
                actualItem = d.querySelector("#home-list > .selected-item").getAttribute("data-item-id")
            }  
            console.log("EA ACTUAL ITEMS ", $items, actualItem)
            $items[actualItem].classList.add("selected-item")

            resizeArrowDivisor()

            const navigateItems = (e)=>{
                if(e.key == "ArrowDown"){
                    e.preventDefault()
                    navigateItemDown()
                    itemRenderFunction(actualItem)

                }

                if(e.key == "ArrowUp"){
                    e.preventDefault()
                    navigateItemUp()
                    itemRenderFunction(actualItem)
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
            
            const wheelNavigation = (e)=>{
                e.preventDefault()
                if (e.deltaY > 0) { //wheels down
                    navigateItemDown()    
                    itemRenderFunction(actualItem)

                } else { //wheels up
                    navigateItemUp()
                    itemRenderFunction(actualItem)
                }
            }

            $itemList.addEventListener("wheel", wheelNavigation)

            const itemsClickNavigation = (e)=>{
                if(e.target == $arrowUp){
                    navigateItemUp();
                    itemRenderFunction(actualItem)
                } 
                    
                if(e.target == $arrowDown) {
                    navigateItemDown()
                    itemRenderFunction(actualItem)

                }
            }

            d.addEventListener("click", itemsClickNavigation)
        }
    
    }

    //first time item render

    if(!isListAlreadyRendered){
        fetch(backendAPIRestUrl + "/charactersSample/" + characterNumberToRender, 
        {
            credentials: 'include'
        })
        .then(res => res.ok? res.json() : Promise.reject(res))
        .then((json)=>{
            
            itemsInfo = json
            renderItemsList(itemsInfo)
            renderItemInfo(actualItem)

            $items = d.querySelectorAll(".item-list > .item")

            setItemListeners(renderItemInfo)
        })
        .catch(err=>console.error(err))
    }else{
        if(isListAlreadyRendered && d.querySelector("#home-list > .selected-item")){
            actualItem = d.querySelector("#home-list > .selected-item").getAttribute("data-item-id")
        }
        checkIsFavorite(actualItem)
        setItemListeners(checkIsFavorite)
    }
    
    // Mark as favorite
    if(jsonUser){
        document.addEventListener("click", (e)=>{
            if(e.target.matches(".home-favorite-icon img")){
                const $items = d.querySelectorAll(".item-list > .item")
                let characterName = $items[actualItem].querySelector("p").innerHTML
                
                console.log(backendAPIRestUrl + "/characters/favorite/" + characterName, jsonUser)

                if(e.target.getAttribute("src") == "img/icons/unfavorite.png"){
                    e.target.src = "img/icons/favorite.png"
                    actualFavoriteItems.push(characterName)
                    fetch(backendAPIRestUrl + "/characters/favorite/" + characterName,
                    {
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: jsonUser._id.$oid})
                    })
                    .then(res => res.ok? res.json() : Promise.reject(res))
                    .catch(err =>{
                        console.error(err)
                        customAlert(undefined, "A mistake has occurred that does not allow the character to be favored", {isFlashAlert: true})
                        e.target.src = "img/icons/unfavorite.png"
                        const index = actualFavoriteItems.indexOf(characterName);
                        if (index > -1) actualFavoriteItems.splice(index, 1);
                    })
                    
                }else{
                    e.target.src = "img/icons/unfavorite.png"

                    const index = actualFavoriteItems.indexOf(characterName);
                    if (index > -1) actualFavoriteItems.splice(index, 1);
                    // console.log(actualFavoriteItems)
                    fetch(backendAPIRestUrl + "/characters/favorite/" + characterName,
                    {
                        credentials: 'include',
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: jsonUser._id.$oid})
                    })
                    .then(res => res.ok? res.json() : Promise.reject(res))
                    .catch(err =>{
                        console.error(err)
                        customAlert(undefined, "A mistake has occurred that does not allow the character to be unfavored", {isFlashAlert: true})
                        e.target.src = "img/icons/favorite.png"
                        actualFavoriteItems.push(characterName)
                    }) 

                    
                }
            }
        })

        return;
    }

}

