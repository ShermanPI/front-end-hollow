import { selectAllByClass } from "../utils/dom-functions.js";
import { globalVariables } from "../utils/global-variables.js";
import { selectors } from "../utils/selectors.js";

export const makeThemBlink = ()=>{
    const $mobileArrows = selectAllByClass((selectors.mobileArrow))

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

    globalVariables.d.addEventListener("click", (e)=>{
        leftArrowAnimation.finish();
        rightArrowAnimation.finish();
    })


} 