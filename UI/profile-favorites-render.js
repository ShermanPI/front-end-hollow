const d = document,
    backendAPIRestUrl = "http://127.0.0.1:5000"

class ProfileItem{
    constructor(characterName, characterImgSrc){
        this.characterName = characterName
        this.characterImgSrc = characterImgSrc   
    }

    renderProfileItem(){
        const $item = d.createElement("li"),
            $itemInfo = d.createElement("div"),
            $listBorder = d.createElement("div"),
            $imgListBorder = d.createElement("img"),
            $characterImgContainer = d.createElement("div"),
            $characterImg = d.createElement("img"),
            $favoriteIconContainer = d.createElement("div"),
            $favoriteIcon = d.createElement("img"),
            $characterName = d.createElement("p")

        $item.classList.add("item")
        $item.classList.add("favorite-item")
        $item.classList.add("selected-item")
        $itemInfo.classList.add("item-info")
        $listBorder.classList.add("list-border")
        $characterImgContainer.classList.add("character-img")
        $imgListBorder.src = "img/UI/item-border.png"
        $characterImg.src = this.characterImgSrc
        $favoriteIconContainer.classList.add("favorite-icon")
        $favoriteIcon.src = "img/icons/favorite.png"
        
        $listBorder.appendChild($imgListBorder)
        $item.appendChild($itemInfo)
        $characterImgContainer.appendChild($characterImg)
        $itemInfo.appendChild($listBorder)
        $itemInfo.appendChild($characterImgContainer)
        $favoriteIconContainer.appendChild($favoriteIcon)
        $item.appendChild($favoriteIconContainer)
        $characterName.innerHTML = this.characterName
        $itemInfo.appendChild($characterName)
        
        return $item
    }
}


export const profileFavoritesRender = (jsonUser)=> {

    const renderProfileFavoriteItems = ()=>{
        fetch(`${backendAPIRestUrl}/user/favorites/${jsonUser._id.$oid}`, {
            credentials: 'include',
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.ok? res.json() : res)
        .then(json=>{
            let $FragmentProfileList = d.createDocumentFragment() 

            json.forEach(el=>{
                let newItem = new ProfileItem(el.characterName, `${backendAPIRestUrl}/static/characters-images/${el.characterImgSrc}`)
                $FragmentProfileList.appendChild(newItem.renderProfileItem())
            })
        
            if(d.querySelector(".no-items-ready")) d.querySelector(".no-items-ready").remove()
            
            d.querySelector(".favorite-item-list").appendChild($FragmentProfileList)
            console.log($FragmentProfileList)
            console.log("SE HA AGREGADO")
        })
        .catch(err=> console.error(err))
    }

    renderProfileFavoriteItems()
    
    const $section = d.getElementById("profile")
    const profileObserverCallback = (entries)=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(localStorage.getItem("favoritesUpdated") == "true"){
                    if(d.querySelectorAll(".profile-favorite-items .favorite-item")) d.querySelectorAll(".profile-favorite-items .favorite-item").forEach(el=>el.remove())
                    localStorage.setItem("favoritesUpdated", "false")
                    renderProfileFavoriteItems()
                }
            }
        })
    }

    let profileObserver = new IntersectionObserver(profileObserverCallback, {threshold: 1})
    profileObserver.observe($section)

    d.addEventListener("click", e=>{
        if(e.target.matches(".profile-favorite-items .favorite-icon img")){
            const characterName = e.target.parentNode.parentNode.querySelector('p').innerHTML,
                profileItemClicked = e.target.parentNode.parentNode
            
            profileItemClicked.remove()

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
                // actualFavoriteItems.push(characterName)
            }) 
        }
    })

}