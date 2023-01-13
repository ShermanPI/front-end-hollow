const d = document,
    w = window;

export function setMaxHeight(...objsToResize){

    const resize = ()=>{
        if(w.innerWidth <= 768){
            objsToResize.forEach(obj=>{
                const $objResize = d.querySelector(obj.name);
                
                let heightToRest = obj.elementsToRest.map(selector =>d.querySelector(selector).getBoundingClientRect().height)
                    .reduce((a, b) => a + b, 0);
                
                if(obj.name == ".admin-container") {
                    $objResize.style.height = `calc(100vh - ${heightToRest}px)`;
                }else{
                    $objResize.style.maxHeight = `calc(100vh - ${heightToRest}px)`;
                }
        
            })
        }
    }
    
    resize();

    w.addEventListener("resize", ()=>{
        resize();
    })
}