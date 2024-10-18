// this file contains logic for calculating varoius stats

const ping_get = require('ping')

let frameCount = 0
let lastFrameTime = performance.now()

function getFps() {
  const now = performance.now()
  frameCount++
  let fps = null

  if (now >= lastFrameTime + 1000) {
    fps = frameCount
    frameCount = 0
    lastFrameTime = now
    document.getElementById('fps').innerText = fps
  }
  requestAnimationFrame(getFps)
}

function getMemory() {
  let memory = 'N/A'
  if (performance.memory) {
    memory = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)
  }
  document.getElementById('memory').innerText = memory
  return memory
}

function getPing() {
  setInterval(() => {
    const host = 'deadshot.io'

    ping_get.promise
      .probe(host)
      .then((res) => {
        if (res.alive) {
          document.getElementById('ping').innerText = res.time.toFixed(0)
        } else {
          console.log('ping error: offline')
        }
      })
      .catch((err) => console.error(err))
  }, 1000)
}
module.exports = {
  getFps,
  getMemory,
  getPing
}
