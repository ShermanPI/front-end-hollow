const d = document,
    w = window;

export function changeForms(editFormBtn, addFormBtn, editForm, addForm){
    const $editFormBtn = d.querySelector(editFormBtn),
        $addFormBtn = d.querySelector(addFormBtn), 
        $editForm = d.querySelector(editForm),
        $addForm = d.querySelector(addForm)

    d.addEventListener("click", (e)=>{
        if(e.target == $editFormBtn){
            $editFormBtn.classList.add("btn-activated");
            $editForm.classList.remove("hide-form");
            
            $addForm.classList.add("hide-form");
            $addFormBtn.classList.remove("btn-activated");
        }
        if(e.target == $addFormBtn){
            $addFormBtn.classList.add("btn-activated");
            $addForm.classList.remove("hide-form");
            
            $editForm.classList.add("hide-form");
            $editFormBtn.classList.remove("btn-activated");
        }

    })
    
}