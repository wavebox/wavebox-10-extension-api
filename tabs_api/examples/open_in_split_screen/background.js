chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'open-url') {
    const tab = sender.tab

    if (tab.dockedPrimary) {
      chrome.tabs.query({ windowId: tab.windowId, dockedSecondary: true }, (tabs) => {
        chrome.tabs.update(tabs[0].id, { url: message.url }, () => {})
      })
    } else if (tab.dockedSecondary) {
      chrome.tabs.query({ windowId: tab.windowId, dockedPrimary: true }, (tabs) => {
        chrome.tabs.update(tabs[0].id, { url: message.url }, () => {})
      })
    } else {
      chrome.tabs.update(tab.id, { url: message.url }, () => {})
    }
  }
})