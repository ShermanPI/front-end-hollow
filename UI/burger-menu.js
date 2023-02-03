const d = document,
    root = document.documentElement;

export function burgerMenu(btnSelector, menuSelector){
    const $menuBtn = d.querySelector(btnSelector),
        $menu = d.querySelector(menuSelector)
        
        $menuBtn.addEventListener("click", (e)=>{
            $menu.classList.toggle("hide-menu");
            $menuBtn.classList.toggle('open');
        }) 
}