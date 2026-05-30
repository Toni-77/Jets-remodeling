document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL REVEAL ANIMATIONS (Intersection Observer API)
  // Automatically fades in sections when they scroll onto the screen
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
      } 
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));


  // 2. NAVIGATION LINKS ACTIVE HIGHLIGHT ON SCROLL
  // Highlights the correct navigation link based on the section currently on screen
  const sections = document.querySelectorAll('section[id], div[id]');
  window.addEventListener('scroll', () => {
    let current = 'home'; // Default section identifier
    
    sections.forEach(s => { 
      if (window.scrollY >= s.offsetTop - 150) {
        current = s.id; 
      } 
    });
    
    document.querySelectorAll('.nav-links a').forEach(a => {
      const targetHref = a.getAttribute('href');
      a.classList.toggle('active', targetHref === '#' + current);
    });
  });

});

// 3. PROJECT PORTFOLIO FILTER TABS
// Toggles the display of project cards based on the selected category button
// (Kept outside the loader wrapper so the HTML onclick="filterProjects()" triggers can find it)
function filterProjects(cat, btn) {
  // Switch highlighted tab state
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Show or hide project layout cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}

// 4. MOBILE HAMBURGER TOGGLE CONTROLS
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  // Toggle visibility classes on clicking the icon
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Automatically close drop drawer panel once an item section is targeted
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}
