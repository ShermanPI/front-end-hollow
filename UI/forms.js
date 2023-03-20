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


        if(!d.querySelector(".error-field")){
            field.classList.add("error")
            field.insertAdjacentElement("afterend", $errorFieldClone)
        }
    }
    
    const removeErrorField = (field)=>{
        console.log(d.querySelector(".error"))
        field.classList.remove("error")

        console.log("FIELD: ", field)
        console.log("FIELD NEXT: ", field.nextElementSibling)
        field.parentNode.lastElementChild.remove()
        console.log("se ha borrado")
        // field.nextElementSibling.remove()
    }

    let isRegisterFormValidated = true //////////// registrationFormValidation

    const validateField = (validationRegex, field, errorMessage)=>{
        let fieldValue = field.value.trim()

        if(!validationRegex.test(fieldValue)){
            setErrorField(field, errorMessage)
            isRegisterFormValidated = isRegisterFormValidated && false 
            return false;
        }

        isRegisterFormValidated = isRegisterFormValidated && true
        return true
    }

    // const setValidationFieldListeners = (validationRegex, field, errorMessage) =>{
    //     let isFieldValidated = validateField(validationRegex, field, errorMessage)
    //     if(!isFieldValidated) {
    //         d.addEventListener("input", (e)=>{
    //             if(e.target == field){
    //                 console.log("field has been added to the listeners", field)
    //                 if(validateField(validationRegex, field, errorMessage)){
    //                    removeErrorField($registerForm.username)
    //                 }
    //             }
    //         })
    //     }
        
    // }
    

    d.addEventListener("submit", (e)=>{
        e.preventDefault()

        if(e.target == $registerForm){
            // validations
            
            // username Validation -- need 
            if(!validateField(/^[a-zA-Z0-9_-]{2,12}$/, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.username){
                        if(validateField(/^[a-zA-Z0-9_-]{2,12}$/, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                           removeErrorField($registerForm.username)
                        }
                    }
                })
            }

            // username Validation -- I STTOPPED HERE
            if(!validateField(/^[a-zA-Z0-9_-]{2,12}$/, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.username){
                        if(validateField(/^[a-zA-Z0-9_-]{2,12}$/, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                            removeErrorField($registerForm.username)
                        }
                    }
                })
            }

            // fetch
            if(isRegisterFormValidated){
                console.log(`ola, se ha registrado ${$registerForm.username.value}`)
                $registerForm.reset()
            }
        }

        console.log(e.target)
    })

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

}