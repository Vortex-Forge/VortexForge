// main.js (Electron Main Process)
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow, splashWindow;
let showSplash = true; // Toggle this based on your settings

app.whenReady().then(() => {
    if (showSplash) {
        splashWindow = new BrowserWindow({
            width: 1920,
            height: 1080,
            frame: false,
            alwaysOnTop: true,
            fullscreen: true,
            webPreferences: { nodeIntegration: true }
        });

        splashWindow.loadFile('splash.html');

        setTimeout(() => {
            splashWindow.close();
            createMainWindow();
        }, 4000);
    } else {
        createMainWindow();
    }
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        fullscreen: true,
        webPreferences: { nodeIntegration: false }
    });

    mainWindow.loadURL('https://deadshot.io');
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Frontend Script for Adding Custom Tab and Content
document.addEventListener("DOMContentLoaded", function () {
    const tabContainer = document.querySelector(".tabContainer"); // Select the main tab container
    const mainScreen = document.querySelector(".mainScreen"); // The main screen content
    let isVortexActive = false; // Track tab state

    // Create the VortexForge tab button
    const vortexTab = document.createElement("div");
    vortexTab.classList.add("tab"); // Use existing tab styling
    vortexTab.textContent = "VortexForge";
    vortexTab.style.display = "block"; // Ensure visibility

    // Create the VortexForge content section
    const vortexContent = document.createElement("div");
    vortexContent.id = "vortexContent";
    vortexContent.style.display = "none"; // Initially hidden
    vortexContent.innerHTML = `<h2 style="color: white;">VortexForge Settings</h2>`; // Customize as needed

    // Append elements to DOM
    tabContainer.appendChild(vortexTab);
    document.body.appendChild(vortexContent); // Ensure it's inside the main UI structure

    // Add event listener to handle tab switching
    vortexTab.addEventListener("click", function () {
        isVortexActive = !isVortexActive;

        // Hide all other tab contents
        document.querySelectorAll(".mainScreen, .existingTabContent").forEach(el => {
            el.style.display = "none";
        });

        // Toggle VortexForge content
        vortexContent.style.display = isVortexActive ? "block" : "none";
    });

    // Ensure when other tabs are clicked, VortexForge is hidden
    document.querySelectorAll(".tab:not(:last-child)").forEach(tab => {
        tab.addEventListener("click", function () {
            isVortexActive = false;
            vortexContent.style.display = "none";
        });
    });
});
