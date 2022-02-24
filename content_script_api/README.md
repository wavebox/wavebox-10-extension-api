# Unread badges & notifications

This API allows you to change unread badges and add notifications for apps running in Wavebox. This API is only available within a page, running as a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/).

You can use `chrome.runtime.sendMessage` to communicate with Wavebox, or you can use the [wrapper API](wavebox_content_script.js) that provides access to all methods. Include `wavebox_content_script.js` in your extension and use the following calls...

## API

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

## Quick example

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

## Examples

Examples can be found in the examples folder:

* **Facebook Badge** [Example](/examples/facebook_badge_content_script)
