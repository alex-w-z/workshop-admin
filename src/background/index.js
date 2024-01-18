import { sendMessage, onMessage } from 'webext-bridge/background';
/*global chrome*/
import {  apiRequest } from '@/api';
// chrome.runtime.onInstalled.addListener(() => {
//   // The default is to disable Page Action first. if you don't add this sentence, the following rules won't take effect
//     chrome.action.disable();
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//         // set rules
//         let rule = {
//             conditions: [
//                 new chrome.declarativeContent.PageStateMatcher({
//                     pageUrl: { hostSuffix: '.ylands.ied.com' },
//                 })
//             ],
//             actions: [ new chrome.declarativeContent.ShowPageAction() ]
//         };

//         const rules = [rule];
//         // add rules
//         chrome.declarativeContent.onPageChanged.addRules(rules);
//     });
// });

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const {contentRequest } = request;
        // 接受来自content的api请求
        if (contentRequest === 'apiRequest') {
            let {config} = request;
            config.success = (data) => {
                data.result = 'succ';
                sendResponse(data);
            }

            //API请求失败的回调
            config.fail = (msg) => {
                sendResponse({result: 'fail', msg});
            }

            // 发起请求
            apiRequest(config);
        }
    });
    return true;
});