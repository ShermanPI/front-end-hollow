const d = document

export function formUtils(){
    const $registerForm = d.getElementById("sign-up-form")
    const $loginForm = d.getElementById("login-form")
    const $registerFormContainer = d.querySelector(".register-form-container")
    const $loginFormContainer = d.querySelector(".login-form-container")
    // const $registerSubmitBtn = d.getElementById("register-btn")
    // const $loginSubmitBtn = d.getElementById("login-btn")


    const hideLoginForm = ()=>{
        $loginFormContainer.classList.add("hide-form")
        $loginForm.reset()
    }

    const hideRegisterForm = ()=>{
        $registerFormContainer.classList.add("hide-form")
        $registerForm.reset()
    }

    const setErrorField = (field, errorMessage)=>{
        const $errorFieldAlert = d.createElement("div")
        $errorFieldAlert.classList.add("error-field")
        $errorFieldAlert.innerHTML = errorMessage
        
        const $errorFieldClone = $errorFieldAlert.cloneNode(true)

        if(!field.classList.contains("error")){
            field.classList.add("error")
            field.insertAdjacentElement("afterend", $errorFieldClone)   
        }
        
    }
    
    const removeErrorField = (field)=>{
        if(field.classList.contains("error")){
            field.classList.remove("error")
            field.parentNode.lastElementChild.remove()
        }
    }

    const removeAllErrorFields = ()=>{
        const $errorFields = d.querySelectorAll(".error")
        const $errorMessages = d.querySelectorAll(".error-field")

        $errorFields.forEach(el=>{
            el.classList.remove("error")
        })

        $errorMessages.forEach(el=>{
            el.remove()
        })

    }


    const validateField = (validationRegex, field, errorMessage = null)=>{
        let fieldValue = field.value.trim()

        if(!validationRegex.test(fieldValue)){
            if(errorMessage){
                setErrorField(field, errorMessage)
            }
            return false;
        }

        return true
    }    

    d.addEventListener("submit", (e)=>{
        e.preventDefault()

        if(e.target == $registerForm){
            // validations
            
            
            // username Input Validation
            const usernameRegex = /^[a-zA-Z0-9_-]{2,12}$/

            if(!validateField(usernameRegex, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.username){
                        if(validateField(usernameRegex, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                           removeErrorField($registerForm.username)
                        }
                    }
                })
            }

            // email Validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            if(!validateField(emailRegex, $registerForm.email, `The entered email is not valid, please enter a valid one`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.email){
                        if(validateField(emailRegex, $registerForm.email, `The entered email is not valid, please enter a valid one`)){
                            removeErrorField($registerForm.email)
                        }
                    }
                })
            }

            // password Validation
            const passwordRegex = /^[a-zA-Z0-9_$#-]{8,}$/

            if(!validateField(passwordRegex, $registerForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.password){
                        if(validateField(passwordRegex, $registerForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                            removeErrorField($registerForm.password)
                        }
                    }
                })
            }

            // confirm password Validation
            
            if(!validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password, `Needs to be equal to Password`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.confirm_password){
                        if(validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password, `Needs to be equal to Password`)){
                            removeErrorField($registerForm.confirm_password)
                        }
                    }
                })
            }

            // fetch
            if(validateField(usernameRegex, $registerForm.username) && validateField(emailRegex, $registerForm.email) && validateField(passwordRegex, $registerForm.password) && validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password)){
                console.log(`ola, se ha registrado ${$registerForm.username.value}`)
            }else{
                // console.log()
                console.log("NO SE HA PODIDO ENVIAR ")
            }
            // $registerForm.reset()
        
        }

    })

    d.addEventListener("click",(e)=>{

        if(e.target.matches(".exit-register-form-icon img")){
            removeAllErrorFields()
            hideLoginForm()
            hideRegisterForm()
        }

        if(e.target.matches(".session-form-container")){
            $registerFormContainer.classList.add("hide-form")
            $loginFormContainer.classList.add("hide-form")
        }

        if(e.target.matches(".signUp-btn") || e.target.matches(".create-account-span")){
            removeAllErrorFields()
            hideLoginForm()
            $registerFormContainer.classList.remove("hide-form")
        }

        if(e.target.matches(".login-btn") || e.target.matches(".login-span")){
            removeAllErrorFields()
            hideRegisterForm()
            $loginFormContainer.classList.remove("hide-form")
        }
    })

}