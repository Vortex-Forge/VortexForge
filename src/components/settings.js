let configs = {
    vfMode: false,
    sniperMode: false,
    isLegendarySwapped: false,
    splashScreen: false,
    statsEnabled: false, 
    fpsBooster: false 
};

let isRightMousePressed = false;
let scopeClose = false; 
let autoFireInterval = null; 

function settingUpdate() {
    // Removes unnecessary settings
    const leftHand = document.querySelector('#lefthand').closest('.setting');
    const masterVol = document.querySelector('#volume').closest('.setting');
    const toggleADS = document.querySelector('#toggleads').closest('.setting'); 
    const mouseInput = document.querySelector('#rawmouse').closest('.setting'); 
    if (leftHand && masterVol && toggleADS && mouseInput) {
        leftHand.style.display = 'none';
        masterVol.style.display = 'none';
        toggleADS.style.display = 'none'; 
        mouseInput.style.display = 'none'; 
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
    </div>
    <div class="setting toggle" style="padding: 9px 30px;">
        <p style="font-size: 21px;">FPS Booster</p>
        <label>
            <input id="fpsBooster" class="checkbox" type="checkbox">
            <span></span>
        </label>
    </div>
     <div class="setting toggle" style="padding: 9px 30px; background-color: rgba(255, 255, 255, 0.03);">
        <p style="font-size: 21px;">Search My Rank</p>
        <button id="searchRankButton" style="padding: 5px 10px; font-size: 16px; cursor: pointer;">Search</button>
    </div>`
    ;

    const settingsDiv = document.getElementById('settingsDiv');
    if (settingsDiv && !document.getElementById('sniperMode')) {
        const customDiv = document.createElement('div');
        customDiv.innerHTML = newSettingsContent;

        settingsDiv.insertBefore(customDiv, settingsDiv.firstChild);
    }

    // Mode Toggle Event Listeners
    const sniperToggle = document.querySelector('#sniperMode');
    const vfToggle = document.querySelector('#vfsettings');
    const fpsBoostToggle = document.querySelector('#fpsBooster');

    sniperToggle?.addEventListener('change', () => {
        configs.sniperMode = !configs.sniperMode; 
    });

    vfToggle?.addEventListener('change', () => {
        configs.vfMode = !configs.vfMode;
    });

    // FPS Booster toggle handler 
    fpsBoostToggle?.addEventListener('change', () => {
        configs.fpsBooster = !configs.fpsBooster;
        applyFpsBooster(); // Apply FPS boost immediately when toggled
    });

    const rankSearch = document.getElementById('searchRankButton')
    rankSearch.addEventListener('click', () => {
        createSearchPopup(); 
    })  
}

// FPS Booster logic 
function applyFpsBooster() {
    if (configs.fpsBooster) {
        console.log("Applying FPS boost settings...");
        
        // Apply pixelated rendering to all canvases
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.style.imageRendering = 'pixelated';
        });
        
        // Reduce quality of visual elements
        const elementsToModify = [
            ...document.querySelectorAll('img, video, canvas')
        ];
        
        elementsToModify.forEach(el => {
            el.style.filter = 'brightness(0.9) contrast(0.9)';
        });
        
        // Additional performance optimizations
        document.body.style.imageRendering = 'optimizeSpeed';
        
        console.log("Graphics quality reduced for FPS boost.");
    } else {
        console.log("Removing FPS boost settings...");
        // Reset pixelated rendering
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.style.imageRendering = 'auto';
        });
        
        // Reset visual elements
        const elementsToModify = [
            ...document.querySelectorAll('img, video, canvas')
        ];
        
        elementsToModify.forEach(el => {
            el.style.filter = 'none';
        });
        
        document.body.style.imageRendering = 'auto';
        
        console.log("Graphics restored to normal quality.");
    }
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

// Add an observer to apply FPS booster settings when game elements load
function setupFpsBoosterObserver() {
    const observer = new MutationObserver(() => {
        if (configs.fpsBooster) {
            applyFpsBooster();
        }
    });
    
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
}

// Initialize the FPS booster observer when the module loads
setTimeout(setupFpsBoosterObserver, 5000);


     function createSearchPopup() {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        popup.style.padding = '20px';
        popup.style.borderRadius = '10px';
        popup.style.color = 'white';
        popup.style.zIndex = '10000';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter username';
        input.style.padding = '10px';
        input.style.fontSize = '16px';
        input.style.marginRight = '10px';

        const searchButton = document.createElement('button');
        searchButton.innerText = 'Search';
        searchButton.style.padding = '10px';
        searchButton.style.fontSize = '16px';
        searchButton.style.cursor = 'pointer';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginLeft = '10px';
        closeButton.style.padding = '10px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';

        closeButton.onclick = () => popup.remove();
        searchButton.onclick = async () => {
            const username = input.value.trim();
            if (username) {
                const rank = await fetchLeaderboardRank(username);
                showRankPopup(username, rank);
            }
        };

        popup.appendChild(input);
        popup.appendChild(searchButton);
        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }

 async function fetchLeaderboardRank(username) {
    try {
        const response = await fetch('https://login.deadshot.io/leaderboards');
        const data = await response.json();

        const categories = ["daily", "weekly", "alltime"];

        for (const category of categories) {
            if (data[category] && data[category].kills) {
                const leaderboard = data[category].kills;

                leaderboard.sort((a, b) => b.kills - a.kills);

                const player = leaderboard.find(player => player.name === username);

                if (player) {
                    const rank = leaderboard.indexOf(player);
                    return `Rank: ${rank + 1} in ${category} leaderboard`;
                }
            }
        }

        return 'Not found in any leaderboard';
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return 'Error';
    }
}

    function showRankPopup(username, rank) {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '70%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -70%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        popup.style.padding = '20px';
        popup.style.borderRadius = '10px';
        popup.style.color = 'white';
        popup.style.zIndex = '10000';
        popup.innerText = rank === 'Not found' ? `User ${username} not found in the leaderboard.` : `User ${username} is ranked #${rank}`;

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '10px';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => popup.remove();

        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }

module.exports = { settingUpdate, configs };

