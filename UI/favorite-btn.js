export function markAsFavorite(btnSelector){

    document.addEventListener("click", (e)=>{
        if(e.target.matches(btnSelector)){
            if(e.target.getAttribute("src") == "img/icons/unfavorite.png"){
                e.target.src = "img/icons/favorite.png"
            }else{
                e.target.src = "img/icons/unfavorite.png"
            }
        }
    })
    
}