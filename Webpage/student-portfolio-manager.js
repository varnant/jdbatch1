/**
 * Student Portfolio Management System
 * For JDCOEM Java Full Stack Trainees
 * Repository-based student directory management
 */

class StudentPortfolioManager {
  constructor() {
    this.currentFilter = "all";
    this.currentSearch = "";
    this.isInitialized = false;

    // Student directory configuration
    this.config = {
      // Base paths for student directories
      basePath: "../",

      // Expected file names in student directories
      defaultFiles: {
        resume: "Sudhanshu_Sakhare.html", // Main portfolio file
        profileImage: "sudhanshuPic.jpg",
        stylesheet: "SudhanshuCss.css",
        jsFolder: "js/",
      },

      // Batch configuration
      batches: {
        1: { name: "Batch 1", color: "#4CAF50" },
        2: { name: "Batch 2", color: "#2196F3" },
      },
    };

    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    console.log("🎓 Student Portfolio Manager: Initializing...");
    this.loadExternalStyles();
    this.loadStudentData();
    this.setupEventListeners();
    this.renderStudents();
    this.isInitialized = true;
    console.log("✅ Student Portfolio Manager: Ready!");
  }

  /**
   * Load external CSS styles
   */
  loadExternalStyles() {
    // Check if styles are already loaded
    if (document.getElementById("portfolio-manager-styles")) {
      return;
    }

    const link = document.createElement("link");
    link.id = "portfolio-manager-styles";
    link.rel = "stylesheet";
    link.href = "./student-portfolio-styles.css";
    link.onload = () => {
      console.log("✅ Student portfolio styles loaded successfully");
    };
    link.onerror = () => {
      console.warn(
        "⚠️ Failed to load external styles, falling back to inline styles"
      );
      this.addInlineStyles();
    };

    document.head.appendChild(link);
  }

