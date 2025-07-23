// main.js - Main initialization file
class ResumeApp {
  constructor() {
    this.isLoaded = false;
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    console.log("Resume App: DOM Ready");

    // Initialize modules
    this.initializeModules();

    // Add additional modal styles
    this.addModalStyles();

    // Mark as loaded
    this.isLoaded = true;
    console.log("Resume App: Fully Loaded");

    // Trigger custom event
    document.dispatchEvent(new CustomEvent("resumeAppLoaded"));
  }

  initializeModules() {
    // Initialize animations
    window.animations = new ResumeAnimations();

    // Initialize interactions
    window.interactions = new ResumeInteractions();

    console.log("Resume App: Modules Initialized");
  }

  addModalStyles() {
    const modalStyles = document.createElement("style");
    modalStyles.textContent = `
            @keyframes socialModalSlideIn {
                from { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }

            @keyframes socialModalSlideOut {
                from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                to { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
            }

            @keyframes socialOverlayFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .modal-btn {
                padding: 8px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border: 2px solid;
            }

            .close-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border-color: rgba(255, 255, 255, 0.3);
            }

            .close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .copy-btn {
                background: #10b981;
                color: white;
                border-color: #10b981;
            }

            .copy-btn:hover {
                background: #047857;
                border-color: #047857;
            }

            .social-modal-link:hover {
                transform: translateY(-2px);
                border-color: #ffd700 !important;
            }

            /* Performance optimizations */
            .resume-container * {
                will-change: transform;
            }

            .particle {
                will-change: transform, opacity;
            }

            .social-link {
                will-change: transform;
            }

            /* Mobile responsive for social modal */
            @media (max-width: 768px) {
                #socialConnectMessage > div:first-child {
                    padding: 20px !important;
                    min-width: 280px !important;
                }

                #socialConnectMessage .social-links-container {
                    flex-direction: column !important;
                    gap: 10px !important;
                }

                #socialConnectMessage .social-links-container a {
                    width: 100% !important;
                    justify-content: center !important;
                }
            }
        `;
    document.head.appendChild(modalStyles);
  }

  // Utility methods
  static preloadImages() {
    const images = ["./sudhanshuPic.jpg"];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  static optimizePerformance() {
    // Enable hardware acceleration for smooth animations
    const elementsToOptimize = document.querySelectorAll(
      ".social-link, .fab-main, .particle, .profile-image-container"
    );
    elementsToOptimize.forEach((el) => {
      el.style.willChange = "transform";
    });
  }
}

// Initialize the app
window.resumeApp = new ResumeApp();

// Preload images for better performance
ResumeApp.preloadImages();

// Optimize performance
document.addEventListener("resumeAppLoaded", () => {
  ResumeApp.optimizePerformance();
});
