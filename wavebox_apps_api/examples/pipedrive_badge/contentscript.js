let prevText = '';

setInterval(() => {
  const element = document.querySelector('.cui5-pill__label');
  if (element) {
    const currText = element.textContent;
    if (currText !== prevText) {
      console.log('Text changed to:', currText);
      // Do something here when the text changes
      chrome.runtime.sendMessage({type: "setBadge", count: currText});
      prevText = currText;
    }
  }
}, 5000);