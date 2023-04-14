const d = document,
    w = window,
    backendAPIRestUrl = "http://127.0.0.1:5000"

let itemsInfo = []

class HomeItem{
    constructor(listIndex, characterImgSrc, characterName, characterMainInfo, characterSecondaryInfo, isFavorite = false){
        this.listIndex = listIndex,
        this.characterImgSrc = characterImgSrc,
        this.characterName = characterName,
        this.characterMainInfo = characterMainInfo,
        this.characterSecondaryInfo = characterSecondaryInfo
        // this.isFavorite = isFavorite
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


export function itemsNavigation(jsonUser = undefined){

    const $sections = document.querySelectorAll(".section-container"),
        $itemList = d.getElementById("home-list"),
        $arrowsDivisor = d.getElementById("actual-item-height"),
        $itemsFragment = d.createDocumentFragment(),
        $homeItemList = d.getElementById("home-list"),
        $characterNameContainer = d.querySelector(".character-name"),
        $characterImgContainer = d.querySelector(".character-full-img"),
        $favoriteIconContainer = d.querySelector(".home-favorite-icon"),
        $bestiaryImgContainer = d.querySelector(".info-divisor-img"),
        $characterTextInfo = d.getElementById("character-text-info"),
        $characterExtraTextInfo = d.getElementById("character-more-text")
    
    
    let actualItem = 0;

    const renderItemsList = (listToRender)=>{
        listToRender.forEach((el, i) =>{
            let newItem = new HomeItem(i, el.characterImgSrc, el.characterName, el.characterMainInfo, el.characterSecondaryInfo)
    
            $itemsFragment.appendChild(newItem.createItemNode())
        })
    }


    const renderItemInfo = (itemArrayIndex) =>{
        $characterNameContainer.firstElementChild.innerHTML = itemsInfo[itemArrayIndex].characterName
        $characterImgContainer.firstElementChild.src = backendAPIRestUrl + itemsInfo[itemArrayIndex].characterImgSrc
        console.log(backendAPIRestUrl + itemsInfo[itemArrayIndex].characterImgSrc)
        

        if(itemsInfo[itemArrayIndex].isFavorite){
            $favoriteIconContainer.firstElementChild.src = "img/icons/favorite.png"
        }else{
            $favoriteIconContainer.firstElementChild.src = "img/icons/unfavorite.png"
        }

        $characterTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterMainInfo

        if(itemsInfo[itemArrayIndex].characterSecondaryInfo){
            $bestiaryImgContainer.style.display = "block"
            $characterExtraTextInfo.innerHTML = itemsInfo[itemArrayIndex].characterSecondaryInfo
        }else{
            $bestiaryImgContainer.style.display = "none"
        }
    }

    fetch(backendAPIRestUrl + "/charactersSample/12",
    {
        credentials: 'include'
    })
    .then(res => res.ok? res.json() : Promise.reject(res))
    .then((json)=>{
        itemsInfo = json

        renderItemsList(itemsInfo)
        renderItemInfo(actualItem)
        $homeItemList.appendChild($itemsFragment)

        let $items = d.querySelectorAll(".item-list > .item")

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
                            renderItemInfo(actualItem)
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
                    renderItemInfo(actualItem)
                }
    
                if(e.key == "ArrowUp"){
                    e.preventDefault()
                    navigateItemUp()
                    renderItemInfo(actualItem)
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
                    renderItemInfo(actualItem)
                } else { //wheels up
                    navigateItemUp()
                    renderItemInfo(actualItem)
                }
    
            })
    
            d.addEventListener("click", (e)=>{
                if(e.target == $arrowUp){
                    navigateItemUp();
                    renderItemInfo(actualItem)
                } 
                    
                if(e.target == $arrowDown) {
                    navigateItemDown()
                    renderItemInfo(actualItem)
                }
            })
        }

    })
    .catch(err=>console.log("ERROR AT CHARACTER FETCH", err))
    


}

