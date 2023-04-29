import { selectors } from "../utils/selectors.js";
import { globalVariables } from "../utils/global-variables.js";
import { fetchFromApi, create, append } from "../utils/dom-functions.js";

export const getCSRFToken = ()=>{
    fetch("http://127.0.0.1:5000/csrf_token",{
        method: 'GET',
        credentials: 'include'
      })
    .then(jsonRes=> jsonRes.json())
    .then(response =>{
        selectors.allForms.forEach(el =>{
            const csrfInput = create("input")
            csrfInput.id = response.csrfToken,
            csrfInput.name = "csrf_token"
            csrfInput.type = "hidden"
            csrfInput.value = response.csrfToken
            append(el, csrfInput)
        })
    })
    .catch(error=> console.error(error))

}