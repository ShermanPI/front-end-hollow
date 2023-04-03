const d = document

export function loadUser(){

    let renderLogedPage = (userObj)=>{
        const $loggedOutElements = d.querySelectorAll(".logged-out"),
            $usernameLabel = d.getElementById("user-username")
    
        $loggedOutElements.forEach(el=>{
            el.classList.replace("logged-out", "logged-in")
        })

        console.log(userObj)
    }

    fetch("http://127.0.0.1:5000/login",
    {
        credentials: 'include'
    })
    .then(res => res.ok? res.json() : res)
    .then(userJson=>{
        console.log("This user is still loged in: ", userJson)
        if(userJson){
            renderLogedPage(userJson)
            console.log("hola")
        }
    })
    .catch(err=>{
        console.log(err)
    })
}