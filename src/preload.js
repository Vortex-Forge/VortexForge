// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { addStatsDiv, stats, addFontLinks } = require('./components/stats')
const { ipcRenderer, contextBridge } = require('electron')
// adBlocker (for devs only)

function blockAds() {
  setInterval(function () {
    const bannerHome1 = document.querySelector('#banner-home')
    const bannerHome2 = document.querySelector('#banner-home2')
    const bannerReswawn1 = document.querySelector('#banner-respawn-1')
    const bannerRespawn2 = document.querySelector('#banner-respawn-2')
    if (bannerHome1) {
      bannerHome1.style.display = 'none'
    }
    if (bannerHome2) {
      bannerHome2.style.display = 'none'
    }
    if (bannerReswawn1) {
      bannerReswawn1.style.display = 'none'
    }
    if (bannerRespawn2) {
      bannerRespawn2.style.display = 'none'
    }
  }, 500)
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded')
  addFontLinks()
  ipcRenderer.on('status', function (event, status) {
    console.log('status received:', status)
    if (status) {
      console.log('Electron is ready')
      try {
        blockAds()
      } catch (error) {
        console.error('Error in blockAds:', error)
      }

      // try {
      //   addStatsDiv()
      // } catch (error) {
      //   console.error('Error in addStatsDiv:', error)
      // }

      // try {
      //   console.log('running stats')
      //   stats()
      // } catch (error) {
      //   console.error('Error in stats:', error)
      // }
    }
  })
})
