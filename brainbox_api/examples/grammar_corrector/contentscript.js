// Create a listener that watches which element has focus. We can't check
// this immediately on button click because clicking on the button changes
// focus to the button itself.
//
// The focusin event on the document fires every time an element gains
// focus in a page. We can check the elements type and store the last
// text area or input field that had focus
let lastFocusedElement
document.addEventListener('focusin', () => {
  const element = document.activeElement
  // Check the element is a <textarea> or <input> element
  switch (element.tagName) {
    case 'TEXTAREA':
      lastFocusedElement = element
      break
    case 'INPUT': {
      if (lastFocusedElement.type === 'text') {
        lastFocusedElement = element
      }
      break
    }
  }
}, true)

// Create a button that will appear in the bottom-right of every page.
// We create some styles in JavaScript here, but normally we would use
// a stylesheet
const button = document.createElement('button')
button.style.position = 'fixed'
button.style.bottom = '0px'
button.style.right = '0px'
button.style.zIndex = 1000
button.textContent = 'Check grammar'
document.body.appendChild(button)

// Add a click listener to the button so we can run an action when clicked
button.addEventListener('click', async () => {
  // Check we have a focused element and it has some text inside it
  if (!lastFocusedElement) { return }
  const element = lastFocusedElement
  const inputText = element.value
  if (!inputText) { return }
  
  // We can't access brainbox API calls directly from a contentscript,
  // so we have to message our background page to do some of the processing.
  //
  // To do this, we can use chrome.runtime.sendMessage, and give it some
  // arguments. This will return the grammar correct
  const correctedText = await chrome.runtime.sendMessage({
    type: 'grammar',
    text: inputText
  })

  // Set the grammar correction back into the original text field
  element.value = correctedText
})

