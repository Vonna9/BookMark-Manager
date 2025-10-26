// main bookmark logic
chrome.bookmars.getTree((bookmarkTreeItems) =>) {
    const bookmarks = [];
}
chrome.bookmarks.create({
    id: "Organize Folder",
    title: "Organize Folder",
    contexts: ["select"],
    onclick: (info, bookmark) => {
        console.log('')
    }
    
});
chrome.contextMenus.onClicked.addListener((info, bookmark)) => {
    if(info.menuItemID == "organize folder") {
      
    }
});