document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".container");
  const sidebar = document.querySelector(".sidebar");
  const videos = document.querySelectorAll(".side-video video");
  const video_01 = document.querySelectorAll(".side-video_01 video");

  function setActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");

    // Update sidebar background color and font color
    const sectionBackgroundColor = window.getComputedStyle(
      sections[index]
    ).backgroundColor;
    sidebar.style.backgroundColor = sectionBackgroundColor;

    // Change font color to white if background is dark
    if (sectionBackgroundColor === "rgb(51, 51, 51)") {
      // #333333
      sidebar
        .querySelectorAll("a")
        .forEach((link) => (link.style.color = "white"));
    } else {
      sidebar
        .querySelectorAll("a")
        .forEach((link) => (link.style.color = "#333"));
    }

    // Trigger animations for the current section
    sections.forEach((section) => section.classList.remove("active"));
    sections[index].classList.add("active");
  }

  window.addEventListener("scroll", setActiveLink);

  // Smooth scrolling for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Video play on hover for .side-video elements
  videos.forEach((video) => {
    video.addEventListener("mouseover", function () {
      this.play();
    });

    video.addEventListener("mouseout", function () {
      this.pause();
      this.currentTime = 0;
    });
  });

  // Video play on hover for .side-video_01 elements
  video_01.forEach((video) => {
    video.addEventListener("mouseover", function () {
      this.play();
    });

    video.addEventListener("mouseout", function () {
      this.pause();
      this.currentTime = 0;
    });
  });

  // Initial setup
  setActiveLink();

  // Function to check if an element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle animations on scroll
  function handleScrollAnimations() {
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("active");
      }
    });
  }

  // Initial check for animations
  handleScrollAnimations();

  // Add scroll event listener for animations
  window.addEventListener("scroll", handleScrollAnimations);
});
