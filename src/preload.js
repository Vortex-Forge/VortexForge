// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// adBlocker (for devs only) 

function blockAds() {
    setInterval(function() {
        const bannerHome1 = document.querySelector('#banner-home');
        const bannerHome2 = document.querySelector('#banner-home2');
        const bannerReswawn1 = document.querySelector('#banner-respawn-1');
        const bannerRespawn2 = document.querySelector('#banner-respawn-2');
        if (bannerHome1) { bannerHome1.style.display = 'none'; }
        if (bannerHome2) { bannerHome2.style.display = 'none'; } 
        if (bannerReswawn1) { bannerReswawn1.style.display = 'none'; } 
        if (bannerRespawn2) { bannerRespawn2.style.display = 'none'; } 
    }, 500);
}

document.addEventListener("DOMContentLoaded", function() { blockAds(); })