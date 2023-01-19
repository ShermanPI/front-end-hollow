const d = document

export function navigationArrows(leftArrowSelector, rightArrowSelector){
    const $leftArrow = d.querySelector(leftArrowSelector),
        $rightArrow = d.querySelector(rightArrowSelector)

    d.addEventListener("click", (e)=>{
        console.log(e.target)
        if(e.target == $leftArrow){
            console.log("izquierda")
        }

        if(e.target == $rightArrow){
            console.log("derecha")
        }
    })
}