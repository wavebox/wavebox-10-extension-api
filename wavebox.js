const CHANNEL_ID = 'ckimpoegidoklmlkmkccfmbdmfigmgfm'

const standardMessageResolver = function (resolve, reject, response) {
  if (!response) {
    reject(new Error('Invalid API response'))
    return
  }
  const [ error, retValue ] = response
  error ? reject(new Error(error)) : resolve(retValue)
}

class Wavebox {
  /* ****************************************************************************/
  // Permissions
  /* ****************************************************************************/

  /**
   * Checks if the extension has permission to interface with Wavebox without
   * showing a user prompt
   * @return one of DEFAULT, ALLOWED, DENIED
   */
  async getPermission () {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'extension:hasPermission' }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }

  /**
   * Requests permission to interface with Wavebox by prompting the user. If
   * the extension already has permission, returns true immeditately
   * @return one of DEFAULT, ALLOWED, DENIED
   */
  async requestPermission () {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'extension:requestPermission' }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }

  /* ****************************************************************************/
  // App
  /* ****************************************************************************/

  /**
   * Checks if we're running inside an app
   * @return true if we're running within a Wavebox app, false otherwise
   */
  async isApp () {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'extension:isApp' }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }

  /* ****************************************************************************/
  // Badges & counts
  /* ****************************************************************************/

  /**
   * Sets the badge count
   * @param count: the badge count to set
   */
  async setBadgeCount (count) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'badge:setCount', args: [parseInt(count)] }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }

  /**
   * Sets whether the badge has unread activity
   * @param hasActivity: true to set activity, false otherwise
   */
  async setBadgeHasUnreadActivity (hasActivity) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'badge:setHasUnreadActivity', args: [Boolean(hasActivity)] }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }

  /**
   * Sets the tray messages
   * @param messages: an array of messages
   */
  async setTrayMessages (messages) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(CHANNEL_ID, { type: 'tray:setMessages', args: [messages] }, (response) => {
        standardMessageResolver(resolve, reject, response)
      })
    })
  }
}

window.wavebox = new Wavebox()