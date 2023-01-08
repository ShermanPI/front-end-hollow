const d = document,
    w = window;

export function setMaxHeight(...objsToResize){

    const resize = ()=>{
        objsToResize.forEach(obj=>{
            const $objResize = d.querySelector(obj.name);
            
            let heightToRest = obj.elementsToRest.map(selector =>d.querySelector(selector).getBoundingClientRect().height)
                .reduce((a, b) => a + b, 0);
            
            $objResize.style.maxHeight = `calc(100vh - ${heightToRest}px)`;
    
        })
    }

    resize();

    w.addEventListener("resize", (e)=>{
        resize();
    })
}