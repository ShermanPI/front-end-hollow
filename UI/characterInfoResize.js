const d = document,
    w = window;

export function setMaxHeight(selectorToResize){
    const $divToResize = d.querySelector(selectorToResize);

    let resize = ()=> {
        let headerSectionHeight = d.querySelector(".home-header").getBoundingClientRect().height,
        itemListHeight = d.querySelector(".item-list").getBoundingClientRect().height;

        
        let heighTaken = headerSectionHeight + itemListHeight;
        

        $divToResize.style.maxHeight = `calc(100vh - ${heighTaken}px)`;
    }
    
    resize();
    

    w.addEventListener("resize", (e)=>{
        resize();
    })
}