import { selectors } from "../utils/selectors.js";
import { globalVariables } from "../utils/global-variables.js";
import { fetchFromApi, create, append } from "../utils/dom-functions.js";

export const getCSRFToken = ()=>{
    fetchFromApi(globalVariables.csrf_tokenEndpoint)
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

}