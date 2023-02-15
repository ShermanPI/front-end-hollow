const d = document

export function burgerMenu(btnSelector, menuSelector){
    const $menuBtn = d.querySelector(btnSelector),
        $menu = d.querySelector(menuSelector)
        
    d.addEventListener("click", (e)=>{
        if(e.target == $menuBtn){
                $menu.classList.toggle("hide-menu");
                $menuBtn.classList.toggle('open');
        }
    })
}