  /**
   * Fallback inline styles if external CSS fails to load
   */
  addInlineStyles() {
    if (document.getElementById("portfolio-manager-fallback-styles")) {
      return;
    }

    const styles = document.createElement("style");
    styles.id = "portfolio-manager-fallback-styles";
    styles.textContent = `
      /* Basic fallback styles */
      .student-card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 25px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }
      
      .student-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(76, 175, 80, 0.2);
        border-color: #4CAF50;
      }
      
      .student-image-container {
        width: 100px;
        height: 100px;
        margin: 0 auto 20px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid #4CAF50;
      }
      
      .student-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .portfolio-btn-unique {
        padding: 15px 25px;
        border-radius: 25px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        cursor: pointer;
        text-decoration: none;
        display: block;
        text-align: center;
        font-weight: 600;
      }
      
      .filter-btn {
        padding: 10px 20px;
        border: 2px solid #4CAF50;
        background: white;
        color: #4CAF50;
        border-radius: 20px;
        cursor: pointer;
        margin: 5px;
      }
      
      .filter-btn.active {
        background: #4CAF50;
        color: white;
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * Student Data Repository
   * Update this section when students upload their folders
   */
  loadStudentData() {
    this.studentDirectories = [
      // ACTIVE STUDENTS (Folders uploaded)
      {
        folderName: "Sudhanshu_Sakhare",
        name: "Sudhanshu R Sakhare",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Sudhanshu_Sakhare.html",
        profileImage: "sudhanshuPic.jpg",
        uploadDate: "2025-07-18",
        specialization: "Full Stack MERN Development",
      },
      {
        folderName: "Mansi_Nandanwar",
        name: "Mansi Nandanwar",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Mansi_Nandanwar.html",
        profileImage: "Mansi_Nandanwar.jpg",
        uploadDate: "2025-07-19",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Pranay_Bhagat_MCA",
        name: "Pranay Bhagat",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Pranay_Bhagat.html",
        profileImage: "photo.jpg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },

      // PENDING STUDENTS (Awaiting folder upload)
      // Batch 1 Students
      {
        folderName: "FulanshuKuthe",
        name: "Fulanshu Kuthe",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Fulanshu_Kuthe.html",
        profileImage: "Fulanshu_Kuthe.jpg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },

      // Batch 2 Students
      {
        folderName: "Gargee_Purwar_MCA",
        name: "Gargee Purwar",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Gargee_Purwar.html",
        profileImage: "GargeePurwar.jpg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Utkarsha_ingale",
        name: "Utkarsha Ingale",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "utkarsha.html",
        profileImage: "utkarsha.jpg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },

      {
        folderName: "Jayant_Resume",
        name: "Jayant Meshram",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Resume_Fullstack.html",
        profileImage: "Profile.jpeg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },

      {
        folderName: "Rupali_Resume",
        name: "Rupali",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "index.html",
        profileImage: "Rupali-profile.jpg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Pratiksha_Roshankhede",
        name: "Pratiksha Roshankhede",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "resume.html",
        profileImage: "photo.jpeg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Sarika_Khorgade_Mca",
        name: "Sarika Khorgade",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "RC.html",
        profileImage: "photo.jpg",
        uploadDate: "2025-07-20",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Vaidehi_Warambhe",
        name: "Vaidehi Warambhe",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "resume.html",
        profileImage: "Profile.jpeg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Ishika_Wadichar",
        name: "Ishika Wadichar",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Ishika.html",
        profileImage: "Ishika.jpg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Vaidehi_Bhilawe",
        name: "Vaidehi Bhilawe",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Vaidehiresume.html",
        profileImage: "Vaidehi.jpg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Aachal_katkar",
        name: "Achal Katkar",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "AachalResume.html",
        profileImage: "aachal-profile.jpg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Sarang_Marotkar",
        name: "Sarang Marotkar",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Sarang_Marotkar_MCA.html",
        profileImage: "sarang.jpg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Varsha_Mohod_MCA",
        name: "Varsha Mohod",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Varsha_Mohod_RESUME.html",
        profileImage: "img1.jpeg",
        uploadDate: "2025-07-21",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Purwa_ughade_Ds",
        name: "Purwa Ughade",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "resume.html",
        profileImage: "Profilephoto.jpeg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Prashika_Thool",
        name: "Prashika Thool",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "prashika.html",
        profileImage: "prashika.jpg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Vaibhavi_Ghoom",
        name: "Vaibhavi Ghoom",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "vaibhavi.html",
        profileImage: "GHOMVS.jpg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Niraj_Gore_DS",
        name: "Niraj Gore",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "ResumeNG.html",
        profileImage: "nirajgore.jpeg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },
      {
        folderName: "Gayatri_jaiswal_ds",
        name: "Gayatri Jaiswal",
        course: "MCA",
        batch: 1,
        status: "active",
        resumeFile: "Resume.html",
        profileImage: "image.jpg",
        uploadDate: "2025-07-22",
        specialization: "Java Full Stack Development",
      },

      // ADD MORE STUDENTS HERE AS THEY UPLOAD FOLDERS
    ];
  }

  /**
   * Generate placeholder image for students without uploaded photos
   */
  generatePlaceholderImage(name) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const bgColor = "4CAF50"; // Single color for all students
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&size=120&background=${bgColor}&color=fff&bold=true&format=svg`;
  }

