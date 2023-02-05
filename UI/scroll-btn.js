export function scrollsBtn() {
    const $favoriteItemList = document.querySelector(".favorite-item-list"),
        $scrollBtn = document.querySelector(".scroll-btn"),
        $profile = document.querySelector(".profile-container")
    
    $profile.addEventListener("scroll", (e)=>{
        console.log($profile.scrollTop)
        if($profile.scrollTop > 800){
            $scrollBtn.classList.remove("hide-scroll-btn")
        }else{
            $scrollBtn.classList.add("hide-scroll-btn")
        }
    })

    $scrollBtn.addEventListener("click", (e)=>{
        console.log("se ha dado click")
        e.stopPropagation()
        $profile.scrollTo({top: 0, behavior: "smooth"})
    })

    $favoriteItemList.addEventListener("scroll", (e)=>{
        console.log($favoriteItemList.scrollTop)
        if($favoriteItemList.scrollTop > 800){
            $scrollBtn.classList.remove("hide-scroll-btn")
        }else{
            $scrollBtn.classList.add("hide-scroll-btn")
        }
    })

    $scrollBtn.addEventListener("click", (e)=>{
        console.log("se ha dado click")
        e.stopPropagation()
        $favoriteItemList.scrollTo({top: 0, behavior: "smooth"})
    })


}