const d = document

export function formUtils(renderLogedPage, customAlert, loadingScreen, editProfile, minigame, renderCharacterItems){
    const $registerForm = d.getElementById("sign-up-form"),
        $loginForm = d.getElementById("login-form"),
        $createCharacterForm = d.getElementById("add-character-form"),
        $registerFormContainer = d.querySelector(".register-form-container"),
        $loginFormContainer = d.querySelector(".login-form-container")

    localStorage.setItem("isFormActivated", "false")

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

    const usernameRegex = /^[a-zA-Z0-9_-]{2,12}$/,
        emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        passwordRegex = /^[a-zA-Z0-9_$#-]{8,}$/



    d.addEventListener("submit", (e)=>{
        e.preventDefault()

        if(e.target == $registerForm){
            // validations
            
            
            // username Input Validation

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
                fetch("http://127.0.0.1:5000/register",
                {
                    'method': "POST",
                    'Content-type': 'application/x-www-form-urlencoded',
                    credentials: 'include',
                    body: new FormData($registerForm)
                })
                .then(res =>{
                    return res.ok? res.json() : Promise.reject(res)
                })
                .then(json => {
                    removeAllErrorFields()
                    customAlert(undefined, `${json.message}`, {isFlashAlert: true})
                    hideRegisterForm()
                    $loginFormContainer.classList.remove("hide-form")

                })
                .catch(error => {
                    if (error.status === 409) {
                        error.json().then(json => {
                            let errorFields = Object.keys(json.errors)
                            
                            errorFields.forEach(field =>{
                                setErrorField($registerForm[field], json.errors[field])
                            })
                        })
                    } else {
                        customAlert("", "An error occurred while submitting the form. Please refresh the page and try again.")
                    }
                  })

            }
            // $registerForm.reset() <==== need to activsate this after tests
        }

        if(e.target == $loginForm){
            // username Input Validation
            if(!validateField(usernameRegex, $loginForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $loginForm.username){
                        if(validateField(usernameRegex, $loginForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                           removeErrorField($loginForm.username)
                        }
                    }
                })
            }

            // password Validation
            if(!validateField(passwordRegex, $loginForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                d.addEventListener("input", (e)=>{
                    if(e.target == $loginForm.password){
                        if(validateField(passwordRegex, $loginForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                            removeErrorField($loginForm.password)
                        }
                    }
                })
            }

            if(validateField(usernameRegex, $loginForm.username) && validateField(passwordRegex, $loginForm.password)){
                fetch("http://127.0.0.1:5000/login",
                {
                    'method': 'post',
                    'Content-type': 'application/x-www-form-urlencoded',
                    credentials: 'include',
                    'body': new FormData($loginForm)
                })
                .then(res =>res.ok? res.json() : Promise.reject(res))
                .then(json => {
                    console.log(json)
                    renderLogedPage(json, loadingScreen, editProfile, customAlert, minigame, renderCharacterItems, true)
                    removeAllErrorFields()
                    hideLoginForm()
                })
                .catch(error => {
                    if (error.status === 401) {
                        error.json().then(json => {
                            let errorFields = Object.keys(json.errors)
                            errorFields.forEach(field =>{
                                setErrorField($loginForm[field], json.errors[field])
                            })
                        })
                    } else {
                        console.error(error)
                        customAlert("", "An error occurred while submitting the form. Please refresh the page and try again.")
                    }
                  })
            }
        }

        if(e.target == $createCharacterForm){
            fetch('http://127.0.0.1:5000/characters', {
                method: "POST",
                credentials: 'include',
                body: new FormData($createCharacterForm)
            })
            .then(res =>res.ok? res.json() : Promise.reject(res))
            .then(json => {
                customAlert(undefined, `A new character has been added`, {isFlashAlert: true})
                $createCharacterForm.reset()
                removeAllErrorFields()
            })
            .catch(error => {                
                if (error.status === 409) {
                    error.json().then(json => {
                        let errorFields = Object.keys(json.errors)
                        errorFields.forEach(field =>{
                            setErrorField($createCharacterForm[field], json.errors[field])
                        })
                    })
                } else {
                    customAlert("", "An error occurred while submitting the form. Please refresh the page and try again.")
                }
            })
        }

    })


    d.addEventListener("click",(e)=>{

        if(e.target.matches(".exit-register-form-icon img")){
            localStorage.setItem("isFormActivated", "false")
            removeAllErrorFields()
            hideLoginForm()
            hideRegisterForm()
        }

        if(e.target.matches(".session-form-container")){
            localStorage.setItem("isFormActivated", "false")
            $registerFormContainer.classList.add("hide-form")
            $loginFormContainer.classList.add("hide-form")
        }

        if(e.target.matches(".signUp-btn") || e.target.matches(".create-account-span") || e.target.matches(".register-anchor")){
            localStorage.setItem("isFormActivated", "true")
            removeAllErrorFields()
            hideLoginForm()
            $registerFormContainer.classList.remove("hide-form")
        }

        if(e.target.matches(".login-btn") || e.target.matches(".login-span") || e.target.matches(".login-anchor")){
            localStorage.setItem("isFormActivated", "true")
            removeAllErrorFields()
            hideRegisterForm()
            $loginFormContainer.classList.remove("hide-form")
        }
    })

}