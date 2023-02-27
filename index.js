import { selectors } from "./utils/dom-selectors.js";
import { changeForms } from "./UI/activate-form.js";
import { burgerMenu } from "./UI/burger-menu.js";
import { homeNavigation } from "./UI/home-navigation.js";
import { markAsFavorite } from "./UI/favorite-btn.js";
import { navigatePages } from "./UI/page-navigation.js";
import { makeThemBlink } from "./UI/blinking-arrows.js";
import { scrollsBtn } from "./UI/scroll-btn.js";
import { resizeItemToHeight } from "./UI/resize-elem-height.js";
import { bckChanger } from "./UI/background-changer.js";
import { controlPlaylist } from "./UI/playlist.js";
import { miniGameScore } from "./UI/mini-game.js";
import {minigameExplodeParticles} from "./UI/minigame-particles.js"
import { editProfile } from "./UI/edit_profile.js";
import { customAlert } from "./UI/custom_alerts.js";

window.addEventListener("DOMContentLoaded", (e)=>{
    homeNavigation()
    navigatePages(selectors.leftFullArrow, selectors.rightFullArrow)
    changeForms(selectors.editFormBtn, selectors.addFormBtn, selectors.editForm, selectors.addForm);
    burgerMenu(selectors.menuBtn, selectors.menu)
    markAsFavorite(selectors.favoriteIcon)
    makeThemBlink()
    resizeItemToHeight(selectors.favoritesListContainer, selectors.header, selectors.profileControlPanel, selectors.favoritesTitle)
    scrollsBtn()
    bckChanger()
    controlPlaylist()
    miniGameScore()
    editProfile(customAlert)
    minigameExplodeParticles()
})