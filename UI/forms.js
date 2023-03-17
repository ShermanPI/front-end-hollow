const d = document

export function formUtils(){
    const $registerForm = d.getElementById("sign-up-form")
    const $loginForm = d.getElementById("login-form")
    const $registerFormContainer = d.querySelector(".register-form-container")
    const $loginFormContainer = d.querySelector(".login-form-container")

    const hideLoginForm = ()=>{
        $loginFormContainer.classList.add("hide-form")
        $loginForm.reset()
    }

    const hideRegisterForm = ()=>{
        $registerFormContainer.classList.add("hide-form")
        $registerForm.reset()
    }

    d.addEventListener("click",(e)=>{
        if(e.target.matches(".exit-register-form-icon img") || e.target.matches(".session-form-container")){
            hideLoginForm()
            hideRegisterForm()
        }

        if(e.target.matches(".signUp-btn") || e.target.matches(".create-account-span")){
            hideLoginForm()
            $registerFormContainer.classList.remove("hide-form")
        }

        if(e.target.matches(".login-btn") || e.target.matches(".login-span")){
            console.log("target")
            hideRegisterForm()
            $loginFormContainer.classList.remove("hide-form")
        }
    })

    console.log($registerForm.username)
}