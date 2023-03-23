const openRequests = new Map()

// We need to create a listener that waits for the contentscript
// to send a message and do something with it. The message argument
// is the same variable that was sent from the contentscript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check that we're asking for a grammar correction
  if (message.type === 'grammar') {
    // We can now chat with brainbox. The brainbox API returns a chatId
    // reference once the request has been accepted. The actual response
    // is then streamed through the chrome.brainbox.onChatStream event
    // shortly after.
    //
    // We need to store this chatId variable and also the sendResponse
    // variable so that once the response is completed we can reply
    // to the contentscript
    chrome.brainbox.chat(
      // This is the prompt that customizes how Brainbox replies
      'You are a grammar correcting assistant. You should take the users message and reply only with a corrected version',
      // This is users message
      message.text
    ).then((chatId) => {
      // chrome.brainbox.chat is asynchronous so it doesn't return a reply right
      // away. We can either use...
      // - await chrome.brainbox.chat(...) to wait for the reply
      // - chrome.brainbox.chat(...).then() to bind a function that's executed on reply
      //
      // In our example, we need to return true to the listener immediately
      // so we can bind using .then() to do this

      // Store the chatId, callback and content in the openRequests variable
      openRequests.set(chatId, { callback: sendResponse, content: '' })
    })
  }

  // Returning true, tells the listener that we'll send the response
  // using the sendResponse() function at a later date
  return true
})

// This is the listener that waits for brainbox to stream chat messages
chrome.brainbox.onChatStream.addListener((chatId, type, content) => {
  if (openRequests.has(chatId)) {
    const request = openRequests.get(chatId)
    switch(type) {
      // When we get a stream message we can just append the content
      // to the existing content we have stored
      case 'stream':
        request.content += content;
        break
      // When brainbox sends an end command, we can execute the callback
      // to the contentscript with the entire message
      case 'end':
        request.callback(request.content)
        openRequests.delete(chatId)
        break
    }
  }
})