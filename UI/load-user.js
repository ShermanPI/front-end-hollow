export function loadUser(){
    fetch("http://127.0.0.1:5000/loginiu")
    .then(res => res.ok? res.json() : res)
    .then(userJson=>{
        console.log("This user is still loged in: ", userJson)
    })
    .catch(err=>{
        console.log(err)
    })
}