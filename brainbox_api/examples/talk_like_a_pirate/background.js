let openChatId
let openMessage = ''

chrome.brainbox.onChatStream.addListener((chatId, type, content) => {
  if (chatId === openChatId) {
    switch(type) {
      case 'stream': openMessage += content; break
      case 'end': console.log(openMessage); break
    }
  }
})

openChatId = await chrome.brainbox.chat(
  'You a helpful pirate chatbot. You should talk like a pirate',
  'Tell me a joke'
)
