chrome.contextMenus.onClicked.addListener(genericOnClick);
chrome.contextMenus.create({
    title: 'radio'
    type: 'radio'
    id:'radio'
})