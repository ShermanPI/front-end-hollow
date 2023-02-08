const d = document

export function controlPlaylist(){
    
    const songNames = ['Hollownest', 'Hollow Knight', 'The White Lady']

    d.addEventListener("click", (e)=>{
        
    })



    const $iconMutedSvg = d.createRange().createContextualFragment(`<svg viewBox="0 0 24 24" aria-hidden="true" class="filler volume-btn muted-btn"><g><path d="M15 1.06v21.88L6.68 17H3.5C2.12 17 1 15.88 1 14.5v-5C1 8.12 2.12 7 3.5 7h3.18L15 1.06zM6 9H3.5c-.28 0-.5.22-.5.5v5c0 .28.22.5.5.5H6V9zm2 6.49l5 3.57V4.94L8 8.51v6.98zm10.5-6.9l2 2 2-2L23.91 10l-2 2 2 2-1.41 1.41-2-2-2 2L17.09 14l2-2-2-2 1.41-1.41z"></path></g></svg>`),
        $iconUnmutedSvg = d.createRange().createContextualFragment(`<svg viewBox="0 0 24 24" aria-hidden="true" class="filler volume-btn unmuted-btn"><g><path d="M15 22.94V1.06L6.68 7H3.5C2.12 7 1 8.12 1 9.5v5C1 15.88 2.12 17 3.5 17h3.18L15 22.94zM3.5 9H6v6H3.5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5zM13 19.06l-5-3.57V8.51l5-3.57v14.12zm5.95-12.01c-.24-.24-.49-.45-.75-.65l1-1.75c.41.29.8.62 1.16.99 3.52 3.51 3.52 9.21 0 12.72-.36.37-.75.7-1.16.99l-1-1.75c.26-.2.51-.41.75-.65 2.73-2.73 2.73-7.17 0-9.9zM17 12c0-.8-.31-1.52-.82-2.06l1.02-1.78c1.1.91 1.8 2.29 1.8 3.84s-.7 2.93-1.8 3.84l-1.02-1.78c.51-.54.82-1.26.82-2.06z"></path></g></svg>`),
        $volumeControl = d.querySelector(".volume-control")

    
    d.addEventListener("click", (e)=>{
        if (e.target.matches(".volume-btn")) {
            let newElement;
            if (e.target.classList.contains("muted-btn")) {
                newElement = $iconUnmutedSvg.cloneNode(true);
            } else {
                newElement = $iconMutedSvg.cloneNode(true);
            }
            $volumeControl.replaceChild(newElement, e.target);
          }
    })
}