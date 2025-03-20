const { ipcRenderer } = require("electron");
const { getFps } = require("./statsLogic");

const stats = () => {
  function updateFps() {
    getFps();
  }
  updateFps();
};

const addStatsDiv = () => {
  try {
    console.log("Adding stats div");

    const div = document.createElement("div");
    div.id = "stats";
    div.style = `
      position: fixed; 
      top: 18%; 
      right: 0; 
      color: white; 
      padding: 0.5em; 
      z-index: 999;
      background-color: rgba(0, 0, 0, 0.7); 
      opacity: 1; 
      transition: opacity 0.5s ease, transform 0.5s ease;
      cursor: grab; 
      user-select: none; 
      border-radius: 8px;
      width: max-content; /* Prevents width issues */
    `;

    div.innerHTML = `
      <div style="color:white; font-size:1vw; font-family: sans-serif; font-weight: 900;">
        FPS: <span id="fps">0</span>
      </div>
      <div style="color:white; font-size:1vw; font-family: sans-serif; font-weight: 900; display:flex; align-items:flex-start">
        Memory: <span id="memory">N/A</span> <span style="font-size:0.5rem">MB</span> 
      </div>
      <div style="color:white; font-size:1vw; font-family: sans-serif; font-weight: 900;">
        Ping: <span id="ping">N/A</span>
      </div>
    `;

    document.body.appendChild(div);
    makeDraggable(div);

    createIpcChannels();
    console.log("Ipc channels created");
  } catch (e) {
    console.error(e);
  }
};

function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
  let isDragging = false;

  element.onmousedown = (e) => {
    e.preventDefault();
    isDragging = true;
    
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.onmousemove = (event) => {
      if (!isDragging) return;
      event.preventDefault();

      offsetX = event.clientX - mouseX;
      offsetY = event.clientY - mouseY;

      element.style.top = `${element.offsetTop + offsetY}px`;
      element.style.left = `${element.offsetLeft + offsetX}px`;

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    document.onmouseup = () => {
      isDragging = false;
      document.onmousemove = null;
      document.onmouseup = null;
      snapToEdge(element); // Snap to edge when released
    };
  };
}

function snapToEdge(element) {
  const screenWidth = window.innerWidth;
  const elementX = element.offsetLeft;
  const threshold = screenWidth * 0.5; // Middle of screen

  if (elementX < threshold) {
    element.style.left = "0px"; // Snap to left
  } else {
    element.style.left = `${screenWidth - element.offsetWidth}px`; // Snap to right
  }
}

const createIpcChannels = () => {
  ipcRenderer.on("memory", (event, data) => {
    document.getElementById("memory").innerHTML = data;
  });
};
function addFontLinks() {
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Protest+Guerrilla&display=swap",
    },
  ];

  links.forEach((linkData) => {
    const link = document.createElement("link");
    Object.keys(linkData).forEach((key) => {
      link.setAttribute(key, linkData[key]);
    });
    document.head.appendChild(link);
    console.log(`Link added: ${link.outerHTML}`);
  });
}
module.exports = {
  stats,
  addStatsDiv,
  addFontLinks,
};
