import { selectors } from "../utils/selectors.js";


export const getCSRFToken = ()=>{
    fetch("http://127.0.0.1:5000/csrf_token",{
        method: 'GET',
        credentials: 'include'
      })
        .then(jsonRes=> jsonRes.json())
        .then(res =>{
            selectors.allForms.forEach(el =>{
                const csrfInput = document.createElement("input")
                csrfInput.id = "csrf_token"
                csrfInput.name = "csrf_token"
                csrfInput.type = "hidden"
                csrfInput.value = res.csrfToken
                el.appendChild(csrfInput)
            })
        })
        .catch(error=> console.error(error))
}