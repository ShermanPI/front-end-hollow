const d = document

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


export const profileFavoritesRender = ()=> {
    const $FragmentProfileList = d.createDocumentFragment() 

    for(let i = 0; i < 3; i++){
        let newItem = new ProfileItem("SHEMAN", "http://127.0.0.1:5000/static/characters-images/5cbb24349e6b94f2.png")
        $FragmentProfileList.appendChild(newItem.renderProfileItem())
    }

    d.querySelector(".no-items-ready").remove()
    d.querySelector(".favorite-item-list").appendChild($FragmentProfileList)
}