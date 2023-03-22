chrome.runtime.onMessage.addListener(async (payload, sender)=>{
  console.log(payload);
  if (payload.type === "setBadge") {
    // Check if my message is from an app
    const {isApp} = await chrome.waveboxApps.getInfo(sender.tab.id);
    if (isApp) {
      if (!isNaN(parseInt(payload.count))) {
        await chrome.waveboxApps.setBadge(sender.tab.id, {count: parseInt(payload.count), activity: false});
      }
    }
  }
})