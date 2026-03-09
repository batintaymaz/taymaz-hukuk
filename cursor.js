// Cursor
var cursor = document.getElementById('cursor');
var ring = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .service-card, .blog-card, .topic-card').forEach(function(el) {
  el.addEventListener('mouseenter', function() { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '0.8'; });
  el.addEventListener('mouseleave', function() { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '0.5'; });
});

// Reveal
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

// Counter
function animateCounter(el, target) {
  var current = 0, step = target / 60;
  var timer = setInterval(function() {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 25);
}
var statsEl = document.querySelector('.stats-bar');
if (statsEl) {
  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        document.querySelectorAll('[data-target]').forEach(function(el) { animateCounter(el, parseInt(el.dataset.target)); });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsEl);
}
