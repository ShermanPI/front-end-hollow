import { addClass, append, create, selectByClass, selectAllByClass, selectById, fetchFromApi, select, selectAll, removeClass, classSelectorMaker, removeElement } from "../utils/dom-functions.js"
import { globalVariables } from "../utils/global-variables.js"
import { selectors } from "../utils/selectors.js"
import { customAlert } from "./custom_alerts.js"

let itemsInfo = []

class HomeItem{
    constructor(characterId, listIndex, characterImgSrc, characterName, characterMainInfo, characterSecondaryInfo){
        this.characterId = characterId,
        this.listIndex = listIndex,
        this.characterImgSrc = characterImgSrc,
        this.characterName = characterName,
        this.characterMainInfo = characterMainInfo,
        this.characterSecondaryInfo = characterSecondaryInfo
    }

    createItemNode(){
        const $item = create('li'),
            $listBorderContainer = create('div'),
            $borderImg = create('img'),
            $characterImgContainer = create('div'),
            $characterImg = create('img'),
            $characterName = create('p')

        addClass($item, selectors.item)
        addClass($listBorderContainer, selectors.listBorder)
        addClass($characterImgContainer, selectors.characterImg)

        append($item, $listBorderContainer)
        append($item, $characterImgContainer)
        append($item, $characterName)
        append($listBorderContainer, $borderImg)
        append($characterImgContainer, $characterImg)
    
        $item.setAttribute("data-item-id", this.listIndex)
        $item.setAttribute("data-character-id", this.characterId)
        $characterImg.setAttribute("alt", this.characterName)
        $borderImg.src = "img/UI/item-border.png"
        $characterImg.src = this.characterImgSrc
        $characterName.innerHTML = this.characterName

        return $item
    }
}

