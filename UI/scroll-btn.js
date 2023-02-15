export function scrollsBtn() {
    const $favoriteListContainer = document.querySelector(".favorite-list-container"),
        $scrollBtn = document.querySelector(".scroll-btn")

    $favoriteListContainer.addEventListener("scroll", (e)=>{
        if($favoriteListContainer.scrollTop > 300){
            $scrollBtn.classList.remove("hide-scroll-btn")
        }else{
            $scrollBtn.classList.add("hide-scroll-btn")
        }
    })

    document.addEventListener("click", (e)=>{
        if(e.target == $scrollBtn){
            e.stopPropagation()
            $favoriteListContainer.scrollTo({top: 0, behavior: "smooth"})
        }
    });
}