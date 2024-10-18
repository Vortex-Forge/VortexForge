const { ipcRenderer } = require('electron')
const { getFps } = require('./statsLogic')

const stats = () => {
  function updateFps() {
    getFps()
  }
  updateFps()
}

const addStatsDiv = () => {
  try {
    console.log('adding stats div')
    const div = document.createElement('div')
    div.innerHTML = `
    <div id="stats" style="position: fixed; top: 0; right: 0; color: white; padding: 0.5em; z-index:100;background-color: rgba(0, 0, 0, 0.7);">
      <div style="color:red; font-size:2vw;font-family: Protest Guerrilla, sans-serif;">
      FPS: <span id="fps">0</span>
      </div>
      <div style="color:#5dc9ff; font-size:2vw;font-family: Protest Guerrilla, sans-serif;display:flex;align-items:flex-start">
      Memory: <span id="memory">N/A</span>
      <span style="font-size:0.5rem">MB</span> 
      </div>
      <div style="color:#ceff5d; font-size:2vw;font-family: Protest Guerrilla, sans-serif;">Ping: <span id="ping">N/A</span> </div>
    </div>
  `
    document.body.appendChild(div)
    createIpcChannels()
    console.log('Ipc channels created')
  } catch (e) {
    console.error(e)
  }
}
const createIpcChannels = () => {
  ipcRenderer.on('memory', (event, data) => {
    document.getElementById('memory').innerHTML = data
  })
}
function addFontLinks() {
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Protest+Guerrilla&display=swap'
    }
  ]

  links.forEach((linkData) => {
    const link = document.createElement('link')
    Object.keys(linkData).forEach((key) => {
      link.setAttribute(key, linkData[key])
    })
    document.head.appendChild(link)
    console.log(`Link added: ${link.outerHTML}`)
  })
}
module.exports = {
  stats,
  addStatsDiv,
  addFontLinks
}