export function renderCharacterItems(isListAlreadyRendered, jsonUser = undefined){

    const $sections = selectAllByClass((selectors.sectionContainer)),
        $itemList = selectById(selectors.homeList), 
        $arrowsDivisor = selectById(selectors.actualItemHeight),
        $homeItemList = selectById(selectors.homeList),
        $characterNameContainer = selectByClass((selectors.characterName)),
        $characterImgContainer = selectByClass((selectors.characterFullImg)),
        $favoriteIconContainer = selectByClass((selectors.homeFavoriteIcon)),
        $bestiaryImgContainer = selectByClass((selectors.infoDivisorImg)),
        $characterTextInfo = selectById(selectors.characterTextInfo),
        $characterExtraTextInfo = selectById(selectors.charactermoreText),
        characterNumberToRender = 8
    
    let actualItem = 0,
        $items,
        actualFavoriteItems = [],
        fetchTimer;

    const renderItemsList = (listToRender)=>{

        const $itemsFragment = globalVariables.d.createDocumentFragment(),
            itemsAlreadyRendered = selectAllByClass(selectors.itemListItem) ? selectAllByClass(selectors.itemListItem).length : 0
        
        listToRender.forEach((el, index) =>{
            let newItem = new HomeItem(el._id.$oid, itemsAlreadyRendered + index, el.characterImgSrc, el.characterName, el.characterMainInfo, el.characterSecondaryInfo)
            append($itemsFragment, newItem.createItemNode())
        })

        append($homeItemList, $itemsFragment)
        $items = selectAllByClass(selectors.itemListItem)
    }

    const checkIsFavorite = (itemArrayIndex)=>{
        const $items = selectAllByClass(selectors.itemListItem)

        if(jsonUser){
            actualFavoriteItems = jsonUser.favoriteCharacters            
            if(actualFavoriteItems.includes($items[itemArrayIndex].getAttribute('data-character-id'))){
                $favoriteIconContainer.firstElementChild.src = "img/icons/favorite.png"
            }else{
                $favoriteIconContainer.firstElementChild.src = "img/icons/unfavorite.png"
            }
        }
    }

    const renderItemInfo = (itemArrayIndex) =>{
        $characterNameContainer.firstElementChild.innerHTML = itemsInfo[itemArrayIndex].characterName
        $characterImgContainer.firstElementChild.src = itemsInfo[itemArrayIndex].characterImgSrc
        $characterImgContainer.firstElementChild.setAttribute('alt', itemsInfo[itemArrayIndex].characterName)
        $characterTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterMainInfo

        checkIsFavorite(itemArrayIndex)
        
        if(itemsInfo[itemArrayIndex].characterSecondaryInfo){
            $bestiaryImgContainer.style.display = "block"
            $characterExtraTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterSecondaryInfo
        }else{
            $bestiaryImgContainer.style.display = "none"
        }

        $items[actualItem].scrollIntoView({block: "center"})
        //making bounding for the user dont keep fetching characters
        clearTimeout(fetchTimer);
        fetchTimer = setTimeout(() => {
            if(itemArrayIndex == itemsInfo.length - 1){
                const itemsInfoId = []
                itemsInfo.forEach(el=>{
                    itemsInfoId.push(el._id.$oid)
                })

                fetchFromApi(`charactersSample/${characterNumberToRender}`, {method: "POST", credentials: 'include', headers: {"Content-Type": "application/json"}, body: JSON.stringify({items: itemsInfoId})})
                .then((json)=>{
                    if(json[0]){ //if the db still have items
                        
                        customAlert(undefined, "Loading...", {isFlashAlert: true})
                        itemsInfo = [...itemsInfo, ...json]
                        renderItemsList(json)
                        $items = selectAllByClass(selectors.itemListItem)
    
                        if(actualItem !== 0 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600))){
                            $items[actualItem].style.marginBlock = "5rem";
                        }
                    }else{
                        customAlert(undefined, "It seems you have reached the end of the list.", {isFlashAlert: true})
                    }
                })
                .catch(err=>console.error(err))
            }
        }, 200);
    }

    const setItemListeners = (itemRenderFunction)=>{
        const observerOptions = {
            threshold: 0.9
        }
        const observerCallback = (entries)=>{
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(entry.target.getAttribute("id") == "home"){
                        checkIsFavorite(actualItem)
                    }
                }
            });        
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        $sections.forEach(el=>observer.observe(el));

        const resizeArrowDivisor = ()=>{
            $items = selectAllByClass(selectors.itemListItem)
            $arrowsDivisor.style.height = `calc(${$items[actualItem].getBoundingClientRect().height}px + 0.2rem)`
        }
        
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
            // navigate in "mobile"
            $items = selectAllByClass(selectors.itemListItem)

            $arrowsDivisor.style.width = "100%"
            addClass($arrowsDivisor, selectors.selectedItem)

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
                        }, 400)
                    }
                })
            }

            let itemsObserver = new IntersectionObserver(observeItemFunc, 
                {root: $itemList, rootMargin: getTheMiddle(), threshold: 0.6});

            $items.forEach(el=>{
                itemsObserver.observe(el)
            })

            // Parent element to observe
            const parentElement = selectById(selectors.homeList)

            // Create an instance of MutationObserver
            const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Check if new child elements were added
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    itemsObserver.disconnect()
                    $items = selectAll("#home-list .item")

                    $items.forEach(el=>{
                        itemsObserver.observe(el)
                    })

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
            $items = selectAll(selectors.homeListItem)
            
            // Parent element to observe
            const parentElement = selectById(selectors.homeList)

            // Create an instance of MutationObserver
            const mutationObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Check if new child elements were added
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    // itemsObserver.disconnect()
                    $items = selectAll(selectors.homeListItem)
                }
            });    
            });

            const mutationObserverConfig = {
                childList: true,
                subtree: true
            };

            // Start observing
            mutationObserver.observe(parentElement, mutationObserverConfig);

            // navigate        
            const $arrowUp = selectByClass(selectors.navigateItemUpArrow),
                $arrowDown = selectByClass(selectors.navigateItemdownArrow)
            
            // actualItem
            if(isListAlreadyRendered){
                actualItem = select(selectors.homeListItemSelected).getAttribute("data-item-id")
            } 
            
            addClass($items[actualItem], selectors.selectedItem)

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
                            globalVariables.w.addEventListener("keydown", navigateItems)
                        }else{
                            globalVariables.w.removeEventListener("keydown", navigateItems)
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

                addClass($items[actualItem], selectors.selectedItem)
                removeClass($items[actualItem - 1], selectors.selectedItem)

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

                addClass($items[actualItem], selectors.selectedItem)
                removeClass($items[parseInt(actualItem) + 1], selectors.selectedItem)

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
            
            if(!isListAlreadyRendered){
                $items[actualItem].style.marginBottom = "5rem"
            }
            
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
                    
                if(e.target == $arrowDown){
                    navigateItemDown()
                    itemRenderFunction(actualItem)
                }
            }

            globalVariables.d.addEventListener("click", itemsClickNavigation)
        }
    
    }

    //first time items render
    if(!isListAlreadyRendered){
        fetchFromApi(`charactersSample/${characterNumberToRender}`)
        .then((json)=>{
            
            itemsInfo = json
            renderItemsList(itemsInfo)
            renderItemInfo(actualItem)

            $items = selectByClass(selectors.itemListItem)

            setItemListeners(renderItemInfo)
        })
        .catch(err=>console.error(err))
    }else{
        if(isListAlreadyRendered && select(selectors.homeListItemSelected)){
            actualItem = select(selectors.homeListItemSelected).getAttribute("data-item-id")
        }
        checkIsFavorite(actualItem)
        setItemListeners(checkIsFavorite)
    }
    
    // Mark as favorite
    if(jsonUser){
        globalVariables.d.addEventListener("click", (e)=>{
            if(e.target.matches(classSelectorMaker(selectors.homeFavoriteIconImg))){
                const characterName = itemsInfo[actualItem].characterName,
                    $items = selectAllByClass(selectors.itemListItem),
                    characterId = $items[actualItem].getAttribute('data-character-id')
                    
                    if(e.target.getAttribute("src") == "img/icons/unfavorite.png"){
                        localStorage.setItem("favoritesUpdated", "true")
                        e.target.src = "img/icons/favorite.png"
                        actualFavoriteItems.push(characterId)
                    
                    fetchFromApi(`${jsonUser._id.$oid}/favorite/${characterName}`, {method: 'POST'})                    
                    .catch((err) =>{
                        console.error(err)
                        customAlert(undefined, "A mistake has occurred that does not allow the character to be favored", {isFlashAlert: true})
                        e.target.src = "img/icons/unfavorite.png"
                        const index = actualFavoriteItems.indexOf(characterName);
                        if (index > -1) actualFavoriteItems.splice(index, 1);
                    })
                    
                }else{
                    localStorage.setItem("favoritesUpdated", "true")
                    e.target.src = "img/icons/unfavorite.png"

                    const index = actualFavoriteItems.indexOf(characterId);
                    if (index > -1) actualFavoriteItems.splice(index, 1);
                    
                    fetchFromApi(`${jsonUser._id.$oid}/favorite/${characterName}`, {method: 'POST'})
                    .catch(err =>{
                        console.error(err)
                        customAlert(undefined, "A mistake has occurred that does not allow the character to be unfavored", {isFlashAlert: true})
                        e.target.src = "img/icons/favorite.png"
                        actualFavoriteItems.push(characterId)
                    }) 

                    
                }
            }
        })
        const profileFavoritesRender = (jsonUser)=> {
            class ProfileItem{
                constructor(characterId, characterName, characterImgSrc){
                    this.characterId = characterId
                    this.characterName = characterName
                    this.characterImgSrc = characterImgSrc   
                }
            
                renderProfileItem(){
                    const $item = create('li'),
                        $itemInfo = create('div'),
                        $listBorder = create('div'),
                        $imgListBorder = create('img'),
                        $characterImgContainer = create('div'),
                        $characterImg = create('img'),
                        $favoriteIconContainer = create('div'),
                        $favoriteIcon = create('img'),
                        $characterName = create('p')
            
                    addClass($item, selectors.item)
                    addClass($item, selectors.favoriteItem)
                    addClass($item, selectors.selectedItem)
                    addClass($itemInfo, selectors.itemInfo)
                    addClass($listBorder, selectors.listBorder)
                    addClass($characterImgContainer, selectors.characterImg)
                    $imgListBorder.src = "img/UI/item-border.png"
                    $characterImg.src = this.characterImgSrc
                    addClass($favoriteIconContainer, selectors.favoriteIcon)
                    $favoriteIcon.src = "img/icons/favorite.png"
                    append($listBorder, $imgListBorder)
                    append($item, $itemInfo)
                    append($characterImgContainer, $characterImg)
                    append($itemInfo, $listBorder)
                    append($itemInfo, $characterImgContainer)
                    append($favoriteIconContainer, $favoriteIcon)
                    append($item, $favoriteIconContainer)
                    $characterName.innerHTML = this.characterName
                    append($itemInfo, $characterName)
                    $item.setAttribute("data-character-id", this.characterId)
                    
                    return $item
                }
            }
        
            const renderProfileFavoriteItems = ()=>{
                fetchFromApi(`user/favorites/${jsonUser._id.$oid}`)
                .then(json=>{
                    const $FragmentProfileList = globalVariables.d.createDocumentFragment() 
        
                    json.forEach(el=>{
                        let newItem = new ProfileItem(el._id.$oid, el.characterName, el.characterImgSrc)
                        append($FragmentProfileList, newItem.renderProfileItem())
                    })
                
                    if(json[0] && selectByClass(selectors.noItemsReady)) removeElement(selectByClass(selectors.noItemsReady))
                    
                    append(selectByClass(selectors.favoriteItemList), $FragmentProfileList)

                })
                .catch(err=> console.error(err))
            }
        
            renderProfileFavoriteItems()
            
            const $section = selectById(selectors.profile)

            const profileObserverCallback = (entries)=>{
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if(localStorage.getItem("favoritesUpdated") == "true"){
                            if(selectAllByClass(selectors.profileFavoriteItemsItem)) selectAllByClass(selectors.profileFavoriteItemsItem).forEach(el => removeElement(el))
                            localStorage.setItem("favoritesUpdated", "false")
                            renderProfileFavoriteItems()
                        }
                    }
                })
            }
        
            let profileObserver = new IntersectionObserver(profileObserverCallback, {threshold: 1})
            profileObserver.observe($section)
        
            globalVariables.d.addEventListener("click", e=>{
                if(e.target.matches(".profile-favorite-items .favorite-icon img")){
                    const characterName = e.target.parentNode.parentNode.querySelector('p').innerHTML,
                        characterId =  e.target.parentNode.parentNode.getAttribute('data-character-id'),
                        profileItemClicked = e.target.parentNode.parentNode,
                        index = actualFavoriteItems.indexOf(characterId)

                    if (index > -1) actualFavoriteItems.splice(index, 1);
                    removeElement(profileItemClicked)

                    fetchFromApi(`${jsonUser._id.$oid}/favorite/${characterName}`, {method: 'DELETE'})
                    .catch(err =>{
                        console.error(err)
                        customAlert(undefined, "A mistake has occurred that does not allow the character to be unfavored", {isFlashAlert: true})
                        e.target.src = "img/icons/favorite.png"
                        actualFavoriteItems.push(characterId)
                    }) 
                }
            })
        }
        
        profileFavoritesRender(jsonUser)
        return;
    }
}

