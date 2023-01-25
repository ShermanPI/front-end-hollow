
export function activePage(){
    const $sections = document.querySelectorAll(".section-container")

    const options = {
        threshold: 0.9
    }

    const callback = (entries)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log(entry.target)
            }
        });        
    }

    const observer = new IntersectionObserver(callback, options)

    $sections.forEach(el=>observer.observe(el))
    
} 