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

chrome.tabs.onUpdated.addListener(function (details) {
    // 获取当前tabId与url
    const { tabId, url } = details;
    // 判断页面是否为适配所有域名以“.ylands.ied.com”结尾的网页,如果是，则向content script发送 isTargetPage，data为1， destination为background 的消息，否则发送0
    if (url && url.endsWith('.ylands.ied.com')) {
        sendMessage(tabId, 'isTargetPage', 1, 'background');
    } else {
        sendMessage(tabId, 'isTargetPage', 0, 'background');
    }
});