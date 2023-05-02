import { customAlert } from "./custom_alerts.js"
import { renderLogedPage } from "./render-loged-page.js"
import { classSelectorMaker, createFragment, select, selectById, append, addClass, create, elementContainsClass, removeClass, removeElement, selectAll, fetchFromApi } from "../utils/dom-functions.js"
import { selectors } from "../utils/selectors.js"
import { globalVariables } from "../utils/global-variables.js"

const d = globalVariables.d

class editCharacterItem {
    constructor(name, img){
        this.name = name,
        this.img = img
    }

    makeEditItem(){
        const $characterEditItem = create('div'),
            $characterEditImgContainer = create('div'),
            $characterEditImg = create('img'),
            $characterName = create('p')
        
        addClass($characterEditItem, selectors.characterEditItem)
        addClass($characterEditImgContainer, selectors.characterEditImg)
        addClass($characterName, selectors.characterEditName)
        $characterEditImg.src = `${globalVariables.apiURL}${this.img}`
        $characterName.innerHTML = this.name

        append($characterEditImgContainer, $characterEditImg)
        append($characterEditItem, $characterEditImgContainer)
        append($characterEditItem, $characterName)

        return $characterEditItem
    }
}

export function forms(){
    const $registerForm = selectById(selectors.signUpForm),
        $loginForm = selectById(selectors.loginForm),
        $createCharacterForm = selectById(selectors.addCharacterForm),
        $editCharacterForm = selectById(selectors.editCharacterForm),
        $registerFormContainer = select(classSelectorMaker(selectors.registerFormContainer)),
        $loginFormContainer = select(classSelectorMaker(selectors.loginFormContainer))

    let actualCharacters = []

    const renderEditCharacters = (listToRender) =>{
        const $newEditListFragment = createFragment()
        listToRender.forEach(el=>{
            const newEditItem = new editCharacterItem(el.characterName, el.characterImgSrc)
            append($newEditListFragment, newEditItem.makeEditItem())            
        })

    
        append(select(classSelectorMaker(selectors.characterEditList)), $newEditListFragment)
    }

    localStorage.setItem("isFormActivated", "false")

    const hideLoginForm = ()=>{
        addClass($loginFormContainer, selectors.hideForm)
        $loginForm.reset()
    }

    const hideRegisterForm = ()=>{
        addClass($registerFormContainer, selectors.hideForm)
        $registerForm.reset()
    }

    const setErrorField = (field, errorMessage)=>{

        const $errorFieldAlert = create('div')
        addClass($errorFieldAlert, selectors.errorField)
        $errorFieldAlert.innerHTML = errorMessage
        
        const $errorFieldClone = $errorFieldAlert.cloneNode(true)

        if(!elementContainsClass(field, selectors.error)){
            addClass(field, selectors.error)
            field.insertAdjacentElement("afterend", $errorFieldClone)   
        }
    }
    
    const removeErrorField = (field)=>{
        if(elementContainsClass(field, selectors.error)){
            removeClass(field, selectors.error)
            removeElement(field.parentNode.lastElementChild)
        }
    }

    const removeAllErrorFields = ()=>{
        const $errorFields = selectAll(classSelectorMaker(selectors.error)) 
        const $errorMessages = selectAll(classSelectorMaker(selectors.errorField))

        $errorFields.forEach(el=>{
            removeClass(el, selectors.error)
        })

        $errorMessages.forEach(el=>{
            removeElement(el)
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

    globalVariables.d.addEventListener("submit", (e)=>{
        e.preventDefault()

        if(e.target == $registerForm){
            // validations
            
            // username Input Validation

            if(!validateField(usernameRegex, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.username){
                        if(validateField(usernameRegex, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                           removeErrorField($registerForm.username)
                        }
                    }
                })
            }

            // email Validation

            if(!validateField(emailRegex, $registerForm.email, `The entered email is not valid, please enter a valid one`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.email){
                        if(validateField(emailRegex, $registerForm.email, `The entered email is not valid, please enter a valid one`)){
                            removeErrorField($registerForm.email)
                        }
                    }
                })
            }

            // password Validation

            if(!validateField(passwordRegex, $registerForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.password){
                        if(validateField(passwordRegex, $registerForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                            removeErrorField($registerForm.password)
                        }
                    }
                })
            }

            // confirm password Validation
            
            if(!validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password, `Needs to be equal to Password`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $registerForm.confirm_password){
                        if(validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password, `Needs to be equal to Password`)){
                            removeErrorField($registerForm.confirm_password)
                        }
                    }
                })
            }

            // send the information
            if(validateField(usernameRegex, $registerForm.username) && validateField(emailRegex, $registerForm.email) && validateField(passwordRegex, $registerForm.password) && validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password)){   
                                
                fetchFromApi(globalVariables.registerEndpoint, {method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: new FormData($registerForm)})
                .then(json => {
                    removeAllErrorFields()
                    customAlert(undefined, `${json.message}`, {isFlashAlert: true})
                    hideRegisterForm()
                    removeClass($loginFormContainer, selectors.hideForm)
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
        }

        if(e.target == $loginForm){
            // username Input Validation
            if(!validateField(usernameRegex, $loginForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $loginForm.username){
                        if(validateField(usernameRegex, $loginForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)){
                           removeErrorField($loginForm.username)
                        }
                    }
                })
            }

            // password Validation
            if(!validateField(passwordRegex, $loginForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                globalVariables.d.addEventListener("input", (e)=>{
                    if(e.target == $loginForm.password){
                        if(validateField(passwordRegex, $loginForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)){
                            removeErrorField($loginForm.password)
                        }
                    }
                })
            }

            if(validateField(usernameRegex, $loginForm.username) && validateField(passwordRegex, $loginForm.password)){
                fetchFromApi(globalVariables.loginEndpoint, { method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: new FormData($loginForm) })
                .then(json => {
                    if(select(classSelectorMaker(selectors.unloggedScreen)))  removeElement(select(classSelectorMaker(selectors.unloggedScreen)))
                    renderLogedPage(json, true)
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
            fetchFromApi(globalVariables.createCharacterEndPoint, {method: "POST", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: new FormData($createCharacterForm)})
            .then(json => {
                actualCharacters.push(json)
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

        if(e.target == $editCharacterForm){
            fetchFromApi(`character/${$editCharacterForm.characterEditingName.value}`, {method: "PUT", headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: new FormData($editCharacterForm)})
            .then(json => {
                actualCharacters.forEach((el, index)=>{
                    if(el._id.$oid == json._id.$oid){
                        actualCharacters[index] = json
                    }
                })
                removeAllErrorFields()
                customAlert(undefined, `The characters has been updated`, {isFlashAlert: true})
                $editCharacterForm.reset()
                localStorage.setItem("favoritesUpdated", "true")
            })
            .catch(error => {
                if (error.status === 409) {
                    error.json().then(json => {
                        let errorFields = Object.keys(json.errors)
                        errorFields.forEach(field =>{
                            setErrorField($editCharacterForm[field], json.errors[field])
                        })
                    })
                } else {
                    customAlert("", "An error occurred while submitting the form. Please refresh the page and try again.")
                }
            })
        }

    })


    globalVariables.d.addEventListener("click",(e)=>{

        if(e.target.matches(".exit-register-form-icon img")){
            localStorage.setItem("isFormActivated", "false")
            removeAllErrorFields()
            hideLoginForm()
            hideRegisterForm()
        }

        if(e.target.matches(".session-form-container")){
            localStorage.setItem("isFormActivated", "false")
            addClass($registerFormContainer, selectors.hideForm)
            addClass($loginFormContainer, selectors.hideForm)
        }

        if(e.target.matches(classSelectorMaker(selectors.signUpBtn)) || e.target.matches(classSelectorMaker(selectors.createAccountSpan)) || e.target.matches(classSelectorMaker(selectors.registerAnchor)) || e.target.matches(classSelectorMaker(selectors.signupUnloggedBtn))){
            localStorage.setItem("isFormActivated", "true")
            removeAllErrorFields()
            hideLoginForm()
            removeClass($registerFormContainer, selectors.hideForm)
        }

        if(e.target.matches(classSelectorMaker(selectors.loginBtn)) || e.target.matches(classSelectorMaker(selectors.loginSpan)) || e.target.matches(classSelectorMaker(selectors.loginAnchor)) || e.target.matches(classSelectorMaker(selectors.loginUnloggedBtn))){
            localStorage.setItem("isFormActivated", "true")
            removeAllErrorFields()
            hideRegisterForm()
            removeClass($loginFormContainer, selectors.hideForm)
        }
    })

    fetchFromApi(globalVariables.getCharacterEndPoint)
    .then(charactersJson => {
        actualCharacters = charactersJson
        const $characterEditList = select(classSelectorMaker(selectors.characterEditList))
        
        globalVariables.d.addEventListener("input", (e)=>{
            if(e.target == $editCharacterForm.characterEditingName){

                if($editCharacterForm.characterEditingName.value == ""){
                    addClass($characterEditList, selectors.hideEditList)
                    $editCharacterForm.reset()
                    return;
                }

                removeClass($characterEditList, selectors.hideEditList)

                let inputValue = $editCharacterForm.characterEditingName.value,
                    $characterEditItem = selectAll(classSelectorMaker(selectors.characterEditItem))
                
                $characterEditItem.forEach(el=>el.remove())

                const filteredArr = actualCharacters.filter(item =>{
                    return item.characterName.match(new RegExp(inputValue, "i"));
                })

                renderEditCharacters(filteredArr)
            }
        })

        globalVariables.d.addEventListener("click", (e)=>{
            if(e.target.matches(classSelectorMaker(selectors.characterEditItem))){
                let characterName = select(classSelectorMaker(selectors.characterEditName)).innerHTML
                
                addClass($characterEditList, selectors.hideEditList)
                $editCharacterForm.characterEditingName.value = characterName

                let filteredArr = actualCharacters.filter(item =>{
                    return item.characterName.match(new RegExp(characterName, "i"));
                })

                filteredArr = filteredArr[0]
                
                $editCharacterForm.newCharacterName.value = filteredArr.characterName
                $editCharacterForm.newCharacterMainInfo.value = filteredArr.characterMainInfo
                $editCharacterForm.newCharacterSecondaryInfo.value = filteredArr.characterSecondaryInfo

            }
        })
    })
    .catch(error => {console.error(error)})
}