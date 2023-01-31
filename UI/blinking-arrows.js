const d = document,
    w = window

export const makeThemBlink = ()=>{
    const $mobileArrows = d.querySelectorAll(".mobile-arrow")

    const blinkingAnimation = [
        {opacity: 0},
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
        {opacity: 0}
    ];

    const blinkTiming = {
        duration: 4000,
        iterations: 1
    };

    const leftArrowAnimation = $mobileArrows[0].animate(blinkingAnimation, blinkTiming),
        rightArrowAnimation = $mobileArrows[1].animate(blinkingAnimation, blinkTiming)


    d.addEventListener("click", (e)=>{
        console.log("askhjdfbvk")
        leftArrowAnimation.finish();
        rightArrowAnimation.finish();
    })


} 