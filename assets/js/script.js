'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



/**
 * Scroll Reveal Animation
 * Uses IntersectionObserver for performant scroll-triggered animations
 */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger the animation slightly for each element
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));



/**
 * Animated Counter
 * Counts up from 0 to the target value with easing
 */

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();
  
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const current = Math.floor(easedProgress * target);
    
    // Format with comma separator for large numbers
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// Observe stat cards for counter animation
const statValues = document.querySelectorAll('.stat-value[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

statValues.forEach(el => counterObserver.observe(el));



/**
 * Skill Bar Animation
 * Animates skill progress bars when they come into view
 */

const skillBars = document.querySelectorAll('.skill-progress-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // The width is already set via inline style, 
      // we just trigger the CSS transition by toggling a class
      entry.target.style.transition = 'width 1.2s ease-in-out';
      const targetWidth = entry.target.style.width;
      entry.target.style.width = '0%';
      
      // Force reflow then set to target
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          entry.target.style.width = targetWidth;
        });
      });
      
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

skillBars.forEach(el => skillObserver.observe(el));