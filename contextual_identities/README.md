Wavebox includes a compatibility layer that allows extensions that utilize the Firefox contextual identities api to interact with Wavebox cookie containers in the same way.

The full [ContextualIdentities API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/contextualIdentities) documentation is available on the Firefox website.

## Enabling

The API is still experimental and needs to be enabled on a per-extension basis. To do this, open `wavebox://extensions` in a new tab, locate the extension and open the detail view. From here contextual identities support can be enabled.

## Key differences

### Readonly mode

The API is at present read-only. This means the following calls will fail...

* `contextualIdentities.create`
* `contextualIdentities.update`
* `contextualIdentities.remove`

### Cookie store ids

The way in which Wavebox generates cookie store ids differs to Firefox. Extensions that hard code ids may need updating
