// function settingUpdate() {

// // Removes unnecessary settings
//  const leftHand = document.querySelector('#lefthand').closest('.setting');
//  const masterVol = document.querySelector('#volume').closest('.setting');
//  if (leftHand && masterVol) {
//      leftHand.remove();
//      masterVol.remove();
//      console.log("Removed unwanted rubbish");
//  }

//  // Change the margin-top of sniper mode for exact spacing 
//  const newSettingsContent = `
//     <div class="setting toggle" style="margin-top: 80px; padding: 9px 30px;">
//         <p style="font-size: 21px;">Sniper Mode</p>
//         <label>
//             <input id="sniperMode" class="checkbox" type="checkbox">
//             <span></span>
//         </label>
//     </div>
//     <div class="setting toggle" style="padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
//         <p style="font-size: 21px;">VF Mode</p>
//         <label>
//             <input id="vfsettings" class="checkbox" type="checkbox">
//             <span></span>
//         </label>
//     </div>`;

//     const settingsDiv = document.getElementById('settingsDiv');
//     if (settingsDiv && !document.getElementById('sniperMode')) {
//         const customDiv = document.createElement('div');
//         customDiv.innerHTML = newSettingsContent;

//         settingsDiv.insertBefore(customDiv, settingsDiv.firstChild);
//     }

// // Custom settings starts from here
// let configs = {
//     vfMode: false,
//     sniperMode: false,
//     isLegendarySwapped: false,
//     splashScreen: true,
//     statsEnabled: false 
// };

// const sniperToggle = document.querySelector('#sniperMode');
// const vfToggle = document.querySelector('#vfsettings');

// sniperToggle.addEventListener('change', () => {
//     configs.sniperMode = !configs.sniperMode; 
// });

// vfToggle.addEventListener('change', () => {
//     configs.vfMode = !configs.vfMode;
// });

// let isRightMousePressed = false;
// let scopeClose = false; 
// let autoFireInterval = null; 

// document.addEventListener('mousedown', (e) => {
//     if (e.button === 2) {
//         isRightMousePressed = true;
//         scopeClose = false;
        
//         if (configs.vfMode) {
//             startAutoFire();
//         }
//     }
// });

// document.addEventListener('mouseup', (e) => {
//     if (e.button === 2) {
//         isRightMousePressed = false;
//         scopeClose = true;
        
//         if (configs.sniperMode && scopeClose) {
//             fireSingleShot();
//         }
//         stopAutoFire(); 
//     }
// });

// // AutoFire logic (continuous fire when RMB held)
// function startAutoFire() {
//     if (autoFireInterval) return; // Prevent multiple intervals

//     autoFireInterval = setInterval(() => {
//         if (configs.vfMode && isRightMousePressed) {
//             const kkeydown = new KeyboardEvent('keydown', {
//                 key: 'K',
//                 code: 'KeyK',
//                 keyCode: 75,
//                 which: 75,
//                 bubbles: true,
//                 cancelable: true,
//             });
//             document.dispatchEvent(kkeydown);
//         } else {
//             stopAutoFire();
//         }
//     }, 100); 
// }

// function stopAutoFire() {
//     if (autoFireInterval) {
//         const kkeyup = new KeyboardEvent('keyup', {
//             key: 'K',
//             code: 'KeyK',
//             keyCode: 75,
//             which: 75,
//             bubbles: true,
//             cancelable: true,
//         });
//         document.dispatchEvent(kkeyup);

//         clearInterval(autoFireInterval);
//         autoFireInterval = null;
//     }
// }

// // Sniper Mode logic (fire once on RMB release)
// function fireSingleShot() {
//     const kkeydown = new KeyboardEvent('keydown', {
//         key: 'K',
//         code: 'KeyK',
//         keyCode: 75,
//         which: 75,
//         bubbles: true,
//         cancelable: true,
//     });
//     document.dispatchEvent(kkeydown);

