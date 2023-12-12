import { sendMessage, onMessage } from 'webext-bridge/background';
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

chrome.tabs.onActivated.addListener( activeInfo=> {

    // (async()=>{
    //     const tabUrl = await syncGetnActivatedTabUrl(activeInfo.tabId);
    //     console.log(tabUrl);
    //     // 判断 tabUrl 中是否包含 .ylands.ied.com 

    //     if (tabUrl.includes('.ylands.ied.com')) {
    //         await sendMessage('isTargetPage', {"showDialog":true}, `content-script@${activeInfo.tabId}`);
    //         console.log('send message to content script',true);
    //     } else {
    //         await sendMessage('isTargetPage', {"showDialog":false}, `content-script@${activeInfo.tabId}`);
    //         console.log('send message to content script',false);
    //     }
    // })();
    
});

function syncGetnActivatedTabUrl(tabId) {
    return new Promise((resolve, reject) => {
        chrome.tabs.get(tabId, (tab) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(tab.url);
            }
        });
    });
}