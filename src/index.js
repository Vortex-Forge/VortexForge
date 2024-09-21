const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const fs = require('fs')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}
const createWindow = () => {
  const win = new BrowserWindow({
    show: true,
    // icon: "icon/logoicon.ico",
    title: 'Tremor DSC',
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
    win.setTitle('Tremor DSC')
    win.webContents.send('status', true)
  })

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

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
