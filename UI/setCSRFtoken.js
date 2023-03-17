const d = document

export const getCSRFToken = ()=>{
    const $forms = d.querySelectorAll("form")

    fetch("http://127.0.0.1:5000/csrf_token")
        .then(jsonRes=> jsonRes.json())
        .then(res =>{
            $forms.forEach(el =>{
                console.log(el)
                console.log(res)
                const csrfInput = d.createElement("input")
                
                csrfInput.id = "csrf_token"
                csrfInput.name = "csrf_token"
                csrfInput.type = "hidden"
                csrfInput.value = res.csrfToken

                
                el.appendChild(csrfInput)
            })
        })
        .catch(error=> console.log(error))
}