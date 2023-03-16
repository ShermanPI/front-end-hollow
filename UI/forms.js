const d = document

export function formUtils(){
    const $registerForm = d.querySelector(".session-form")

    d.addEventListener("click",(e)=>{
        if(e.target.matches(".exit-register-form-icon img") || e.target.matches(".session-form-container")){
            console.log("hola")
        }
    })

    console.log($registerForm.username)
}