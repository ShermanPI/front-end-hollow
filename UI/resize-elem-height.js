export function resizeItemToHeight(itemToResize, ...elemToRest){
    const $elemToResize = document.querySelector(itemToResize)
    

    console.log("inner With",window.innerWidth)
    const resizeElement = ()=>{
        if(window.innerWidth < 1024){
            let totalHeightToRest = 0;

            elemToRest.forEach(el=>{
                let $elem = document.querySelector(el);
                totalHeightToRest += $elem.getBoundingClientRect().height;
            })

            $elemToResize.style.height = `calc(100vh - ${totalHeightToRest}px)`
            console.log("hola, se hizo resize yu este es el heoight as restar", totalHeightToRest)
        }else{
            if ($elemToResize.hasAttribute("style")){
                $elemToResize.removeAttribute("style");
            }
        }
    
    }
    resizeElement()
    
    window.addEventListener("resize",()=>{
        resizeElement()
    })
}