  /**
   * Create student card HTML with unique portfolio button
   */
  createStudentCard(student) {
    const isActive = student.status === "active";
    const portfolioUrl = isActive
      ? `${this.config.basePath}${student.folderName}/${student.resumeFile}`
      : "#";
    const imageUrl = isActive
      ? `${this.config.basePath}${student.folderName}/${student.profileImage}`
      : this.generatePlaceholderImage(student.name);

    // Generate unique card ID for hover effects
    const cardId = `student-card-${student.folderName.replace(
      /[^a-zA-Z0-9]/g,
      "-"
    )}`;
    // Format date as DD-MM-YYYY
    const formatDate = (dateString) => {
      if (dateString === "pending" || dateString === "active")
        return dateString;

      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    return `
            <div class="student-card ${student.status}" 
                 id="${cardId}"
                 data-name="${student.name.toLowerCase()}" 
                 data-course="${student.course.toLowerCase()}" 
                 data-batch="${student.batch}"
                 data-status="${student.status}"
                 onmouseenter="this.classList.add('card-hover')"
                 onmouseleave="this.classList.remove('card-hover')">
                
                <div class="card-header">
                    <div class="status-badge ${student.status}">
                        <i class="fas ${
                          isActive ? "fa-check-circle" : "fa-clock"
                        }"></i>
                        <span>${
                          isActive ? "Portfolio Live" : "Portfolio Pending"
                        }</span>
                    </div>
                    <div class="batch-indicator batch-${student.batch}">
                        Batch ${student.batch}
                    </div>
                </div>

                <div class="card-body">
                    <div class="student-image-container ${
                      isActive ? "active" : "pending"
                    }">
                        <img src="${imageUrl}" 
                             alt="${student.name}" 
                             class="student-image" 
                             onerror="this.src='${this.generatePlaceholderImage(
                               student.name
                             )}'">
                        
                        <!-- Animated border -->
                        <div class="image-border-animation"></div>
                    </div>

                    <div class="student-info">
                        <h3 class="student-name">
                            <span class="name-text">${student.name}</span>
                            <span class="name-highlight"></span>
                        </h3>
                        <div class="student-details">
                            <span class="course-badge course-${student.course
                              .toLowerCase()
                              .replace(/\s+/g, "-")}">${student.course}</span>
                        </div>
                        <div class="specialization">
                            <i class="fas fa-star specialization-icon"></i>
                            ${student.specialization}
                        </div>
                    </div>
                </div>

                <div class="card-actions">
                    ${
                      isActive
                        ? `<a href="${portfolioUrl}" target="_blank" class="portfolio-btn-unique">
                            <div class="btn-content">
                                <div class="btn-icon-wrapper">
                                    <i class="fas fa-rocket btn-icon"></i>
                                </div>
                                <div class="btn-text-wrapper">
                                    <span class="btn-main-text">View Portfolio</span>
                                    <span class="btn-sub-text">Interactive Resume</span>
                                </div>
                            </div>
                            <div class="btn-glow"></div>
                            <div class="btn-particles">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>`
                        : `<button class="portfolio-btn-disabled" disabled>
                            <div class="btn-content">
                                <div class="btn-icon-wrapper">
                                    <i class="fas fa-hourglass-half btn-icon"></i>
                                </div>
                                <div class="btn-text-wrapper">
                                    <span class="btn-main-text">Portfolio Pending</span>
                                    <span class="btn-sub-text">Awaiting Upload</span>
                                </div>
                            </div>
                        </button>`
                    }
                </div>

                ${
                  student.uploadDate !== "pending"
                    ? `<div class="upload-date">
                        <i class="fas fa-calendar"></i>
                        Uploaded: ${formatDate(student.uploadDate)}
                    </div>`
                    : `<div class="pending-status">
                        <i class="fas fa-upload"></i>
                        Awaiting folder upload
                    </div>`
                }

                <!-- Particle Effect for Hover -->
                <div class="card-particles">
                    <div class="particle" style="--delay: 0.1s; --x: 20%; --y: 30%;"></div>
                    <div class="particle" style="--delay: 0.3s; --x: 80%; --y: 20%;"></div>
                    <div class="particle" style="--delay: 0.5s; --x: 60%; --y: 70%;"></div>
                    <div class="particle" style="--delay: 0.7s; --x: 30%; --y: 80%;"></div>
                    <div class="particle" style="--delay: 0.9s; --x: 90%; --y: 60%;"></div>
                </div>
            </div>
        `;
  }

  /**
   * Filter students based on current criteria
   */
  filterStudents(students) {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
        student.course
          .toLowerCase()
          .includes(this.currentSearch.toLowerCase()) ||
        student.specialization
          .toLowerCase()
          .includes(this.currentSearch.toLowerCase());

      let matchesFilter = true;
      if (this.currentFilter === "batch1" && student.batch !== 1)
        matchesFilter = false;
      if (this.currentFilter === "batch2" && student.batch !== 2)
        matchesFilter = false;
      if (this.currentFilter === "active" && student.status !== "active")
        matchesFilter = false;
      if (
        this.currentFilter === "mca" &&
        !student.course.toLowerCase().includes("mca")
      )
        matchesFilter = false;
      if (
        this.currentFilter === "btech" &&
        !student.course.toLowerCase().includes("btech")
      )
        matchesFilter = false;

      return matchesSearch && matchesFilter;
    });
  }

  /**
   * Render students to the page
   */
  renderStudents() {
    const batch1Grid = document.getElementById("batch1Grid");
    const batch2Grid = document.getElementById("batch2Grid");
    const noResults = document.getElementById("noResults");

    if (!batch1Grid || !batch2Grid || !noResults) {
      console.warn("Required DOM elements not found");
      return;
    }

    const filteredStudents = this.filterStudents(this.studentDirectories);
    const batch1Students = filteredStudents.filter((s) => s.batch === 1);
    const batch2Students = filteredStudents.filter((s) => s.batch === 2);

    batch1Grid.innerHTML = batch1Students
      .map((student) => this.createStudentCard(student))
      .join("");
    batch2Grid.innerHTML = batch2Students
      .map((student) => this.createStudentCard(student))
      .join("");

    this.updateStatistics(batch1Students, batch2Students);
    this.updateBatchTitles(batch1Students, batch2Students);
    this.setupCardClickHandlers();

    const totalResults = filteredStudents.length;
    noResults.style.display = totalResults === 0 ? "block" : "none";
  }

  /**
   * Update statistics counters
   */
  updateStatistics(batch1Students, batch2Students) {
    const totalActive = this.studentDirectories.filter(
      (s) => s.status === "active"
    ).length;
    const totalStudents = batch1Students.length + batch2Students.length;

    this.animateCounter("totalCount", totalStudents);
    this.animateCounter("batch1Count", batch1Students.length);
    this.animateCounter("batch2Count", batch2Students.length);

    // Update active count if element exists
    const activeCountElement = document.getElementById("activeCount");
    if (activeCountElement) {
      this.animateCounter("activeCount", totalActive);
    }
  }

  /**
   * Update batch section titles
   */
  updateBatchTitles(batch1Students, batch2Students) {
    const batch1Title = document.querySelector("#batch1Section .batch-title");
    const batch2Title = document.querySelector("#batch2Section .batch-title");

    const batch1Active = batch1Students.filter(
      (s) => s.status === "active"
    ).length;
    const batch2Active = batch2Students.filter(
      (s) => s.status === "active"
    ).length;

    if (batch1Title) {
      batch1Title.innerHTML = `
                <i class="fas fa-users"></i>
                ${this.config.batches[1].name}
                <span class="batch-count">(${batch1Students.length} total, ${batch1Active} active)</span>
            `;
    }

    if (batch2Title) {
      batch2Title.innerHTML = `
                <i class="fas fa-users"></i>
                ${this.config.batches[2].name}
                <span class="batch-count">(${batch2Students.length} total, ${batch2Active} active)</span>
            `;
    }
  }

  /**
   * Animate counter with smooth transition
   */
  animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 1000;
    const startTime = performance.now();
    const startValue = parseInt(element.textContent) || 0;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * progress
      );

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.currentSearch = e.target.value;
        this.renderStudents();
      });
    }

    // Update filter buttons
    this.updateFilterButtons();

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        this.currentFilter = button.dataset.filter;
        this.renderStudents();
      });
    });
  }

  /**
   * Update filter buttons with simplified options
   */
  updateFilterButtons() {
    const filterButtonsContainer = document.querySelector(".filter-buttons");
    if (filterButtonsContainer) {
      filterButtonsContainer.innerHTML = `
                <button class="filter-btn active" data-filter="all">All Students</button>
                <button class="filter-btn" data-filter="batch1">Batch 1</button>
                <button class="filter-btn" data-filter="batch2">Batch 2</button>
                <button class="filter-btn" data-filter="active">Active Portfolios</button>
                <button class="filter-btn" data-filter="mca">MCA Students</button>
                <button class="filter-btn" data-filter="btech">B.Tech Students</button>
            `;
    }

    // Add active portfolios stat card
    const statsContainer = document.querySelector(".stats-banner");
    if (statsContainer && !document.getElementById("activeCount")) {
      const activeStatCard = document.createElement("div");
      activeStatCard.className = "stat-card";
      activeStatCard.innerHTML = `
                <span class="stat-number" id="activeCount">0</span>
                <span class="stat-label">Active Portfolios</span>
            `;
      statsContainer.appendChild(activeStatCard);
    }

    // Update search placeholder
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.placeholder = "Search by name, course, or specialization...";
    }
  }

  /**
   * Setup click handlers for portfolio cards
   */
  setupCardClickHandlers() {
    document.querySelectorAll(".student-card.active").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (
          e.target.closest(".portfolio-btn-unique") ||
          e.target.closest(".social-btn")
        )
          return;

        const portfolioLink = card.querySelector(".portfolio-btn-unique");
        if (portfolioLink) {
          portfolioLink.click();
        }
      });
    });
  }

  /**
   * Management functions for easy student addition/updates
   */
  addNewStudent(studentData) {
    const defaultStudent = {
      status: "pending",
      resumeFile: "index.html",
      profileImage: "profile.jpg",
      uploadDate: "pending",
      batch: studentData.course?.includes("MCA") ? 1 : 2,
      specialization: "Java Full Stack Development",
      ...studentData,
    };

    this.studentDirectories.push(defaultStudent);
    this.renderStudents();
    console.log(`✅ Added new student: ${defaultStudent.name}`);
    return defaultStudent;
  }

  updateStudentStatus(folderName, updates) {
    const student = this.studentDirectories.find(
      (s) => s.folderName === folderName
    );
    if (student) {
      Object.assign(student, updates);
      this.renderStudents();
      console.log(`📝 Updated ${folderName}:`, updates);
      return student;
    }
    console.log(`❌ Student folder ${folderName} not found`);
    return null;
  }

  getStudentTemplate() {
    return {
      folderName: "FirstName_LastName_Course",
      name: "FirstName LastName",
      course: "MCA", // or "B.Tech CSE", etc.
      batch: 1, // or 2
      status: "pending", // or "active"
      resumeFile: "FirstName_LastName.html", // main resume file
      profileImage: "profilePic.jpg",
      linkedin: "https://www.linkedin.com/in/student-profile/",
      github: "https://github.com/student-username",
      twitter: "https://x.com/student-username",
      instagram: "https://www.instagram.com/student-username/",
      email: "student@example.com",
      uploadDate: "pending", // or actual date "2025-01-XX"
      specialization: "Java Full Stack Development",
    };
  }

  // Utility methods for repository management
  getRepositoryStats() {
    const stats = {
      total: this.studentDirectories.length,
      active: this.studentDirectories.filter((s) => s.status === "active")
        .length,
      pending: this.studentDirectories.filter((s) => s.status === "pending")
        .length,
      batch1: this.studentDirectories.filter((s) => s.batch === 1).length,
      batch2: this.studentDirectories.filter((s) => s.batch === 2).length,
      mca: this.studentDirectories.filter((s) => s.course.includes("MCA"))
        .length,
      btech: this.studentDirectories.filter((s) => s.course.includes("B.Tech"))
        .length,
    };

    console.table(stats);
    return stats;
  }

  // Method to refresh the display (for manual refresh)
  refresh() {
    console.log("🔄 Refreshing student portfolio display...");
    this.renderStudents();
  }
}

