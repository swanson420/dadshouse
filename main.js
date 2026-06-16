/**
 * The "Living Canvas" Digital Family Living Room
 * Unified Architecture & Logic Controller Implementation
 */
document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize Global Component References
  const windowBackground = document.getElementById("windowBackground");
  const windowAnimContainer = document.getElementById("windowAnimationContainer");
  const toastContainer = document.getElementById("toastContainer");
  
  const centralTV = document.getElementById("centralTV");
  const tvContentLayer = document.getElementById("tvContentLayer");
  
  const coffeeMug = document.getElementById("coffeeMug");
  const tvRemote = document.getElementById("tvRemote");
  const deskToy = document.getElementById("deskToy");
  const pendulumArm = document.getElementById("pendulumArm");
  
  const gameRoomDoor = document.getElementById("gameRoomDoor");
  const vinylRecord = document.getElementById("vinylRecord");
  const musicCanvas = document.getElementById("musicCanvas");

  let originalTvHtml = tvContentLayer.innerHTML;
  let musicAnimationActive = false;
  let musicCanvasContext = null;
  let musicParticleArray = [];
  let particleAnimationId = null;

  /* ==========================================================================
     REUSABLE MODAL CONTROLLER CLASS (ARCHITECTURAL OPTIMIZATION)
     ========================================================================== */
  class ModalController {
    constructor(modalId, backdropId, closeBtnId) {
      this.modal = document.getElementById(modalId);
      this.backdrop = document.getElementById(backdropId);
      this.closeBtn = document.getElementById(closeBtnId);
      this.initEvents();
    }

    initEvents() {
      if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.close());
      if (this.backdrop) this.backdrop.addEventListener("click", () => this.close());
      
      // Global Escape Key Listener when an active instance is open
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !this.modal.hidden) {
          this.close();
        }
      });
    }

    open(setupCallback = null) {
      if (setupCallback) setupCallback();
      this.modal.hidden = false;
      this.modal.removeAttribute('hidden');
      
      const primaryInput = this.modal.querySelector('input, textarea, button:not(.modal-backdrop)');
      if (primaryInput) primaryInput.focus();
    }

    close() {
      this.modal.hidden = true;
      this.modal.setAttribute('hidden', '');
    }
  }

  // Instantiate Modal Instances cleanly via the extracted controller
  const tvModalController = new ModalController("tvControlModal", "tvModalBackdrop", "closeTvModalBtn");
  const metaModalController = new ModalController("generalMetadataModal", "metaModalBackdrop", "closeMetaModalBtn");

  /* ==========================================================================
     ENVIRONMENTAL DATA ENGINE (LOCAL TIME GRADIENT TRACKING)
     ========================================================================== */
  function evaluateEnvironmentalTime() {
    const currentHour = new Date().getHours();
    const skyLayer = windowBackground.querySelector('.sky-gradient');
    
    if (currentHour >= 5 && currentHour < 12) {
      skyLayer.style.background = "linear-gradient(135deg, #FFB703 0%, #219EBC 100%)";
    } else if (currentHour >= 12 && currentHour < 18) {
      skyLayer.style.background = "linear-gradient(135deg, #219EBC 0%, #8ECAE6 100%)";
    } else {
      skyLayer.style.background = "linear-gradient(135deg, #023047 0%, #1A1D20 100%)";
    }
  }
  evaluateEnvironmentalTime();

  windowBackground.parentElement.addEventListener('click', (e) => {
    if (e.target === document.body) {
      triggerWindowMeteorSequence();
    }
  });

  function triggerWindowMeteorSequence() {
    const starNode = document.createElement('div');
    starNode.classList.add('shooting-star-node');
    starNode.style.top = `${Math.random() * 40}%`;
    starNode.style.left = `${Math.random() * 20}%`;
    windowAnimContainer.appendChild(starNode);
    
    setTimeout(() => starNode.remove(), 1200);
  }

  /* ==========================================================================
     AUXILIARY COMMUNICATIONS CORE & SYSTEM TOAST MATRIX
     ========================================================================== */
  function renderGlobalToast(messageString) {
    const toastItem = document.createElement('div');
    toastItem.classList.add('toast-item');
    toastItem.textContent = messageString;
    toastContainer.appendChild(toastItem);
    
    setTimeout(() => {
      toastItem.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      toastItem.style.opacity = "0";
      toastItem.style.transform = "translateY(-10px)";
      setTimeout(() => toastItem.remove(), 300);
    }, 4500);
  }

  /* ==========================================================================
     PRIMARY FLOW: BROADCAST / SCREEN MANAGEMENT ARCHITECTURE
     ========================================================================== */
  centralTV.addEventListener("click", () => {
    tvModalController.open(() => {
      document.getElementById("youtubeUrlInput").value = "";
      document.getElementById("announcementTextInput").value = "";
      const feedback = document.getElementById("formValidationFeedback");
      feedback.textContent = "";
      feedback.className = "validation-feedback-node";
    });
  });

  document.getElementById("tvConfigForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const videoUrlSource = document.getElementById("youtubeUrlInput").value.trim();
    const alertBodyText = document.getElementById("announcementTextInput").value.trim();
    const feedback = document.getElementById("formValidationFeedback");

    if (!videoUrlSource && !alertBodyText) {
      feedback.textContent = "Error: Please supply either a stream asset reference or broadcast announcement string.";
      feedback.className = "validation-feedback-node error";
      return;
    }

    if (videoUrlSource) {
      let absoluteEmbedUrl = videoUrlSource;
      if (!videoUrlSource.includes('http')) {
        absoluteEmbedUrl = `https://www.youtube.com/embed/${videoUrlSource}`;
      }
      tvContentLayer.innerHTML = `<iframe class='tv-iframe-element' src='${absoluteEmbedUrl}?autoplay=1&mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
    } else if (alertBodyText) {
      tvContentLayer.innerHTML = `
        <div class="ambient-playlist">
          <div class="notification-ticker">
            <span class="ticker-text">ALERT BROADCAST: ${alertBodyText}</span>
          </div>
          <div class="static-notice-display">
            <h3>Active System Notice</h3>
            <p>${alertBodyText}</p>
          </div>
        </div>`;
    }

    feedback.textContent = "Success: Stream configuration applied to Central TV environment.";
    feedback.className = "validation-feedback-node success";
    
    setTimeout(() => tvModalController.close(), 800);
  });

  /* ==========================================================================
     SECONDARY FLOW: MULTI-USER PERSONAL NAVIGATION ROUTER
     ========================================================================== */
  document.querySelectorAll(".bedroom-door").forEach(doorNode => {
    doorNode.addEventListener("click", () => {
      if (doorNode.classList.contains("locked")) return;
      const destinationLabel = doorNode.getAttribute("data-target");
      renderGlobalToast(`Routing execution pipeline forward to private ${destinationLabel} module...`);
    });
  });

  /* ==========================================================================
     RECREATIONAL LAYER ARCHITECTURE (GAME PORTAL & PARTICLE MUSIC AUDIO)
     ========================================================================== */
  gameRoomDoor.addEventListener("click", () => {
    renderGlobalToast("Initializing local game engine runtime environments...");
    gameRoomDoor.style.transform = "scale(2.5)";
    gameRoomDoor.style.opacity = "0";
    
    setTimeout(() => {
      renderGlobalToast("System Routing Event: Loaded Active Game Index Page Component.");
      gameRoomDoor.style.transform = "none";
      gameRoomDoor.style.opacity = "1";
    }, 1500);
  });

  function resizeMusicCanvas() {
    musicCanvas.width = musicCanvas.parentElement.clientWidth;
    musicCanvas.height = 120;
  }

  if (musicCanvas) {
    musicCanvasContext = musicCanvas.getContext("2d");
    window.addEventListener("resize", resizeMusicCanvas);
    resizeMusicCanvas();
  }

  vinylRecord.addEventListener("click", () => {
    musicAnimationActive = !musicAnimationActive;
    
    if (musicAnimationActive) {
      vinylRecord.classList.add("vinyl-spinning");
      renderGlobalToast("Audio playback stream initialized: Tuning Music Corner stream.");
      executeParticleSimulationLoop();
    } else {
      vinylRecord.classList.remove("vinyl-spinning");
      cancelAnimationFrame(particleAnimationId);
      musicCanvasContext.clearRect(0, 0, musicCanvas.width, musicCanvas.height);
      musicParticleArray = [];
      renderGlobalToast("Audio stream paused cleanly.");
    }
  });

  function executeParticleSimulationLoop() {
    if (!musicAnimationActive) return;
    musicCanvasContext.clearRect(0, 0, musicCanvas.width, musicCanvas.height);
    
    if (musicParticleArray.length < 15 && Math.random() < 0.15) {
      musicParticleArray.push({
        x: musicCanvas.width / 2 + (Math.random() * 40 - 20),
        y: musicCanvas.height - 10,
        radius: Math.random() * 3 + 2,
        speedY: Math.random() * 1.2 + 0.6,
        opacity: 1,
        driftX: Math.sin(Math.random() * Math.PI) * 0.5
      });
    }

    for (let i = 0; i < musicParticleArray.length; i++) {
      let p = musicParticleArray[i];
      p.y -= p.speedY;
      p.x += p.driftX;
      p.opacity -= 0.008;

      musicCanvasContext.beginPath();
      musicCanvasContext.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      musicCanvasContext.fillStyle = `rgba(33, 158, 188, ${p.opacity})`;
      musicCanvasContext.fill();

      if (p.opacity <= 0 || p.y <= 0) {
        musicParticleArray.splice(i, 1);
        i--;
      }
    }
    particleAnimationId = requestAnimationFrame(executeParticleSimulationLoop);
  }

  /* ==========================================================================
     TIMELINE AND CANVAS OVERLAY MATRIX (MANTEL SHELF & MEMORY PHOTO GALLERY)
     ========================================================================== */
  function configureMetadataView(title, date, description, imgUrl = null) {
    metaModalController.open(() => {
      document.getElementById("metaModalTitle").textContent = title;
      document.getElementById("metaModalDate").textContent = date;
      document.getElementById("metaModalDesc").textContent = description;
      
      const mediaContainer = document.getElementById("metaModalMediaContainer");
      const imgNode = document.getElementById("metaModalImg");

      if (imgUrl) {
        imgNode.src = imgUrl;
        imgNode.alt = `Archival element asset for ${title}`;
        mediaContainer.removeAttribute('hidden');
        mediaContainer.hidden = false;
      } else {
        mediaContainer.setAttribute('hidden', '');
        mediaContainer.hidden = true;
        imgNode.src = "";
      }
    });
  }

  document.querySelectorAll(".mantel-item").forEach(item => {
    item.addEventListener("click", () => {
      const metadataPayload = JSON.parse(item.getAttribute("data-metadata"));
      configureMetadataView(metadataPayload.title, metadataPayload.date, metadataPayload.desc);
    });
  });

  document.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      const narrativePayload = JSON.parse(card.getAttribute("data-narrative"));
      configureMetadataView(narrativePayload.title, "Archival Historical Record", narrativePayload.desc, narrativePayload.img);
    });
  });

  /* ==========================================================================
     AUXILIARY EXPLORATION COUCH SANDBOX INTERACTION PARAMETERS
     ========================================================================== */
  coffeeMug.addEventListener("click", () => {
    const dailyNotices = [
      "Notice: Remember to water the ferns near the window frame today!",
      "Leo left his math binder on the counter again. Keep an eye out.",
      "Coffee Mug Log: Fresh hazelnut batch brewed. Enjoy your morning workspace!",
      "Grandma is calling on the tablet device at 4 PM today."
    ];
    renderGlobalToast(dailyNotices[Math.floor(Math.random() * dailyNotices.length)]);
  });

  tvRemote.addEventListener("click", () => {
    if (tvContentLayer.querySelector('iframe')) {
      tvContentLayer.innerHTML = originalTvHtml;
      renderGlobalToast("Macro Event: Remote control input restored default ambient TV notice layer.");
    } else {
      tvContentLayer.innerHTML = `<iframe class='tv-iframe-element' src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
      renderGlobalToast("Macro Event: Remote control shortcut forced dynamic live stream rendering.");
    }
  });

  deskToy.addEventListener("click", () => {
    if (pendulumArm.classList.contains("pendulum-swinging")) return;
    
    renderGlobalToast("Desk Toy Sandbox: Executed 5-second mechanical pendulum simulation.");
    pendulumArm.classList.add("pendulum-swinging");
    
    setTimeout(() => pendulumArm.classList.remove("pendulum-swinging"), 5000);
  });

});
  
