const d = document

let itemsInfo = [
    {
        id: 1,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "Zote the mighty",
        characterMainInfo: "This is a chracter wich appear to be safe (optionaly), if you do it you will see that the same one will be totally ungreatful with you",
        characterSecondaryInfo: "This character is bullshit xd"
    },
    {
        id: 2,
        characterImgSrc: "img/character/The_Knight.webp",
        characterName: "The knight",
        characterMainInfo: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque voluptatibus minus sint vel placeat sapiente veniam, facilis magnam delectus officiis similique illo accusantium, esse non recusandae at eveniet repudiandae ullam.",
        characterSecondaryInfo: "The protagonist"
    },
    {
        id: 3,
        characterImgSrc: "img/character/Hornet_Idle.webp",
        characterName: "Hornet",
        characterMainInfo: "This is a chracter wich appear to be safe (optionaly), if you do it you will see that the same one will be totally ungreatful with you",
        characterSecondaryInfo: "Tsdfg  fsdgdfg"
    },
    {
        id: 4,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "random ashdkja",
        characterMainInfo: "aquio cmabasidnsad;lkf",
        characterSecondaryInfo: "T dfsd fgdf  gdsdfsg"
    },
    {
        id: 5,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "randoamsasd",
        characterMainInfo: "aergdfgdghsdfgsdfgsdf",
        characterSecondaryInfo: "Th dsfdfgdfg  g "
    },
    {
        id: 6,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "shfgdzfgsfdgdsfg",
        characterMainInfo: "sfghbdfrgfgsdfgsdfgsdfg",
        characterSecondaryInfo: "Ths ds fdf gdf gdf d"
    },
    {
        id: 7,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "adfgsdfgdfg",
        characterMainInfo: "dsfgs dfsd fgs dfgsdfgh",
        characterSecondaryInfo: "Thi sfddegh sdfg sdfg dfg "
    },
    {
        id: 8,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "sdfgdfg",
        characterMainInfo: " sdfgsd fgsdfg sdfg",
        characterSecondaryInfo: "Tfg sdfss  s sgs gsf"
    },
    {
        id: 9,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "Zote the knight",
        characterMainInfo: "dsfgsdfgsdfgdsfgsdgsdg",
        characterSecondaryInfo: "Thi dsfgds fgsdfg sdf"
    },
    {
        id: 10,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "dsfgsdfgg",
        characterMainInfo: " sdfgsdfg sdfg sdfg sdfgsd fgsdfg s",
        characterSecondaryInfo: "este es elk unsadf"
    },
    {
        id: 11,
        characterImgSrc: "img/character/Zotethemighty.webp",
        characterName: "Last name",
        characterMainInfo: " sdfgsdfg sfdg dsfg sdfg ",
        characterSecondaryInfo: "the last item"
    },
    

]

export function renderItems(){
    const $itemsFragment = d.createDocumentFragment(),
        $homeItemList = d.getElementById("home-list")

    class HomeItem{
        constructor(id, characterImgSrc, characterName, characterMainInfo, characterSecondaryInfo, isFavorite = false){
            this.id = id,
            this.characterImgSrc = characterImgSrc,
            this.characterName = characterName,
            this.characterMainInfo = characterMainInfo,
            this.characterSecondaryInfo = characterSecondaryInfo,
            this.isFavorite = isFavorite
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
        
            $item.setAttribute("data-item-id", this.id)
            $borderImg.src = "img/UI/item-border.png"
            $characterImg.src = this.characterImgSrc
            $characterName.innerHTML = this.characterName

            return $item
        }
    }

    itemsInfo.forEach(el =>{
        let newItem = new HomeItem(el.id, el.characterImgSrc, el.characterName, el.characterMainInfo, el.characterSecondaryInfo)

        $itemsFragment.appendChild(newItem.createItemNode())
    })

    $homeItemList.appendChild($itemsFragment)
}