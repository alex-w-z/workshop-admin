/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
  // The default is to disable Page Action first. if you don't add this sentence, the following rules won't take effect
    chrome.action.disable();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        // set rules
        let rule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: '.ylands.ied.com' },
                })
            ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        };

        const rules = [rule];
        // add rules
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});