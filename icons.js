(function () {
  const paths = {
    activity: '<path d="M3 12h4l2-8 4 16 2-8h6"/>',
    'arrow-left-right': '<path d="M8 7 4 11l4 4"/><path d="M4 11h16"/><path d="m16 17 4-4-4-4"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    'arrow-up-right': '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    'battery-charging': '<path d="M7 7h10v10H7z"/><path d="M17 10h2v4h-2"/><path d="m12 9-2 4h3l-1 3 3-5h-3z"/>',
    box: '<path d="m3 7 9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'clipboard-check': '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2"/><path d="m8 13 2 2 5-5"/>',
    gauge: '<path d="M4 14a8 8 0 1 1 16 0"/><path d="m12 12 4-4"/><path d="M4 18h16"/>',
    'hard-drive': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h.01M11 15h.01M3 10h18"/>',
    'heart-handshake': '<path d="M7 11a4 4 0 0 1 5-5 4 4 0 0 1 5 5l-5 6z"/><path d="m3 13 4 4 3-2 3 3 8-8"/>',
    'lightbulb': '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a6 6 0 1 1 8 0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z"/>',
    laptop: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M2 20h20"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    'message-circle': '<path d="M20 11a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L4 20l1-4a8 8 0 1 1 15-5z"/>',
    'monitor-up': '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4M8 11l3-3 2 2 3-3"/>',
    'package-check': '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/><path d="m9 16 2 2 4-4"/>',
    'pocket-knife': '<path d="M6 3h12v18H6z"/><path d="M6 8h12"/><path d="M10 5h4"/><path d="M9 13h6M9 17h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    'plug-zap': '<path d="M8 3v6M16 3v6M6 9h12v2a6 6 0 0 1-12 0z"/><path d="m13 15-3 4h3l-1 3 4-5h-3z"/>',
    'repeat-2': '<path d="m2 9 3-3 3 3"/><path d="M5 6h9a4 4 0 0 1 4 4v1"/><path d="m22 15-3 3-3-3"/><path d="M19 18h-9a4 4 0 0 1-4-4v-1"/>',
    ruler: '<path d="m3 17 14-14 4 4L7 21H3z"/><path d="m13 7 4 4M10 10l4 4M7 13l4 4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    'search-x': '<circle cx="11" cy="11" r="7"/><path d="m8.5 8.5 5 5M13.5 8.5l-5 5M20 20l-4-4"/>',
    'shield-check': '<path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    store: '<path d="M4 10v10h16V10"/><path d="M3 10 5 4h14l2 6"/><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M9 20v-5h6v5"/>',
    waves: '<path d="M2 8c2.5-2 5.5-2 8 0s5.5 2 8 0 3.5-2 4-1"/><path d="M2 14c2.5-2 5.5-2 8 0s5.5 2 8 0 3.5-2 4-1"/>',
    'wifi-off': '<path d="M1 1 23 23"/><path d="M5 9a12 12 0 0 1 14 0M8 13a7 7 0 0 1 8 0M11 17a2.5 2.5 0 0 1 2 0"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    'shopping-cart': '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2 11h11l2-8H6"/>'
  };

  const createIcons = () => {
    document.querySelectorAll('i[data-lucide]').forEach((icon) => {
      const name = icon.getAttribute('data-lucide');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('aria-hidden', icon.getAttribute('aria-hidden') || 'true');
      svg.setAttribute('class', `lucide lucide-${name}`);
      svg.innerHTML = paths[name] || paths.activity;
      icon.replaceWith(svg);
    });
  };

  window.lucide = { createIcons };
})();
