export function resizeItemToHeight(itemToResize, ...elemToRest){
    const $elemToResize = document.querySelector(itemToResize)
    

    const resizeElement = ()=>{
        if(window.innerWidth < 1024){
            let totalHeightToRest = 0;

            elemToRest.forEach(el=>{
                let $elem = document.querySelector(el);
                totalHeightToRest += $elem.getBoundingClientRect().height;
            })

            $elemToResize.style.height = `calc(100vh - ${totalHeightToRest}px)`
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