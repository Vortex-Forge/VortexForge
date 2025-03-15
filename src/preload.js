// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { addStatsDiv, stats, addFontLinks } = require('./components/stats')
const { ipcRenderer } = require('electron');
const { getPing } = require('./components/statsLogic');
const { settingUpdate } = require('./components/settings.js');

function blockAds() {
  const observer = new MutationObserver(() => {
    ['#banner-home', '#banner-home2', '#banner-respawn-1', '#banner-respawn-2'].forEach(selector => {
      const ad = document.querySelector(selector);
      if (ad) ad.style.display = 'none';
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function waitForSettingsToLoad(callback) {
    const interval = setInterval(() => {
        const leftHand = document.querySelector('#lefthand');
        const masterVol = document.querySelector('#volume');

        if (leftHand && masterVol) {
            clearInterval(interval); // Stop checking
            callback(); // Execute function once elements exist
        }
    }, 300); 
}

window.addEventListener('load', () => {
    console.log('Starting Electron app...');
    
    blockAds();
    addStatsDiv();
    console.log('Running Stats...');
    stats();
    getPing();

    console.log('Waiting for Settings to Load...');
    waitForSettingsToLoad(settingUpdate)
});