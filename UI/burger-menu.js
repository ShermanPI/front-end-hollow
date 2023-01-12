const d = document,
    root = document.documentElement;

export function burgerMenu(btnSelector, menuSelector){
    const $menuBtn = d.querySelector(btnSelector),
        $menu = d.querySelector(menuSelector)
        
    d.addEventListener("click", (e)=>{

        if(e.path[1] == $menuBtn){
            if($menu.classList.contains("hide-menu")){
                $menu.classList.remove("hide-menu");
                $menuBtn.classList.add('open');
                root.style.setProperty('--header-color', "#0f0f1b");
            }else{
                $menu.classList.add("hide-menu");
                $menuBtn.classList.remove('open');
                root.style.setProperty('--header-color', "black");

            }
            
        }


    })
}