Array.from(document.querySelectorAll('a')).forEach(($el) => {
  $el.addEventListener('click', (evt) => {
    evt.preventDefault()
    const url = new URL($el.href, window.location.href).toString()
    chrome.runtime.sendMessage({ type: 'open-url', url: url })
  })
})