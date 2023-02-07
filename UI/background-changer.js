export function bckChanger(){
    const biomeNames = ["Dirtmouth", "Howling Cliffs", "Forgotten Crossroads", "City of Tears", "Crystal Peak", "Resting Grounds", "The Hive", "Greenpath", "Kingdom's Edge", "Royal Waterways", "Incredible Zote"],
        $background = document.querySelector(".general-background img"),
        $backgroundName = document.querySelector(".background-name")
    
    let actualBck = 0;

    if(localStorage.getItem("background-id")){
        actualBck = parseInt(localStorage.getItem("background-id"));
        $backgroundName.innerHTML = biomeNames[actualBck]
    }

    console.log(localStorage.getItem("background-id"))
    console.log(actualBck)
    
    $background.src = `img/background/background-${actualBck}.jpg`;

    document.addEventListener("click", (e)=>{
        if(e.target.matches(".previous-bck-btn img")){
            if(actualBck > 0){
                actualBck--;
            }else if(actualBck == 0){
                actualBck = biomeNames.length - 1;
            }

            localStorage.setItem("background-id", actualBck.toString())
            $background.src = `img/background/background-${actualBck}.jpg`
            $backgroundName.innerHTML = biomeNames[actualBck]
            console.log(actualBck)

        }

        if(e.target.matches(".next-bck-btn img")){
            if(actualBck == biomeNames.length - 1){
                actualBck = 0;
            }else if(actualBck < biomeNames.length){
                actualBck++;
            }

            localStorage.setItem("background-id", actualBck.toString())
            $background.src = `img/background/background-${actualBck}.jpg`
            $backgroundName.innerHTML = biomeNames[actualBck]
            console.log(actualBck)
        }
    })

}