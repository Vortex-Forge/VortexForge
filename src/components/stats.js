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
    <button class="show" style="display: flex; position: absolute; z-index: 999;">
       <?xml version="1.0" encoding="utf-8"?>
<svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.335 11.4069L22.2682 11.0474L21.335 11.4069ZM21.335 12.5932L20.4018 12.2337L21.335 12.5932ZM2.66492 11.4068L1.73175 11.0474L2.66492 11.4068ZM2.66492 12.5932L1.73175 12.9526L2.66492 12.5932ZM3.5981 11.7663C4.89784 8.39171 8.17084 6 12 6V4C7.31641 4 3.31889 6.92667 1.73175 11.0474L3.5981 11.7663ZM12 6C15.8291 6 19.1021 8.39172 20.4018 11.7663L22.2682 11.0474C20.681 6.92668 16.6835 4 12 4V6ZM20.4018 12.2337C19.1021 15.6083 15.8291 18 12 18V20C16.6835 20 20.681 17.0733 22.2682 12.9526L20.4018 12.2337ZM12 18C8.17084 18 4.89784 15.6083 3.5981 12.2337L1.73175 12.9526C3.31889 17.0733 7.31641 20 12 20V18ZM20.4018 11.7663C20.4597 11.9165 20.4597 12.0835 20.4018 12.2337L22.2682 12.9526C22.5043 12.3396 22.5043 11.6604 22.2682 11.0474L20.4018 11.7663ZM1.73175 11.0474C1.49567 11.6604 1.49567 12.3396 1.73175 12.9526L3.5981 12.2337C3.54022 12.0835 3.54022 11.9165 3.5981 11.7663L1.73175 11.0474Z" fill="#000000"/>
<circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> 
    </button>  
  
    <script type="text/javascript">
       const showBtn = document.querySelector('.show');
        const stats = document.querySelector('#stats');
        
        showBtn.addEventListener('click' , function() => {
            if (stats.style.display === 'flex') {
                stats.style.display = 'none';
            } else {
				stats.style.display = 'flex';
			} 
        }) 
    </script>
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
