const { webContents, session } = require('electron')
const path = require('path')
const fs = require('fs')
const replaceResources = (win, app) => {
  const filter = {
    urls: ['https://deadshot.io/skins/compressed/defaultar.webp']
  }

  win.webContents.session.webRequest.onBeforeRequest(
    filter,
    (details, callback) => {
      console.log(details)
      const localFilePath = path.join(
        __dirname,
        '../../swapDir/skins/compressed',
        'defaultar.webp'
      )

      // Check if the file exists
      if (fs.existsSync(localFilePath)) {
        console.log(`Redirecting to local file: ${localFilePath}`)
        const fileUrl = `file://${localFilePath}`
        console.log(`Redirect URL: ${fileUrl}`)
        callback({ redirectURL: fileUrl })
      } else {
        console.error(`File does not exist: ${localFilePath}`)
        callback({ cancel: false })
      }
    }
  )
}
module.exports = { replaceResources }
