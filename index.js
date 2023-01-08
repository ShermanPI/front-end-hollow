import { selectors } from "./utils/dom-selectors.js";
import { setMaxHeight } from "./UI/maxHeightSetter.js";

window.addEventListener("DOMContentLoaded", (e)=>{
    setMaxHeight(selectors.characterInfo, selectors.profileContainer)
})
