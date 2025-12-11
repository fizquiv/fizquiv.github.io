// Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    // Set initial theme
    document.documentElement.setAttribute("data-theme", this.currentTheme);

    // Update toggle button text
    this.updateToggleButton();

    // Add event listener to toggle button
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    localStorage.setItem("theme", this.currentTheme);
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      if (this.currentTheme === "dark") {
        toggleBtn.innerHTML = "Light Theme";
      } else {
        toggleBtn.innerHTML = "Dark Theme";
      }
    }
  }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeToggle();
});
