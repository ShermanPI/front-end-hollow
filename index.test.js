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