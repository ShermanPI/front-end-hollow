const d = document

export function burgerMenu(btnSelector, menuSelector){
    const $menuBtn = d.querySelector(btnSelector),
        $menu = d.querySelector(menuSelector)
        
    d.addEventListener("click", (e)=>{


        if(e.target == $menuBtn){
            if($menu.classList.contains("hide-menu")){
                $menu.classList.remove("hide-menu");
                
            }else{
                $menu.classList.add("hide-menu")
            }
            
        }


    })
}