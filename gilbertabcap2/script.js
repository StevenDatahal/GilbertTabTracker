var tabLimit = 8; // Max Tabs
 
// on new tab
chrome.tabs.onCreated.addListener(function(tab){
    checkTabs(tab.id); // check tabs and pass the id of the new tab so we know which one to remove if we've gone over the limit
});
 
// on tab attached (dragged from another window)
chrome.tabs.onAttached.addListener(function(tabId, attachInfo){
    checkTabs(tabId);
});
 
// on tab replaced (safety precaution)
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){
    checkTabs(tabId);
});
 
checkTabs(); // first run, no new tab to specify
 
function checkTabs(tabId = false) {
    chrome.tabs.query({}, function(tabs){ // get tab info
        if (tabs.length>tabLimit) { // we're over the limit
            if (!tabId) { // no tabId specified, but we're over the limit, so get the id of the last tab in the array
                tabId = tabs[tabs.length-1].id;
            }
            chrome.tabs.remove(tabId); // remove the extra tab
            alert("You are limited to 8 chrome tabs on this device."); // Alert user (student gets annoyed) 
        }
    });
}