//     const kkeyup = new KeyboardEvent('keyup', {
//         key: 'K',
//         code: 'KeyK',
//         keyCode: 75,
//         which: 75,
//         bubbles: true,
//         cancelable: true,
//     });
//     document.dispatchEvent(kkeyup);
// }
// } 
// module.exports = { settingUpdate, configs };
let configs = {
    vfMode: false,
    sniperMode: false,
    isLegendarySwapped: false,
    splashScreen: true,
    statsEnabled: false 
};

let isRightMousePressed = false;
let scopeClose = false; 
let autoFireInterval = null; 

function settingUpdate() {
    // Removes unnecessary settings
    const leftHand = document.querySelector('#lefthand')?.closest('.setting');
    const masterVol = document.querySelector('#volume')?.closest('.setting');
    if (leftHand && masterVol) {
        leftHand.remove();
        masterVol.remove();
        console.log("Removed unwanted rubbish");
    }

    // Custom Settings UI
    const newSettingsContent = `
    <div class="setting toggle" style="margin-top: 80px; padding: 9px 30px;">
        <p style="font-size: 21px;">Sniper Mode</p>
        <label>
            <input id="sniperMode" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>
    <div class="setting toggle" style="padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px;">VF Mode</p>
        <label>
            <input id="vfsettings" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>`;

    const settingsDiv = document.getElementById('settingsDiv');
    if (settingsDiv && !document.getElementById('sniperMode')) {
        const customDiv = document.createElement('div');
        customDiv.innerHTML = newSettingsContent;

        settingsDiv.insertBefore(customDiv, settingsDiv.firstChild);
    }

    // Mode Toggle Event Listeners
    const sniperToggle = document.querySelector('#sniperMode');
    const vfToggle = document.querySelector('#vfsettings');

    sniperToggle?.addEventListener('change', () => {
        configs.sniperMode = !configs.sniperMode; 
    });

    vfToggle?.addEventListener('change', () => {
        configs.vfMode = !configs.vfMode;
    });
}

// Event Listeners - Always Active
document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
        isRightMousePressed = true;
        scopeClose = false;
        
        if (configs.vfMode) {
            startAutoFire();
        }
    }
});

document.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
        isRightMousePressed = false;
        scopeClose = true;

        if (configs.sniperMode && scopeClose) {
            fireSingleShot();
        }
        stopAutoFire();
    }
});

// AutoFire logic
function startAutoFire() {
    if (autoFireInterval) return;

    console.log('AutoFire Started');  // Debugging
    autoFireInterval = setInterval(() => {
        if (configs.vfMode && isRightMousePressed) {
            const kkeydown = new KeyboardEvent('keydown', {
                key: 'K',
                code: 'KeyK',
                keyCode: 75,
                which: 75,
                bubbles: true,
                cancelable: true,
            });
            document.dispatchEvent(kkeydown);
        } else {
            stopAutoFire();
        }
    }, 100); 
}

function stopAutoFire() {
    if (autoFireInterval) {
        console.log('AutoFire Stopped');  // Debugging
        const kkeyup = new KeyboardEvent('keyup', {
            key: 'K',
            code: 'KeyK',
            keyCode: 75,
            which: 75,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(kkeyup);

        clearInterval(autoFireInterval);
        autoFireInterval = null;
    }
}

// Sniper Mode logic (fire once on RMB release)
function fireSingleShot() {
    console.log('Sniper Shot Fired');  // Debugging
    const kkeydown = new KeyboardEvent('keydown', {
        key: 'K',
        code: 'KeyK',
        keyCode: 75,
        which: 75,
        bubbles: true,
        cancelable: true,
    });
    document.dispatchEvent(kkeydown);

    const kkeyup = new KeyboardEvent('keyup', {
        key: 'K',
        code: 'KeyK',
        keyCode: 75,
        which: 75,
        bubbles: true,
        cancelable: true,
    });
    document.dispatchEvent(kkeyup);
}

module.exports = { settingUpdate, configs };
window.configs = configs;
