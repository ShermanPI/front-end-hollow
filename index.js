import { selectors } from "./utils/selectors.js";
import { changeForms } from "./UI/activate-form.js";
import { burgerMenu } from "./UI/burger-menu.js";
import { markAsFavorite } from "./UI/favorite-btn.js";
import { navigatePages } from "./UI/page-navigation.js";
import { makeThemBlink } from "./UI/blinking-arrows.js";
import { scrollsBtn } from "./UI/scroll-btn.js";
import { resizeItemToHeight } from "./UI/resize-elem-height.js";
import { bckChanger } from "./UI/background-changer.js";
import { controlPlaylist } from "./UI/playlist.js";
import { minigameExplodeParticles } from "./UI/minigame-particles.js"
import { formUtils } from "./UI/forms.js";
import { getCSRFToken } from "./UI/set-CSRF-token.js";
import { firstLoadUser } from "./UI/first-load-user.js";


window.addEventListener("DOMContentLoaded", ()=>{
    getCSRFToken() // ✅ - (using fetch)
    firstLoadUser() // ✅
    formUtils() // ✅ (using fetch)
    navigatePages(selectors.leftFullArrow, selectors.rightFullArrow)
    changeForms(selectors.editFormBtn, selectors.addFormBtn, selectors.editForm, selectors.addForm);
    burgerMenu(selectors.menuBtn, selectors.menu)
    markAsFavorite(selectors.favoriteIcon)
    makeThemBlink()
    resizeItemToHeight(selectors.favoritesListContainer, selectors.header, selectors.profileControlPanel, selectors.favoritesTitle)
    scrollsBtn()
    bckChanger()
    controlPlaylist()
    minigameExplodeParticles()
})