// Initialize the Student Portfolio Manager
window.studentPortfolioManager = new StudentPortfolioManager();

// Make management functions globally available
window.addNewStudent = (studentData) =>
  window.studentPortfolioManager.addNewStudent(studentData);
window.updateStudentStatus = (folderName, updates) =>
  window.studentPortfolioManager.updateStudentStatus(folderName, updates);
window.getStudentTemplate = () =>
  window.studentPortfolioManager.getStudentTemplate();
window.getRepositoryStats = () =>
  window.studentPortfolioManager.getRepositoryStats();
window.refreshPortfolios = () => window.studentPortfolioManager.refresh();

// Console helper
console.log(`
🎓 JDCOEM Student Portfolio Manager Loaded!
==========================================

📊 Management Functions:
• addNewStudent(studentData) - Add a new student
• updateStudentStatus(folderName, updates) - Update existing student
• getStudentTemplate() - Get template for new student
• getRepositoryStats() - View current statistics
• refreshPortfolios() - Manually refresh display

📁 To add a student who uploaded their folder:
updateStudentStatus("Student_Folder_Name", {
    status: "active",
    uploadDate: "2025-01-XX"
});

📝 To add a completely new student:
addNewStudent({
    folderName: "John_Doe_MCA",
    name: "John Doe",
    course: "MCA",
    batch: 1,
   
});

📈 View current stats: getRepositoryStats()
`);
