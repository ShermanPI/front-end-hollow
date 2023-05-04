import { classSelectorMaker, selectByClass, selectAllByClass } from "../utils/dom-functions.js";
import { selectors } from "../utils/selectors.js";

export function bckChanger(){
    const biomeNames = ["Dirtmouth", "Howling Cliffs", "Forgotten Crossroads", "City of Tears", "Crystal Peak", "Resting Grounds", "The Hive", "Greenpath", "Kingdom's Edge", "Royal Waterways", "Incredible Zote"],
        $background = selectByClass((selectors.generalBackgroundImg)),
        $backgroundName = selectAllByClass((selectors.backgroundName))
    
    let actualBck = 0;

    if(localStorage.getItem("background-id")){
        actualBck = parseInt(localStorage.getItem("background-id"));
        $backgroundName.forEach((el)=>{
            el.innerHTML = biomeNames[actualBck]
        })
    }
    
    $background.src = `img/background/background-${actualBck}.jpg`;

    document.addEventListener("click", (e)=>{
        if(e.target.matches(classSelectorMaker(selectors.previousBckBtnImg))){
            if(actualBck > 0){
                actualBck--;
            }else if(actualBck == 0){
                actualBck = biomeNames.length - 1;
            }

            localStorage.setItem("background-id", actualBck.toString())
            $background.src = `img/background/background-${actualBck}.jpg`
            $background.alt = biomeNames[actualBck]
            $backgroundName.forEach((el)=>{
                el.innerHTML = biomeNames[actualBck]
            })

        }

        if(e.target.matches(classSelectorMaker(selectors.nextBckBtnImg))){
            if(actualBck == biomeNames.length - 1){
                actualBck = 0;
            }else if(actualBck < biomeNames.length){
                actualBck++;
            }

            localStorage.setItem("background-id", actualBck.toString())
            $background.src = `img/background/background-${actualBck}.jpg`
            $backgroundName.forEach((el)=>{
                el.innerHTML = biomeNames[actualBck]
            })
        }
    })

}