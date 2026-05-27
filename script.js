document.addEventListener('DOMContentLoaded', () => {
    const iconBtns = document.querySelectorAll('.icon-btn');
    const toast    = document.getElementById('toast');
    let toastTimer = null;

    function showToast(msg, time = 2200) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.remove('hidden');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.classList.add('hidden'); }, time);
    }

    iconBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target === 'search')  { if (window.mitOpenSearch) window.mitOpenSearch(); return; }
            if (target === 'profile')    { window.location.href = 'perfil.html'; return; }
            if (target === 'community')  { window.location.href = 'comunidad.html'; return; }
            if (target === 'about')      { window.location.href = 'sobre-nosotros.html'; return; }
            if (target === 'cart')       { showToast('Cesta — próximamente'); return; }
            const el = document.getElementById(target);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                showToast('Sección "' + target + '" en desarrollo');
            }
        });
    });
});


/**
 * MITITILLA — Menú desplegable
 */
(function () {
    'use strict';

    const TILE_VARIANTS = [
        { outerFill: '#5BAF96', innerFill: '#5BAF96', cornerStyle: 'cut'   },
        { outerFill: 'white',   innerFill: '#5BAF96', cornerStyle: 'dot'   },
        { outerFill: 'white',   innerFill: '#5BAF96', cornerStyle: 'round' },
        { outerFill: 'white',   innerFill: '#5BAF96', cornerStyle: 'curve' },
        { outerFill: '#5BAF96', innerFill: '#5BAF96', cornerStyle: 'full'  },
        { outerFill: '#5BAF96', innerFill: 'white',   cornerStyle: 'cut'   },
        { outerFill: 'white',   innerFill: '#5BAF96', cornerStyle: 'cut'   },
        { outerFill: 'white',   innerFill: '#5BAF96', cornerStyle: 'round' },
        { outerFill: 'white',   innerFill: 'white',   cornerStyle: 'curve' },
        { outerFill: '#5BAF96', innerFill: '#5BAF96', cornerStyle: 'round' },
    ];

    function makeTileSVG(variant, idx) {
        const g   = '#5BAF96';
        const w   = 'white';
        const row = Math.floor(idx / 10);
        const col = idx % 10;
        const v   = TILE_VARIANTS[col] || TILE_VARIANTS[0];

        const bg          = (row === 0) ? v.outerFill : (v.outerFill === g ? w : g);
        const star        = bg === g ? w : g;
        const innerBg     = bg === g ? g : w;
        const innerBorder = bg === g ? w : g;

        let corners = '';
        const cs = v.cornerStyle;

        if (cs === 'cut') {
            corners = `
        <rect x="0" y="0" width="13" height="13" fill="${bg === g ? w : g}"/>
        <rect x="47" y="0" width="13" height="13" fill="${bg === g ? w : g}"/>
        <rect x="0" y="47" width="13" height="13" fill="${bg === g ? w : g}"/>
        <rect x="47" y="47" width="13" height="13" fill="${bg === g ? w : g}"/>`;
        } else if (cs === 'dot') {
            corners = `
        <circle cx="6"  cy="6"  r="4" fill="${bg === g ? w : g}"/>
        <circle cx="54" cy="6"  r="4" fill="${bg === g ? w : g}"/>
        <circle cx="6"  cy="54" r="4" fill="${bg === g ? w : g}"/>
        <circle cx="54" cy="54" r="4" fill="${bg === g ? w : g}"/>`;
        } else if (cs === 'round') {
            corners = `
        <circle cx="6"  cy="6"  r="6" fill="${bg === g ? w : g}"/>
        <circle cx="54" cy="6"  r="6" fill="${bg === g ? w : g}"/>
        <circle cx="6"  cy="54" r="6" fill="${bg === g ? w : g}"/>
        <circle cx="54" cy="54" r="6" fill="${bg === g ? w : g}"/>`;
        } else if (cs === 'curve') {
            corners = `
        <path d="M0,0 Q13,0 13,13 L0,13 Z"    fill="${bg === g ? w : g}"/>
        <path d="M60,0 Q47,0 47,13 L60,13 Z"   fill="${bg === g ? w : g}"/>
        <path d="M0,60 Q13,60 13,47 L0,47 Z"   fill="${bg === g ? w : g}"/>
        <path d="M60,60 Q47,60 47,47 L60,47 Z" fill="${bg === g ? w : g}"/>`;
        }

        return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" fill="${bg}"/>
      ${corners}
      <rect x="13" y="13" width="34" height="34" fill="${innerBg}" rx="2"/>
      <rect x="16" y="16" width="28" height="28" fill="${innerBorder}" rx="1.5"/>
      <polygon points="30,18 33,25.5 41,23.5 35.5,29 41,34.5 33,34.5 30,42 27,34.5 19,34.5 24.5,29 19,23.5 27,25.5"
               fill="${star}"/>
    </svg>`;
    }

    function buildPanel() {
        const navItems = [
            { label: 'Inicio',         href: 'index.html'         },
            { label: 'Tienda',         href: 'tienda.html'         },
            { label: 'Comunidad',      href: 'comunidad.html'      },
            { label: 'Sobre nosotros', href: 'sobre-nosotros.html' },
        ];

        const subLinks = [
            { label: 'Inicio',    href: 'index.html'         },
            { label: 'Tienda',    href: 'tienda.html'         },
            { label: 'Comunidad', href: 'comunidad.html'      },
            { label: 'About us',  href: 'sobre-nosotros.html' },
        ];

        let tilesHtml = '';
        for (let i = 0; i < 20; i++) {
            tilesHtml += `<div class="mit-tile-cell">${makeTileSVG(TILE_VARIANTS[i % 10], i)}</div>`;
        }

        const navHtml = navItems.map(item => {
            const isActive = window.location.href.includes(item.href);
            return `<li><a href="${item.href}"${isActive ? ' class="active"' : ''}>${item.label}</a></li>`;
        }).join('\n');

        const subHtml = subLinks.map(item => {
            const isActive = window.location.href.includes(item.href);
            return `<a href="${item.href}"${isActive ? ' class="active"' : ''}>${item.label}</a>`;
        }).join('\n');

        return `
<div class="mit-overlay" id="mitOverlay" aria-hidden="true"></div>

<nav class="mit-nav-panel" id="mitNavPanel" aria-label="Menú principal" aria-hidden="true">
  <div class="mit-panel-head">
    <button class="mit-panel-close" id="mitPanelClose" aria-label="Cerrar menú">&#x2715;</button>
  </div>

  <div class="mit-subnav" role="navigation" aria-label="Subnav">
    ${subHtml}
  </div>

  <div class="mit-panel-title">
    <h2>MENÚ <span class="dot">•</span> MITITILLA</h2>
  </div>

  <ul class="mit-nav-list" role="list">
    ${navHtml}
  </ul>

  <div class="mit-panel-deco" aria-hidden="true">
    ${tilesHtml}
  </div>
</nav>`;
    }

    function buildToggleButton() {
        return `<button class="mit-menu-toggle" id="mitMenuToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mitNavPanel">
  <span></span>
  <span></span>
</button>`;
    }

    function inject() {
        const panelWrapper = document.createElement('div');
        panelWrapper.innerHTML = buildPanel();
        document.body.appendChild(panelWrapper);

        const extraStyle = document.createElement('style');
        extraStyle.textContent = `
      .mit-panel-deco {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(2, 1fr);
        flex-shrink: 0;
      }
      .mit-tile-cell { aspect-ratio: 1; overflow: hidden; }
      .mit-tile-cell svg { width: 100%; height: 100%; display: block; }
    `;
        document.head.appendChild(extraStyle);

        const placeholder = document.querySelector('[data-mit-toggle-here]');
        if (placeholder) {
            placeholder.outerHTML = buildToggleButton();
        }

        window.mitInsertToggle = function (container) {
            if (typeof container === 'string') container = document.querySelector(container);
            if (!container) return;
            container.insertAdjacentHTML('beforeend', buildToggleButton());
            bindEvents();
        };

        bindEvents();
    }

    function bindEvents() {
        const toggle   = document.getElementById('mitMenuToggle');
        const panel    = document.getElementById('mitNavPanel');
        const overlay  = document.getElementById('mitOverlay');
        const closeBtn = document.getElementById('mitPanelClose');

        if (!toggle || !panel || !overlay) return;

        let isOpen = false;

        function openMenu() {
            isOpen = true;
            panel.classList.add('is-open');
            overlay.classList.add('is-visible');
            toggle.classList.add('is-open');
            panel.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            isOpen = false;
            panel.classList.remove('is-open');
            overlay.classList.remove('is-visible');
            toggle.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
        overlay.addEventListener('click', closeMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && isOpen) closeMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }

})();


/**
 * MITITILLA — Buscador overlay
 */
(function () {
    'use strict';

    const PAGES = [
        { label: 'Inicio',         desc: 'Página principal — guía gastronómica de Granada',  href: 'index.html'         },
        { label: 'Tienda',         desc: 'Compra la guía ilustrada y desplegable de Granada', href: 'tienda.html'         },
        { label: 'Comunidad',      desc: 'Comparte tu Granada y acumula puntos',              href: 'comunidad.html'      },
        { label: 'Sobre nosotros', desc: 'Conoce el equipo detrás de Mititilla',              href: 'sobre-nosotros.html' },
    ];

    function buildOverlay() {
        return `
<div class="mit-search-overlay" id="mitSearchOverlay" aria-hidden="true" role="dialog" aria-label="Buscador">
  <button class="mit-search-close" id="mitSearchClose" aria-label="Cerrar buscador">&#x2715;</button>
  <div class="mit-search-inner">
    <div class="mit-search-left">
      <div class="mit-search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
          <path d="M21 21l-6 -6"/>
        </svg>
        <input class="mit-search-input" id="mitSearchInput" type="text"
               placeholder="Buscar en Mititilla…" autocomplete="off" />
      </div>
    </div>
    <div class="mit-search-right">
      <ul class="mit-search-results" id="mitSearchResults" role="list"></ul>
    </div>
  </div>
</div>`;
    }

    function renderResults(query) {
        const list = document.getElementById('mitSearchResults');
        if (!list) return;
        const q = query.trim().toLowerCase();
        const filtered = q
            ? PAGES.filter(p => p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
            : PAGES;
        list.innerHTML = filtered.map(p => `
      <li class="mit-search-result">
        <a href="${p.href}">
          <span class="mit-search-result-label">${p.label}</span>
          <span class="mit-search-result-desc">${p.desc}</span>
        </a>
      </li>`).join('');
    }

    function inject() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = buildOverlay();
        document.body.appendChild(wrapper);

        const style = document.createElement('style');
        style.textContent = `
      .mit-search-overlay {
        position: fixed; inset: 0; z-index: 2000;
        background: #fff;
        display: flex; align-items: flex-start; justify-content: center;
        padding-top: 100px;
        opacity: 0; pointer-events: none;
        transform: translateY(-20px);
        transition: opacity .25s ease, transform .25s ease;
      }
      .mit-search-overlay.is-open {
        opacity: 1; pointer-events: all; transform: translateY(0);
      }
      .mit-search-close {
        position: absolute; top: 28px; right: 40px;
        background: none; border: none; cursor: pointer;
        font-size: 22px; color: #999; padding: 4px; line-height: 1;
      }
      .mit-search-close:hover { color: #000; }
      .mit-search-inner {
        width: 100%; max-width: 1300px;
        padding: 0 60px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 120px;
        align-items: start;
      }
      .mit-search-bar {
        display: flex; align-items: center; gap: 12px;
        border-bottom: 2px solid #000; padding-bottom: 14px;
      }
      .mit-search-input {
        flex: 1; border: none; outline: none;
        font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 300;
        color: #000; background: transparent;
      }
      .mit-search-input::placeholder { color: #bbb; }
      .mit-search-right { padding-top: 4px; }
      .mit-search-results { list-style: none; margin: 0; padding: 0; }
      .mit-search-result a {
        display: flex; flex-direction: column; gap: 3px;
        padding: 16px 0; border-bottom: 1px solid #eee;
        text-decoration: none; color: inherit;
        transition: opacity .15s;
      }
      .mit-search-result a:hover { opacity: .6; }
      .mit-search-result-label {
        font-family: 'Inter', sans-serif; font-size: 14px;
        font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
        color: #000;
      }
      .mit-search-result-desc {
        font-family: 'Inter', sans-serif; font-size: 13px;
        font-weight: 300; color: #888;
      }
    `;
        document.head.appendChild(style);

        const overlay   = document.getElementById('mitSearchOverlay');
        const input     = document.getElementById('mitSearchInput');
        const closeBtn  = document.getElementById('mitSearchClose');

        function openSearch() {
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            renderResults('');
            setTimeout(() => { if (input) input.focus(); }, 50);
        }

        function closeSearch() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (input) input.value = '';
        }

        window.mitOpenSearch = openSearch;

        if (input) {
            input.addEventListener('input', () => renderResults(input.value));
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSearch);
        }
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeSearch();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeSearch();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }

})();