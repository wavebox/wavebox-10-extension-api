For full reference, see the [Tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/). This page documents the additions that Wavebox supports

# Types

## DockedMode

_enum_ `"undocked", "group", "window", "waveboxGroup"`

To enter split-screen mode, one tab needs to take a docked mode. This becomes the primary tab in the split,
a secondary tab will be calculated to take the position of the secondary tab in the split. Each docked mode
has a different behaviour

* `undocked`: the tab is not in split-screen
* `group`: this tab is the primary tab, within a Chromium [tabGroup](https://developer.chrome.com/docs/extensions/reference/tabGroups/)
* `window`: this tab is the primary tab, within a window
* `waveboxGroup`: this tab is the primary tab, within a Wavebox Group

## DockedPosition

_enum_ `"left", "right", "top", "bottom", "overlay"`

The position of the tab when using split-screen. This can only be set when the tab also has a `dockedMode` other than `undocked`. Left makes this tab take the left position, top the top position and so forth

## DockedBound

_object of integers_ `{ lead, top, left, right, bottom }`

The position of the split-screen split in the window. The value of each represents the absolute position from the edge of the window. Setting the value to `-1` indicates 50% of the window size.

When the `dockedPosition` is set to `overlay`, top, left, right & bottom will be set. Otherwise you lead will be set.

## DockedValidLocation

_enum_ `"any", "primaryOnly", "secondaryOnly"`

The valid location a tab can appear in the window, either as the primary docked item or the secondary docked item.

## Tab

Everything in the base [tab type](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab)

* `dockedMode [DockedMode]` The docked mode of the tab
* `dockedPosition [DockedPosition]` The docked position of the tab
* `dockedBound [DockedBound]` The docked bound of the tab
* `dockedWaveboxGroupId [string]` The id of the Wavebox group to be used when `dockedMode` is set to `waveboxGroup`.
* `dockedValidLocation [DockedValidLocation]` The valid location this tab can appear in the window, either as the primary docked item or the secondary docked item.
* `dockedPrimary [boolean]` Whether the tab is in the primary docked/split-screen position. When true, indicates that this tab is visible in the window in the docked position.
* `dockedSecondary [boolean]` Whether the tab is in the secondary docked/split-screen position. When true, indicates that this tab is visible in the window in the docked position.

# Methods

## tabs.query

Everything in the base [tab query method](https://developer.chrome.com/docs/extensions/reference/tabs/#method-query). The queryInfo object also supports

* `dockedMode [DockedMode Optional]`
* `dockedPosition [DockedPosition Optional]`
* `dockedValidLocation [DockedValidLocation Optional]`
* `dockedWaveboxGroupId [string Optional]`
* `dockedPrimary [boolean Optional]` Only return tabs matching the docked primary position flag
* `dockedSecondary [boolean Optional]` Only return tabs matching the docked secondary position flag

## tabs.update

Everything in the base [tab update method](https://developer.chrome.com/docs/extensions/reference/tabs/#method-update). The updateProperties object also supports

* `dockedMode [DockedMode Optional]`
* `dockedPosition [DockedPosition Optional]`
* `dockedValidLocation [DockedValidLocation Optional]`

# Examples

Examples can be found in the examples folder:

* **Open in split-screen** [Example](examples/open_in_split_screen). When Wavebox.io is open in split screen, makes new pages open in the other side of the split
