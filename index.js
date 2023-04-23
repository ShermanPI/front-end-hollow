import { selectors } from "./utils/dom-selectors.js";
import { changeForms } from "./UI/activate-form.js";
import { burgerMenu } from "./UI/burger-menu.js";
import { renderCharacterItems } from "./UI/items-render-navigation.js";
import { markAsFavorite } from "./UI/favorite-btn.js";
import { navigatePages } from "./UI/page-navigation.js";
import { makeThemBlink } from "./UI/blinking-arrows.js";
import { scrollsBtn } from "./UI/scroll-btn.js";
import { resizeItemToHeight } from "./UI/resize-elem-height.js";
import { bckChanger } from "./UI/background-changer.js";
import { controlPlaylist } from "./UI/playlist.js";
import { miniGame } from "./UI/mini-game.js";
import { minigameExplodeParticles } from "./UI/minigame-particles.js"
import { editProfile } from "./UI/edit_profile.js";
import { customAlert } from "./UI/custom_alerts.js";
import { formUtils } from "./UI/forms.js";
import { getCSRFToken } from "./UI/setCSRFtoken.js";
import { firstLoadUser } from "./UI/first-load-user.js";
import { loadScreen } from "./UI/loading-screen.js";
import { renderLogedPage } from "./UI/render-loged-page.js";
import { editCharacterForm } from "./UI/edit-character.js";

window.addEventListener("DOMContentLoaded", ()=>{
    getCSRFToken()
    firstLoadUser(renderLogedPage, loadScreen, customAlert, editProfile, miniGame, renderCharacterItems)
    formUtils(renderLogedPage, customAlert, loadScreen, editProfile, miniGame, renderCharacterItems)
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