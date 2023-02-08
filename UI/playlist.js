const d = document,
    w = window;

export function controlPlaylist(){

    const pauseSvgContent =  `<g><path class = "playlist-btn" d="M4 2h5v20H4V2zm11 20h5V2h-5v20z"></path></g>`,
        playSvgContent =  `<g><path class = "playlist-btn" d="M21 12L4 2v20l17-10z"></path></g>`,
        iconMutedSvgContent = `<g><path class = "sound-btn" d="M15 1.06v21.88L6.68 17H3.5C2.12 17 1 15.88 1 14.5v-5C1 8.12 2.12 7 3.5 7h3.18L15 1.06zM6 9H3.5c-.28 0-.5.22-.5.5v5c0 .28.22.5.5.5H6V9zm2 6.49l5 3.57V4.94L8 8.51v6.98zm10.5-6.9l2 2 2-2L23.91 10l-2 2 2 2-1.41 1.41-2-2-2 2L17.09 14l2-2-2-2 1.41-1.41z"></path></g>`,
        iconUnmutedSvgContent = `<g><path class = "sound-btn" d="M15 22.94V1.06L6.68 7H3.5C2.12 7 1 8.12 1 9.5v5C1 15.88 2.12 17 3.5 17h3.18L15 22.94zM3.5 9H6v6H3.5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5zM13 19.06l-5-3.57V8.51l5-3.57v14.12zm5.95-12.01c-.24-.24-.49-.45-.75-.65l1-1.75c.41.29.8.62 1.16.99 3.52 3.51 3.52 9.21 0 12.72-.36.37-.75.7-1.16.99l-1-1.75c.26-.2.51-.41.75-.65 2.73-2.73 2.73-7.17 0-9.9zM17 12c0-.8-.31-1.52-.82-2.06l1.02-1.78c1.1.91 1.8 2.29 1.8 3.84s-.7 2.93-1.8 3.84l-1.02-1.78c.51-.54.82-1.26.82-2.06z"></path></g>`,
        $playBtn = d.querySelector(".playlist-btn"),
        $soundBtn = d.querySelector(".sound-btn"),
        $songName = d.querySelector(".song-name"),
        $volumeBar = d.querySelector(".volume-bar"),
        $audio = d.createElement("audio")

    const songNames = ['Enter Hollownest', 'Hollow Knight', 'The White Lady']
    
    let actualSong = Math.floor(Math.random() * songNames.length),
        isPlaying = false,
        isMuted = false;
        
    const putDisc = (discNum)=>{
        $songName.innerHTML = songNames[discNum]
        $audio.src = `../assets/OST-${discNum}.mp3`;
    }
    putDisc(actualSong)

    const adjustVolume = (volume)=>{
        $audio.volume = volume
    }

    adjustVolume($volumeBar.value)

    const playDisc = ()=>{
        $audio.play()
        $playBtn.innerHTML = pauseSvgContent
        isPlaying = true
    }

    const pauseDisc = ()=>{
        $audio.pause()
        $playBtn.innerHTML = playSvgContent
        isPlaying = false
    }


    d.addEventListener("click", (e)=>{        
        if(e.target.matches(".playlist-btn")){
            if(!isPlaying){
                playDisc()
            }else{
                pauseDisc()
            }
        }

        if (e.target.matches(".sound-btn")) {
            console.log("hola")
            
            if (!isMuted) {
                $audio.muted = true
                isMuted = true
                $soundBtn.innerHTML = iconMutedSvgContent
            } else {
                $audio.muted = false
                isMuted = false
                $soundBtn.innerHTML = iconUnmutedSvgContent
            }
        }

        if (e.target.matches(".prev-song")) {
            if(actualSong == 0){
                actualSong = songNames.length - 1;
                putDisc(actualSong)
                playDisc()
                return;
            }

            actualSong--;
            putDisc(actualSong)
            playDisc()
        }
        
        if (e.target.matches(".next-song")) {
            if(actualSong == songNames.length - 1){
                actualSong = 0;
                putDisc(actualSong)
                playDisc()
                return;
            }

            actualSong++;
            putDisc(actualSong)
            playDisc()
        }
    })

    d.addEventListener("visibilitychange", e=>{
        console.log(isPlaying)
        if(d.visibilityState == "hidden"){
            $audio.pause()
            $playBtn.innerHTML = playSvgContent
        }else if(isPlaying){
            playDisc()
        }
    })

    $volumeBar.addEventListener("input",()=>{
        adjustVolume($volumeBar.value)
        console.log("el volumen ahora es: ", $volumeBar.value)
    })


}