const navigationLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

function setCurrent(id) {
  for (const link of navigationLinks) {
    if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function updateNavigation() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= innerHeight * .35) current = section;
  }
  if (current) setCurrent(current.id);
}

for (const link of navigationLinks) {
  link.addEventListener('click', () => setCurrent(link.hash.slice(1)));
}
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (sections.some(section => section.id === id)) setCurrent(id);
});

if ('IntersectionObserver' in window) {
  const navigationObserver = new IntersectionObserver(updateNavigation, {
    rootMargin: '-10% 0px -65% 0px', threshold: 0
  });
  sections.forEach(section => navigationObserver.observe(section));

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px 32px 0px' });
    for (const section of document.querySelectorAll('[data-reveal]')) {
      section.classList.add('will-reveal');
      revealObserver.observe(section);
    }
  }
}
updateNavigation();
