The Wavebox extension API is a set of additional functions that allow you to interface with Wavebox features. You can use it to:

* Show an unread badge and activity on a specific service
* Show information in the tray about unread items on a page

# Getting Started

### Supported versions
Unless otherwise noted all functions are supported in Wavebox 10.0.31+

### Getting started

Wavebox uses the same extension ecosystem as Google Chrome, so we strongly recommend taking a look at the [Chrome Extension API](https://developer.chrome.com/extensions/api_index) and [Getting Started guides](https://developer.chrome.com/extensions/getstarted). 

Once you've got your Chrome extension up and running in Wavebox, you can use the `chrome.runtime.sendMessage` API to communicate with Wavebox. For ease of use, there's a wrapper API that provides access to all methods. Simply include `wavebox.js` in your extension and use the following calls.

### Quick example

A simple example of how you can update the badge count, activity and tray messages from within a contentscript. For complete examples check out the [examples folder](/examples)

```js
const permission = await window.wavebox.requestPermission()
if (permission === 'ALLOWED') {
  const isApp = await window.wavebox.isApp()
  if (isApp) {
    await window.wavebox.setBadgeCount(100)
    await window.wavebox.setBadgeHasUnreadActivity(false)
    await window.wavebox.setTrayMessages([
      {
        id: 'message_id_1',
        title: 'A message 1',
        subtitle: `Some more information`,
        date: Date.now()
      },
      {
        id: 'message_id_2',
        title: 'A message 2',
        subtitle: `Some more information`,
        date: Date.now()
      }
    ])
  }
}
  
```

# API

#### async wavebox.getPermission
Checks if the extension has permission to interface with Wavebox without showing a user prompt

* **Returns**  one of DEFAULT, ALLOWED, DENIED

```js
await window.wavebox.getPermission()
```

#### async wavebox.requestPermission
Requests permission to interface with Wavebox by prompting the user. If the extension already has permission, returns immeditately

* **Returns**  one of DEFAULT, ALLOWED, DENIED

```js
await window.wavebox.requestPermission()
```

#### async wavebox.isApp
Checks if the current tab is running inside a Wavebox app

* **Returns**  true if we're running within a Wavebox app, false otherwise

```js
await window.window.wavebox.isApp()
```


#### async wavebox.setBadgeCount
Sets the unread count on the service for the current tab

* **count (int)** the count to display

```js
await window.wavebox.setBadgeCount(10)
```

#### async wavebox.setBadgeHasUnreadActivity
Sets if the app running for the current tab has unread activity

* **has (bool)** true to show the activity indicator, false to hide

```js
await window.wavebox.setBadgeHasUnreadActivity(true)
```

#### async wavebox.setTrayMessages
Sets the list of messages in the tray for the current app

* **messages (array)** an array of messages to display to the user

Each message item provided should validate as so:

* **id=auto (string:max=100)** a unique id for this message. Providing this helps improve performance
* **title (string:max=100)** title text to display to the user.**subtitle (string:max=100)** subtitle text to display to the user
* **date=auto (int)** epoch time of the message which can be used for ordering. Will also support incrementing numbers for ordering

```js
await window.wavebox.setTrayMessages([
	{
		id: 'message_id_1',
		title: 'Joe Bloggs',
		subtitle: 'You have a message',
		date: 1516022635099
	}
])
```


# Examples

Examples can be found in the examples folder:

* **Facebook Badge** [Example](/examples/facebook_badge)
