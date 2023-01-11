class ElemToResize {
    constructor(name, elementsToRestlist) {
        this.name = name;
        this.elementsToRest = elementsToRestlist;
    }
}

export const selectors = {

    characterInfo: new ElemToResize(".character-full-info", [".section-header", ".item-list"]),

    profileContainer: new ElemToResize(".profile-container", [".section-header"]),
    
    adminContainer: new ElemToResize(".admin-container", [".section-header"]),

    addFormBtn: ".add-form-btn",
    editFormBtn: ".edit-form-btn",
    editForm: ".edit-form",
    addForm: ".add-form",
    menuBtn: ".burger-btn img",
    menu: ".menu"
};
