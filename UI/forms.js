import { customAlert } from "./custom_alerts.js"
import { renderLogedPage } from "./render-loged-page.js"
import { classSelectorMaker, createFragment, selectByClass, selectById, append, addClass, create, elementContainsClass, removeClass, removeElement, selectAllByClass, fetchFromApi } from "../utils/dom-functions.js"
import { selectors } from "../utils/selectors.js"
import { globalVariables } from "../utils/global-variables.js"

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
        $registerFormContainer = selectByClass((selectors.registerFormContainer)),
        $loginFormContainer = selectByClass((selectors.loginFormContainer))

    let actualCharacters = []

    const renderEditCharacters = (listToRender) =>{
        const $newEditListFragment = createFragment()
        listToRender.forEach(el=>{
            const newEditItem = new editCharacterItem(el.characterName, el.characterImgSrc)
            append($newEditListFragment, newEditItem.makeEditItem())            
        })

    
        append(selectByClass((selectors.characterEditList)), $newEditListFragment)
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
        const $errorFields = selectAllByClass((selectors.error)) 
        const $errorMessages = selectAllByClass((selectors.errorField))

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

    const validateInputTyping = (regex, fieldToValidate, message)=>{
        if(!validateField(regex, fieldToValidate, message)){
            globalVariables.d.addEventListener("input", (e)=>{
                if(e.target == fieldToValidate){
                    if(validateField(regex, fieldToValidate, message)){
                       removeErrorField(fieldToValidate)
                    }
                }
            })
        }
    }

    globalVariables.d.addEventListener("submit", (e)=>{
        e.preventDefault()

        if(e.target == $registerForm){
            // username Input Validation while writing
            validateInputTyping(usernameRegex, $registerForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)
            // email Validation
            validateInputTyping(emailRegex, $registerForm.email, `The entered email is not valid, please enter a valid one`)

            // password Validation
            validateInputTyping(passwordRegex, $registerForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)

            // confirm password Validation
            validateInputTyping(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password, `Needs to be equal to Password`)

            // send the information
            if(validateField(usernameRegex, $registerForm.username) && validateField(emailRegex, $registerForm.email) && validateField(passwordRegex, $registerForm.password) && validateField(new RegExp(`^${$registerForm.password.value}$`, "i"), $registerForm.confirm_password)){   
                                
                fetchFromApi(globalVariables.registerEndpoint, {method: 'POST', body: new FormData($registerForm)})
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
            validateInputTyping(usernameRegex, $loginForm.username, `The username must have English alphabet letters, number and/or "-", "_"`)

            // password Validation
            validateInputTyping(passwordRegex, $loginForm.password, `Passwords must contain at least 8 characters and can include letters, numbers and some common special characters (_, $, #, -)`)

            if(validateField(usernameRegex, $loginForm.username) && validateField(passwordRegex, $loginForm.password)){
                fetchFromApi(globalVariables.loginEndpoint, { method: 'POST', body: new FormData($loginForm) })
                .then(json => {
                    if(selectByClass((selectors.unloggedScreen)))  removeElement(selectByClass((selectors.unloggedScreen)))
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
            fetchFromApi(globalVariables.createCharacterEndPoint, {method: "POST", body: new FormData($createCharacterForm)})
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
            const formData = new FormData($editCharacterForm)
            fetchFromApi(`character/${$editCharacterForm.characterEditingName.value}`, {method: "PUT", body: formData})
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
                            if($editCharacterForm[field].getAttribute('id') !== selectors.characterEditingNameField){
                                setErrorField($editCharacterForm[field], json.errors[field])
                            }else{
                                setErrorField(selectByClass(selectors.characterEditingContainer), json.errors[field])
                            }
                        })
                    })
                } else {
                    customAlert("", "An error occurred while submitting the form. Please refresh the page and try again.")
                }
            })
        }

    })


    globalVariables.d.addEventListener("click",(e)=>{
        if(e.target.matches(classSelectorMaker(selectors.deleteCharacterBtn))){
            let deletedCharacterIndex = -1,
                characterEditName = $editCharacterForm.characterEditingName.value

            
            let filteredArr = actualCharacters.filter((item, index)=>{
                if(new RegExp(`^${characterEditName}$`).test(item.characterName)){
                    deletedCharacterIndex = index
                    return item;
                }
            })

            let filteredCharacter = filteredArr[0]
            
            if(filteredCharacter){
                const alertOptions = {
                    isConfirmType: true,
                    yesFunction(){
                        fetchFromApi(`character/${filteredCharacter._id.$oid}`, {method: 'DELETE'})
                        .then(json=>{
                            customAlert(undefined, `${json.message}, ${characterEditName}`, {isFlashAlert: true})
                            actualCharacters.splice(deletedCharacterIndex, 1)
                            localStorage.setItem("favoritesUpdated", "true")
                            $editCharacterForm.reset()
                        })
                        .catch(err => {
                            err.json().then(json=>{
                                setErrorField(selectByClass(selectors.characterEditingContainer), json.message)
                            })
                        })
                    }
                }

                customAlert('Delete Item', `Are you sure you want to Delete ${filteredCharacter.characterName}?`, alertOptions)

            }else{
                setErrorField(selectByClass(selectors.characterEditingContainer), 'There is no character with this name, please check and try again')
                addClass(selectByClass((selectors.characterEditList)), selectors.hideEditList)

                function deleteErrorField() {
                    removeAllErrorFields()
                    $editCharacterForm.characterEditingName.removeEventListener("input", deleteErrorField);
                }

                $editCharacterForm.characterEditingName.addEventListener("input", deleteErrorField);
            }
        }

        if(e.target.matches(classSelectorMaker(selectors.exitRegisterFormIconImg))){
            localStorage.setItem("isFormActivated", "false")
            removeAllErrorFields()
            hideLoginForm()
            hideRegisterForm()
        }

        if(e.target.matches(classSelectorMaker(selectors.sessionFormContainer))){
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
        const $characterEditList = selectByClass((selectors.characterEditList))
        
        globalVariables.d.addEventListener("input", (e)=>{
            if(e.target == $editCharacterForm.characterEditingName){

                if($editCharacterForm.characterEditingName.value == ""){
                    addClass($characterEditList, selectors.hideEditList)
                    $editCharacterForm.reset()
                    return;
                }

                removeClass($characterEditList, selectors.hideEditList)

                let inputValue = $editCharacterForm.characterEditingName.value,
                    $characterEditItem = selectAllByClass((selectors.characterEditItem))
                
                $characterEditItem.forEach(el=>removeElement(el))

                const filteredArr = actualCharacters.filter(item =>{
                    return new RegExp(inputValue, "i").test(item.characterName)
                })

                renderEditCharacters(filteredArr)
            }
        })

        globalVariables.d.addEventListener("click", (e)=>{
            if(e.target.matches(classSelectorMaker(selectors.characterEditItem))){
                const characterName = e.target.querySelector(classSelectorMaker(selectors.characterEditName)).innerHTML
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