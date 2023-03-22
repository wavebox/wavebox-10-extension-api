# Permissions

The brainbox api requires the `brainbox` permission in the [manifest](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)

# Types

## ChatMessageRole

_enum_ `"user", "system", "assistant"`

The role indicates the source or purpose of the ChatMessage. i.e. user is a message from the user, system is a message to configure Brainbox

## ChatMessage

_object_ `{ "role": ChatMessageRole, "content": "..." }`

A single chat message. The role indicates the source or purpose of the message and the content is the text content contained within the message

## ChatStreamType

_enum_ `"stream", "end", "error"`

The type of stream message

# Events

## brainbox.onChatStream

An event that's emitted when Brainbox streams parts of the message back to the API. The stream messages indicate parts of the content that Brainbox is replying with, until the API returns end or error.

* `chatId [string]` the id of the chat. This can be used to tie the stream messages back to the original request
* `type [ChatStreamType]` the type of message that's being returned. Typically events will emit multiple `stream` types followed by a single `end` or `error` message
* `content [string]` the partial of the message content


# Methods

## brainox.chat
Initiate a chat with Brainbox.

* `system [string]` the system message, used to configure Brainbox
* `user [string]` the users message
* `messageHistory [ChatMessage[] Optional]` ab array of previous chat messages to include in the conversation. This can provide more context to Brainbox. Some messages may be truncated to remain within quota limits

**Returns** `chatId [string]`. Replies are streamed back through the API. Use the provided chatId alongside the `brainbox.onChatStream` event to buffer and build the complete reply.


# Examples

Examples can be found in the examples folder:

* **Talk like a pirate** [Example](examples/talk_like_a_pirate). A simple example tells a pirate themed joke in the background page
