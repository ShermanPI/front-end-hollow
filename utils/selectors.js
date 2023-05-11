import {globalVariables} from './global-variables.js'

class ElemToResize {
    constructor(name, elementsToRestlist) {
        this.name = name;
        this.elementsToRest = elementsToRestlist;
    }
}

export const selectors = Object.freeze({

    characterInfo: new ElemToResize('.character-full-info', ['.section-header', '.item-list']),
    profileContainer: new ElemToResize('.profile-container', ['.section-header']),
    adminContainer: new ElemToResize('.admin-container', ['.section-header']),

    favoriteIcon: '.favorite-icon img',


    allForms: globalVariables.d.querySelectorAll('form'), 
    adminOption: 'admin-option',
    unloggedScreen: 'unlogged-screen',
    adminOptionHidden: 'admin-option-hidden',
    signUpForm: 'sign-up-form',
    loginForm: 'login-form',
    addCharacterForm: 'add-character-form',
    editCharacterForm: 'edit-character-form',
    registerFormContainer: 'register-form-container',
    loginFormContainer: 'login-form-container',
    characterEditList: 'character-edit-list',
    hideForm: 'hide-form',
    errorField: 'error-field',
    error: 'error',
    characterEditItem: 'character-edit-item',
    characterEditImg: 'character-edit-img',
    characterEditName: 'character-edit-name',
    signUpBtn: 'signUp-btn',
    createAccountSpan: 'create-account-span',
    registerAnchor: 'register-anchor',
    signupUnloggedBtn: 'signup-unlogged-btn',
    loginBtn: 'login-btn',
    loginSpan: 'login-span',
    loginAnchor: 'login-anchor',
    loginUnloggedBtn: 'login-unlogged-btn',
    hideEditList: 'hide-edit-list',
    leftFullArrow: 'left-full-arrow',
    rightFullArrow: 'right-full-arrow',
    sectionContainer: 'section-container',
    nextPageIndicator: 'next-page',
    prevPageIndicator: 'prev-page',
    actualPage: 'actual-page',
    pageMenuAnchor: 'page-menu-anchor',
    menuItemSelected: 'menu-item-selected',
    editFormBtn: 'edit-form-btn',
    addFormBtn: 'add-form-btn',
    editForm: 'edit-form',
    addForm: 'add-form',
    btnActivated: 'btn-activated',
    menuBtn: 'burger-icon',
    menu: 'menu',
    hideMenu: 'hide-menu',
    openMenu: 'open',
    mobileArrow: 'mobile-arrow',
    favoritesListContainer: 'favorite-list-container',
    header: 'section-header',
    profileControlPanel: 'profile-control-panel',
    favoritesTitle: 'favorite-title',
    scrollBtn: 'scroll-btn',
    hideScrollBtn: 'hide-scroll-btn',
    generalBackgroundImg: 'general-background img',
    backgroundName: 'background-name',
    previousBckBtnImg: 'previous-bck-btn img',
    nextBckBtnImg: 'next-bck-btn img',
    playlistBtn: 'playlist-btn',
    soundBtn: 'sound-btn',
    songName: 'song-name',
    volumeBar: 'volume-bar',
    prevSong: 'prev-song',
    nextSong: 'next-song',
    itemToClick: 'item-to-click',
    particles: 'particles',
    flashAlert: 'flash-alert',
    flashAlertIconContainer: 'flash-alert-icon-container',
    flashAlertMessage: 'flash-alert-message',
    body: 'body',
    pageOverlay: 'page-overlay',
    alertcontainer: 'alert-container',
    alertTitle: 'alert-title',
    alertMsg: 'alert-msg',
    alertOkBtn: 'alert-ok-btn',
    confirmBtnContainer: 'confirm-btn-container',
    pfpPicContainer: 'pfp-pic-container',
    profilePic: 'profile-pic',
    lockedPfp: 'locked-pfp',
    changePfpText: 'change-pfp-text',
    editProfileIcon: 'edit-profile-icon',
    editProfileContainer: 'edit-profile-container',
    pfpPreview: 'pfp-preview',
    saveProfileChanges: 'save-profile-changes',
    userPfp: 'user-pfp',
    closeIcon: 'close-icon',
    pfpsGrid: 'pfps-grid',
    editUsername: 'edit-username',
    userUsername: 'user-username',
    profilePicNotification: 'profile-pic-notification',
    pfpInUseText: 'pfp-in-use-text',
    pfpInUse: 'pfp-in-use',
    pfpInUseBorder: 'pfp-in-use-border',
    pfpPicSelected: 'pfp-pic-selected',
    hideNotification: 'hide-notification',
    hideEditProfile: 'hide-edit-profile',
    exitRegisterFormIconImg: 'exit-register-form-icon img',
    sessionFormContainer: 'session-form-container', 
    item: 'item',
    listBorder: 'list-border',
    characterImg: 'character-img',
    homeList: 'home-list',
    actualItemHeight: 'actual-item-height',
    characterName: 'character-name',
    characterFullImg: 'character-full-img',
    homeFavoriteIcon: 'home-favorite-icon',
    infoDivisorImg: 'info-divisor-img',
    characterTextInfo: 'character-text-info',
    charactermoreText: 'character-more-text',
    itemListItem: 'item-list > .item',
    selectedItem: 'selected-item',
    navigateItemUpArrow: 'navigate-item-up',
    navigateItemdownArrow: 'navigate-item-down',
    homeListItemSelected: '#home-list > .selected-item',
    homeFavoriteIconImg: 'home-favorite-icon img',
    favoriteItem: 'favorite-item',
    itemInfo: 'item-info',
    favoriteIcon: 'favorite-icon',
    noItemsReady: 'no-items-ready',
    favoriteItemList: 'favorite-item-list',
    profile: 'profile',
    profileFavoriteItemsItem: 'profile-favorite-items .favorite-item',
    loadingContainer: 'loading-container',
    loggedIn: 'logged-in',
    gameIconImg: 'game-icon img',
    actualScore: 'actual-score',
    highScore: 'high-score',
    gameTime: 'game-time',
    playBtn: 'play-btn',
    restartBtn: 'restart-btn',
    miniGame: 'mini-game',
    multiplierTxt: 'multiplier-txt',
    actualMultiplier: 'actual-multiplier',
    timeSum: 'time-sum',
    iconContainer: 'icon-container',
    hideMultiplier: 'hide-multiplier',
    littleTime: 'little-time',
    hideMultiplierTxt: 'hide-multiplier-txt',
    loggedOut: 'logged-out',
    logOutBtn: 'log-out-btn',
    menuAnchor: 'menu-anchor',
    characterEditingNameField: 'characterEditingName',
    characterEditingContainer: 'characterEditingContainer',
    deleteCharacterBtn: 'delete-character-btn',
    homeListItem: '#home-list .item'


});
