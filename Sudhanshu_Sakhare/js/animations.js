// animations.js - All animation-related functions
class ResumeAnimations {
  constructor() {
    this.initializeAnimations();
  }

  initializeAnimations() {
    this.addAnimationStyles();
    this.setupParticleSystem();
    this.setupScrollAnimations();
  }

  addAnimationStyles() {
    const animationStyles = document.createElement("style");
    animationStyles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes bounceIn {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.05); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }

            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }

            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }

            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float 8s linear infinite;
            }

            .fab-options.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .fab-options {
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }

            .smooth-transition {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .scale-hover:hover {
                transform: scale(1.05);
            }
        `;
    document.head.appendChild(animationStyles);
  }

  setupParticleSystem() {
    this.createParticle = () => {
      const particleSystem = document.getElementById("particleSystem");
      if (!particleSystem) return;

      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 3 + 8 + "s";
      particleSystem.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 11000);
    };

    // Create particles continuously
    setInterval(this.createParticle, 300);
  }

  setupScrollAnimations() {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "bounceIn 0.8s ease";
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  animateElement(element, animationType = "rainbow") {
    element.style.animation = "none";
    setTimeout(() => {
      element.style.animation = `${animationType} 1s ease`;
    }, 10);
  }

  scaleAnimation(element) {
    element.style.transform = "scale(0.9)";
    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 150);
  }

  slideInNotification(element) {
    element.style.animation = "slideIn 0.5s ease";
  }
}
