# Permissions

The brainbox api requires the `waveboxApps` permission in the [manifest](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)

# Types

## AppInfo

_object_ with the following properties

* `isApp [boolean]` true if the tab is an app, false otherwise
* `uid [string Optional]` the unique id of this app type
* `url [string Optional]` the base url for the app
* `name [string Optional]` the name of this app

## BadgeInfo

_object_ with the following properties

* `count [number]` the number of unread items
* `activity [boolean]` true if there is unread activity

## BadgeUpdate

_object_ with the following properties

* `count [number Optional]` the number of unread items
* `activity [boolean Optional]` true if there is unread activity, false otherwise


## TrayMessage

_object_ with the following properties

* `id [string Optional]` a unique id for the message
* `text [string]` the tray message text
* `subtitle [string Optional]` optional extended subtitle text
* `date [number Optional]` the epoch time of the message

# Methods

## waveboxApps.getInfo
Checks if a tab is a Wavebox app and returns information about it

* `tabId [int Optional]` the id of the tab to get the app info for. If none is provided, the current tab is used

**Returns** `appInfo [AppInfo]` the information about the app

## waveboxApps.getBadge
Gets the current badge information for the tapp

* `tabId [int Optional]` the id of the tab to get the badge info from. If none is provided, the current tab is used

**Returns** `badgeInfo [BadgeInfo]` the badge information

## waveboxApps.getTrayMessages
Gets the current tray messages for the app

* `tabId [int Optional]` the id of the tab to get the tray info from. If none is provided, the current tab is used

**Returns** `messages [TrayMessage[]]` an array of tray messages

## waveboxApps.setBadge
Updates the badge for an app

* `tabId [int Optional]` the id of the tab to set the badge info for. If none is provided, the current tab is used
* `updateProperties [BadgeUpdate]` the update to make to the badge

## waveboxApps.setTrayMessages
Sets the tray messages for an app. Only 10 messages can be set, sending more than 10 will slice the list

* `tabId [int Optional]` the id of the tab to set the message for. If none is provided, the current tab is used
* `messages [TrayMessage[]]` the list of tray messages to set


# Examples

Examples can be found in the examples folder:

* **Set the badge count** [Example](examples/pipedrive_badge). Takes the badge count from the PipeDrive UI, forwards this to the background page and sets it on the app