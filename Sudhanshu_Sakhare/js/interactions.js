// interactions.js - All user interaction functions
class ResumeInteractions {
  constructor() {
    this.fabMenuOpen = false;
    this.currentTheme = "default";
    this.initializeInteractions();
  }

  initializeInteractions() {
    this.setupEventListeners();
    this.makeGlobalFunctions();
  }

  setupEventListeners() {
    // Close FAB menu when clicking outside
    document.addEventListener("click", (e) => {
      const fabMenu = document.querySelector(".floating-menu");
      if (fabMenu && !fabMenu.contains(e.target) && this.fabMenuOpen) {
        this.toggleFabMenu();
      }
    });

    // Enhanced keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.fabMenuOpen) {
        this.toggleFabMenu();
      }
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        this.printResume();
      }
    });

    // Enhanced social link interactions
    document.querySelectorAll(".social-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        window.animations.scaleAnimation(link);
      });
    });

    // Enhanced skill item interactions
    document.querySelectorAll(".skill-item").forEach((skill) => {
      skill.addEventListener("click", () => {
        const skillName = skill.textContent;
        this.showNotification(`You clicked on ${skillName}!`);
      });
    });

    // Add click effects to various elements
    document
      .querySelectorAll(".contact-item, .cert-item, .achievement-list li")
      .forEach((item) => {
        item.addEventListener("click", () => {
          window.animations.animateElement(item, "rainbow");
        });
      });
  }

  makeGlobalFunctions() {
    // Make functions globally accessible
    window.toggleFabMenu = () => this.toggleFabMenu();
    window.copyToClipboard = (text) => this.copyToClipboard(text);
    window.changeProfileImage = () => this.changeProfileImage();
    window.closeSocialMessage = () => this.closeSocialMessage();
    window.copyContactInfo = () => this.copyContactInfo();
    window.toggleTheme = () => this.toggleTheme();
    window.downloadResume = () => this.downloadResume();
    window.printResume = () => this.printResume();
    window.shareResume = () => this.shareResume();
  }

  toggleFabMenu() {
    const fabOptions = document.getElementById("fabOptions");
    const fabIcon = document.getElementById("fabIcon");

    if (this.fabMenuOpen) {
      fabOptions.classList.remove("active");
      fabIcon.className = "fas fa-plus";
      this.fabMenuOpen = false;
    } else {
      fabOptions.classList.add("active");
      fabIcon.className = "fas fa-times";
      this.fabMenuOpen = true;
    }
  }

  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showNotification("Copied to clipboard: " + text);
        })
        .catch(() => {
          this.fallbackCopyTextToClipboard(text);
        });
    } else {
      this.fallbackCopyTextToClipboard(text);
    }
  }

  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      this.showNotification("Copied to clipboard: " + text);
    } catch (err) {
      this.showNotification("Failed to copy text");
    }

    document.body.removeChild(textArea);
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981, #047857);
                color: white;
                padding: 15px 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                font-size: 14px;
                font-weight: 600;
                animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s;
                border: 2px solid #34d399;
            ">
                <i class="fas fa-check-circle" style="margin-right: 10px; font-size: 16px;"></i>
                ${message}
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  changeProfileImage() {
    this.showSocialConnectMessage();
    const currentImage = document.getElementById("profileImage");
    if (currentImage) {
      window.animations.scaleAnimation(currentImage);
    }
  }

  showSocialConnectMessage() {
    const existingMessage = document.getElementById("socialConnectMessage");
    if (existingMessage) {
      existingMessage.remove();
    }

    const socialMessage = document.createElement("div");
    socialMessage.id = "socialConnectMessage";
    socialMessage.innerHTML = this.getSocialMessageHTML();
    document.body.appendChild(socialMessage);

    setTimeout(() => {
      if (document.getElementById("socialConnectMessage")) {
        this.closeSocialMessage();
      }
    }, 10000);
  }

  getSocialMessageHTML() {
    return `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10001;
                text-align: center;
                min-width: 320px;
                max-width: 90vw;
                animation: socialModalSlideIn 0.5s ease;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
            ">
                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600;">
                        <i class="fas fa-handshake" style="margin-right: 10px; color: #ffd700;"></i>
                        Let's Connect!
                    </h3>
                    <p style="margin: 0; font-size: 1rem; opacity: 0.9;">
                        Follow me on these social platforms:
                    </p>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${this.getSocialLinksHTML()}
                </div>
                
                <div style="display: flex; justify-content: center; gap: 10px;">
                    <button onclick="closeSocialMessage()" class="modal-btn close-btn">
                        <i class="fas fa-times" style="margin-right: 5px;"></i>
                        Close
                    </button>
                    <button onclick="copyContactInfo()" class="modal-btn copy-btn">
                        <i class="fas fa-copy" style="margin-right: 5px;"></i>
                        Copy Email
                    </button>
                </div>
            </div>
            
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                animation: socialOverlayFadeIn 0.5s ease;
                backdrop-filter: blur(5px);
            " onclick="closeSocialMessage()">
            </div>
        `;
  }

  getSocialLinksHTML() {
    const socialLinks = [
      {
        name: "GitHub",
        url: "https://github.com/Sudhanshu-SRS",
        icon: "fab fa-github",
        bg: "#333",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sudhanshu-sakhare-873598189/",
        icon: "fab fa-linkedin",
        bg: "#0077b5",
      },
      {
        name: "X (Twitter)",
        url: "https://x.com/Sudhanshu_808",
        icon: "𝕏",
        bg: "#000",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/sudhanshu_sakhare/",
        icon: "fab fa-instagram",
        bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      },
    ];

    return socialLinks
      .map(
        (link) => `
            <a href="${
              link.url
            }" target="_blank" class="social-modal-link" style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 15px;
                background: ${link.bg};
                color: white;
                text-decoration: none;
                border-radius: 25px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            ">
                ${
                  link.icon.includes("fab")
                    ? `<i class="${link.icon}" style="font-size: 1.1rem;"></i>`
                    : `<span style="font-size: 1.1rem; font-weight: bold;">${link.icon}</span>`
                }
                ${link.name}
            </a>
        `
      )
      .join("");
  }

  closeSocialMessage() {
    const socialMessage = document.getElementById("socialConnectMessage");
    if (socialMessage) {
      socialMessage.style.animation = "socialModalSlideOut 0.3s ease";
      setTimeout(() => {
        socialMessage.remove();
      }, 300);
    }
  }

  copyContactInfo() {
    const contactInfo = `
🚀 Let's Connect!

📧 Email: sudhanshusakhare808@gmail.com
📱 Phone: +91 9284272018
📍 Location: Nagpur, India

🌐 Social Links:
• GitHub: https://github.com/Sudhanshu-SRS
• LinkedIn: https://www.linkedin.com/in/sudhanshu-sakhare-873598189/
• X (Twitter): https://x.com/Sudhanshu_808
• Instagram: https://www.instagram.com/sudhanshu_sakhare/

💼 Full Stack MERN Developer & Software Engineer
        `;

    this.copyToClipboard(contactInfo);
    this.closeSocialMessage();
  }

  toggleTheme() {
    const body = document.body;
    const themes = ["default", "dark", "colorful"];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.currentTheme = themes[nextIndex];

    body.className = this.currentTheme + "-theme";
    this.showNotification(`Switched to ${this.currentTheme} theme!`);
  }

  downloadResume() {
    this.showNotification("Preparing resume for download...");
    setTimeout(() => {
      window.print();
    }, 1000);
  }

  printResume() {
    window.print();
  }

  shareResume() {
    if (navigator.share) {
      navigator
        .share({
          title: "Sudhanshu - Interactive Resume",
          text: "Check out my interactive resume!",
          url: window.location.href,
        })
        .catch((err) => {
          console.log("Error sharing:", err);
          this.copyToClipboard(window.location.href);
          this.showNotification("Resume link copied to clipboard!");
        });
    } else {
      this.copyToClipboard(window.location.href);
      this.showNotification("Resume link copied to clipboard!");
    }
  }
}
