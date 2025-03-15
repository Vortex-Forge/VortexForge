// ==UserScript==
// @name         Vortex Forge Web Client V1.1
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Vortex Forge Web Client with Sniper Mode
// @author       NOOB
// @match        https://deadshot.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let featuresEnabled = true;
    let sniperModeEnabled = false;
    let fireworkInterval = null;
    let kKeyInterval = null;
    let isRightMousePressed = false;

    const newSettingsContent = `
    <div class="setting toggle" style="margin-top: 80px; padding: 9px 30px;">
        <p style="font-size: 21px;">Sniper Mode</p>
        <label>
            <input id="vfSniperMode" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>
    <div class="setting toggle" style="padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px;">VF Mode</p>
        <label>
            <input id="vfsettings" class="checkbox" type="checkbox" checked="">
            <span></span>
        </label>
    </div>`;

    function addCustomSettingsToTop() {
        const settingsDiv = document.getElementById('settingsDiv');
        if (settingsDiv && !document.getElementById('vfSniperMode')) {
            const customDiv = document.createElement('div');
            customDiv.innerHTML = newSettingsContent;

            settingsDiv.insertBefore(customDiv, settingsDiv.firstChild);
        }
    }

    function waitForSettingsDiv() {
        const retryInterval = setInterval(() => {
            const settingsDiv = document.getElementById('settingsDiv');
            if (settingsDiv) {
                addCustomSettingsToTop();
                setupSniperModeToggle();
                setupVortexForgeModeToggle();
                clearInterval(retryInterval);
            }
        }, 500);
    }

    function setupSniperModeToggle() {
        const sniperModeCheckbox = document.getElementById('vfSniperMode');
        if (sniperModeCheckbox) {
            sniperModeCheckbox.addEventListener('change', (event) => {
                sniperModeEnabled = event.target.checked;
            });
        }
    }

    function setupVortexForgeModeToggle() {
        const vfCheckbox = document.getElementById('vfsettings');
        if (vfCheckbox) {
            vfCheckbox.addEventListener('change', (event) => {
                featuresEnabled = event.target.checked;
                toggleFeatures(featuresEnabled);
            });
        }
    }

    function toggleFeatures(enabled) {
        if (!enabled) {
            stopKKeyPress();
            isRightMousePressed = false;
        }
    }

     function stopKKeyPress() {
        if (kKeyInterval) {
            clearInterval(kKeyInterval);
            kKeyInterval = null;

            const kKeyUpEvent = new KeyboardEvent('keyup', {
                key: 'K',
                code: 'KeyK',
                keyCode: 75,
                which: 75,
                bubbles: true,
                cancelable: true,
            });
            document.dispatchEvent(kKeyUpEvent);
        }
    }

    function startShooting() {
        const shootKeyEvent = new KeyboardEvent('keydown', {
            key: 'K',
            code: 'KeyK',
            keyCode: 75,
            which: 75,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(shootKeyEvent);

        const shootKeyUpEvent = new KeyboardEvent('keyup', {
            key: 'K',
            code: 'KeyK',
            keyCode: 75,
            which: 75,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(shootKeyUpEvent);
    }

    document.addEventListener('mousedown', (e) => {
        if (!featuresEnabled) return;

        if (e.button === 2) { 
            if (!isRightMousePressed) {
                isRightMousePressed = true;

                if (!sniperModeEnabled) {
                    const fKeyEvent = new KeyboardEvent('keydown', {
                        key: 'F',
                        code: 'KeyF',
                        keyCode: 70,
                        which: 70,
                        bubbles: true,
                        cancelable: true,
                    });
                    document.dispatchEvent(fKeyEvent);
                }
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 2) { 
            if (sniperModeEnabled) {
                startShooting();
            }

            isRightMousePressed = false;
        }
    });

    window.addEventListener('load', () => {
        waitForSettingsDiv();
    });
})();