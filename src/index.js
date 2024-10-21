const { app, BrowserWindow, ipcMain, protocol } = require('electron')
const path = require('path')
const fs = require('fs')
const { replaceResources } = require('./components/swapper')
const si = require('systeminformation')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

// let win = null;
const createWindow = () => {
  win = new BrowserWindow({
    show: true,
    // icon: "icon/logoicon.ico",
    title: 'VortexForge',
    fullscreen: true,
    webPreferences: {
      //nodeIntegration: false,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setMenuBarVisibility(false)
  win.loadURL('https://deadshot.io')
  // Ensure the title remains "Tremor DSC" after the page has loaded
  win.webContents.on('did-finish-load', () => {
    console.log('finished loading')
    win.setTitle('VortexForge')
    win.webContents.send('status', true)
  })

  // Open the DevTools.
  // win.webContents.openDevTools()
  return win
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let win = createWindow()
  console.log('App is ready, going to replace resources')

  // Register a custom protocol to serve local files
  protocol.handle('local', async (request) => {
    console.log('Inside local protocol')

    const url = request.url.substring(8) // Remove 'local://' prefix
    console.log(url, 'url')
    const localFilePath = path.join(__dirname, '../swapDir', url)
    console.log(`Serving local file: ${localFilePath}`)

    try {
      const data = await fs.promises.readFile(localFilePath)
      return new Response(data, {
        headers: { 'Content-Type': 'image/webp' }
      })
    } catch (error) {
      console.error(`Failed to read file: ${localFilePath}`, error)
      return new Response('File not found', { status: 404 })
    }
  })

  // Intercept requests and redirect to local protocol
  const filter = {
    urls: ['*://deadshot.io/skins/compressed/*.webp']
  }

  win.webContents.session.webRequest.onBeforeRequest(
    filter,
    (details, callback) => {
      const localFilePath = path.join(
        __dirname,
        '../swapDir/',
        new URL(details.url).pathname
      )
      // console.log(localFilePath, 'localFilePath')
      // Check if the file exists
      if (fs.existsSync(localFilePath)) {
        console.log('file found', localFilePath)
        const fileUrl = `local://${new URL(details.url).pathname}`
        console.log(`Redirect URL: ${fileUrl}`)
        callback({ redirectURL: fileUrl })
      } else {
        // console.error(`File does not exist: ${localFilePath}`)
        callback({ cancel: false })
      }
    }
  )

  //sending stats from the main to rendrer process
  setInterval(async () => {
    try {
      const memoryData = await process.getProcessMemoryInfo()
      const memoryUsed = Math.round(memoryData.residentSet / 1024)
      win.webContents.send('memory', memoryUsed)
    } catch (e) {
      console.error(e)
    }
  }, 1000)

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
