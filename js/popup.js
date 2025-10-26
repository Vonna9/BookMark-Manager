// pop up logic
Document.addEventListener('DOMContentLoaded', () => {
const button = document.getElementById('organizeButton');
button.addEventListener('click', function() => {
    chrome.runtime.sendMessage({action: 'organizeBookmarks'});
}