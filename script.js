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
            if (target === 'search')    { if (window.mitOpenSearch) window.mitOpenSearch(); return; }
            if (target === 'cart')      { if (window.mitOpenCart)   window.mitOpenCart();   return; }
            if (target === 'profile')   { window.location.href = 'perfil.html';        return; }
            if (target === 'community') { window.location.href = 'comunidad.html';     return; }
            if (target === 'about')     { window.location.href = 'sobrenosotros.html'; return; }
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
        const col = idx % 10;
        const v   = TILE_VARIANTS[col] || TILE_VARIANTS[0];
        const row = Math.floor(idx / 10);

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
            { label: 'Sobre nosotros', href: 'sobrenosotros.html'  },
        ];

        const subLinks = [
            { label: 'Inicio',    href: 'index.html'         },
            { label: 'Tienda',    href: 'tienda.html'         },
            { label: 'Comunidad', href: 'comunidad.html'      },
            { label: 'About us',  href: 'sobrenosotros.html'  },
        ];


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
        { label: 'Inicio',         desc: 'Página principal — guía gastronómica de Granada',  href: 'index.html'        },
        { label: 'Tienda',         desc: 'Compra la guía ilustrada y desplegable de Granada', href: 'tienda.html'        },
        { label: 'Comunidad',      desc: 'Comparte tu Granada y acumula puntos',              href: 'comunidad.html'     },
        { label: 'Sobre nosotros', desc: 'Conoce el equipo detrás de Mititilla',              href: 'sobrenosotros.html' },
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


/**
 * MITITILLA — Carrito desplegable
 */
(function () {
    'use strict';

    let cartQty = 0;

    try {
        const saved = localStorage.getItem('mitCart');
        if (saved) cartQty = JSON.parse(saved).qty || 0;
    } catch(e) {}

    function saveCart() {
        try { localStorage.setItem('mitCart', JSON.stringify({ qty: cartQty })); } catch(e) {}
    }

    function buildCartPanel() {
        return `
<div class="mit-cart-overlay" id="mitCartOverlay"></div>
<div class="mit-cart-panel" id="mitCartPanel">

  <div class="mit-cart-head">
    <p class="mit-cart-title">TU CESTA</p>
    <button class="mit-cart-close" id="mitCartClose">&#x2715;</button>
  </div>

  <div class="mit-cart-empty" id="mitCartEmpty">
    <p>Tu cesta está vacía.</p>
    <a href="tienda.html">Ver la tienda →</a>
  </div>

  <div class="mit-cart-content" id="mitCartContent">
    <div class="mit-cart-item-row">
      <div class="mit-cart-item-img"></div>
      <div class="mit-cart-item-info">
        <p class="mit-cart-item-cat">GUÍA GASTRONÓMICA<br>FORMATO FÍSICO</p>
        <p class="mit-cart-item-name">mititilla</p>
        <p class="mit-cart-item-price">24,00€</p>
      </div>
    </div>
    <div class="mit-cart-qty-row">
      <button class="mit-cart-qty-btn" onclick="window.mitCartChangeQty(-1)">—</button>
      <span id="mitCartQtyNum">1</span>
      <button class="mit-cart-qty-btn" onclick="window.mitCartChangeQty(1)">+</button>
    </div>
  </div>

  <div class="mit-cart-footer" id="mitCartFooter">
    <div class="mit-cart-subtotal">
      <span>SUBTOTAL</span>
      <span id="mitCartSubtotal">24,00€</span>
    </div>
    <button class="mit-cart-buy-btn" onclick="window.location.href='cesta.html'">
      COMPRAR →
    </button>
  </div>

</div>`;
    }

    function updateCartUI() {
        const empty   = document.getElementById('mitCartEmpty');
        const content = document.getElementById('mitCartContent');
        const footer  = document.getElementById('mitCartFooter');
        const qtyNum  = document.getElementById('mitCartQtyNum');
        const subtot  = document.getElementById('mitCartSubtotal');
        const badge   = document.getElementById('mitCartBadge');

        if (cartQty > 0) {
            if (empty)   empty.style.display   = 'none';
            if (content) content.style.display = 'flex';
            if (footer)  footer.style.display  = 'flex';
            if (qtyNum)  qtyNum.textContent    = cartQty;
            if (subtot)  subtot.textContent    = (24 * cartQty).toFixed(2).replace('.', ',') + '€';
            if (badge) { badge.textContent = cartQty; badge.style.display = 'flex'; }
        } else {
            if (empty)   empty.style.display   = 'block';
            if (content) content.style.display = 'none';
            if (footer)  footer.style.display  = 'none';
            if (badge)   badge.style.display   = 'none';
        }
    }

    function openCart() {
        const panel   = document.getElementById('mitCartPanel');
        const overlay = document.getElementById('mitCartOverlay');
        if (!panel || !overlay) return;
        panel.classList.add('is-open');
        overlay.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
        updateCartUI();
    }

    function closeCart() {
        const panel   = document.getElementById('mitCartPanel');
        const overlay = document.getElementById('mitCartOverlay');
        if (!panel || !overlay) return;
        panel.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        document.body.style.overflow = '';
    }

    window.mitOpenCart = openCart;

    window.mitAddToCart = function () {
        cartQty = Math.min(10, cartQty + 1);
        saveCart();
        openCart();
    };

    window.mitCartChangeQty = function (delta) {
        cartQty = Math.max(0, cartQty + delta);
        saveCart();
        if (cartQty === 0) closeCart();
        updateCartUI();
    };

    function inject() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = buildCartPanel();
        document.body.appendChild(wrapper);

        const style = document.createElement('style');
        style.textContent = `
      .mit-cart-overlay {
        position: fixed; inset: 0; z-index: 1400;
        background: rgba(0,0,0,0.4);
        opacity: 0; pointer-events: none;
        transition: opacity .25s ease;
      }
      .mit-cart-overlay.is-visible { opacity: 1; pointer-events: all; }

      .mit-cart-panel {
        position: fixed; top: 0; right: -420px;
        width: 400px; height: 100vh;
        background: #fff;
        z-index: 1500;
        box-shadow: -4px 0 32px rgba(0,0,0,0.12);
        display: flex; flex-direction: column;
        transition: right .3s ease;
        box-sizing: border-box;
      }
      .mit-cart-panel.is-open { right: 0; }

      .mit-cart-head {
        display: flex; justify-content: space-between; align-items: center;
        padding: 28px 28px 20px;
        border-bottom: 1px solid #e0e0e0;
        flex-shrink: 0;
      }
      .mit-cart-title {
        font-family: 'Inter', sans-serif;
        font-size: 11px; font-weight: 700;
        letter-spacing: .14em; text-transform: uppercase;
        color: #000; margin: 0;
      }
      .mit-cart-close {
        background: none; border: none; cursor: pointer;
        font-size: 20px; color: #999; padding: 4px; line-height: 1;
      }
      .mit-cart-close:hover { color: #000; }

      .mit-cart-empty {
        flex: 1;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 12px; padding: 40px;
        text-align: center;
      }
      .mit-cart-empty p {
        font-family: 'Inter', sans-serif;
        font-size: 14px; color: #666; margin: 0;
      }
      .mit-cart-empty a {
        font-family: 'Inter', sans-serif;
        font-size: 12px; font-weight: 600;
        letter-spacing: .08em; text-transform: uppercase;
        color: #000; text-decoration: none;
      }
      .mit-cart-empty a:hover { opacity: .6; }

      .mit-cart-content {
        flex: 1;
        display: none; flex-direction: column;
        gap: 20px; padding: 28px;
        overflow-y: auto;
      }

      .mit-cart-item-row {
        display: flex; gap: 16px; align-items: flex-start;
      }
      .mit-cart-item-img {
        width: 80px; height: 80px;
        background: #111; flex-shrink: 0;
      }
      .mit-cart-item-info { flex: 1; }
      .mit-cart-item-cat {
        font-family: 'Inter', sans-serif;
        font-size: 9px; font-weight: 600;
        letter-spacing: .1em; text-transform: uppercase;
        color: #888; margin: 0 0 4px; line-height: 1.5;
      }
      .mit-cart-item-name {
        font-family: 'Inter', sans-serif;
        font-size: 24px; font-weight: 800;
        text-transform: lowercase; letter-spacing: -.01em;
        color: #000; margin: 0 0 6px;
      }
      .mit-cart-item-price {
        font-family: 'Inter', sans-serif;
        font-size: 16px; font-weight: 700;
        color: #000; margin: 0;
      }

      .mit-cart-qty-row {
        display: flex; align-items: center;
        border: 1px solid #000; width: fit-content;
      }
      .mit-cart-qty-btn {
        width: 36px; height: 36px;
        background: none; border: none;
        font-size: 16px; cursor: pointer;
        font-family: 'Inter', sans-serif;
        display: flex; align-items: center; justify-content: center;
      }
      .mit-cart-qty-btn:hover { background: #f0f0f0; }
      #mitCartQtyNum {
        width: 36px; text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 14px; font-weight: 600;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        height: 36px; line-height: 36px;
      }

      .mit-cart-footer {
        display: none; flex-direction: column;
        gap: 16px; padding: 20px 28px 28px;
        border-top: 1px solid #e0e0e0;
        flex-shrink: 0;
      }
      .mit-cart-subtotal {
        display: flex; justify-content: space-between;
        font-family: 'Inter', sans-serif;
        font-size: 12px; font-weight: 700;
        letter-spacing: .08em; text-transform: uppercase;
        color: #000;
      }
      .mit-cart-buy-btn {
        width: 100%;
        background: #000; color: white;
        border: none; padding: 18px;
        font-family: 'Inter', sans-serif;
        font-size: 12px; font-weight: 700;
        letter-spacing: .12em; text-transform: uppercase;
        cursor: pointer;
      }
      .mit-cart-buy-btn:hover { background: #222; }

      #mitCartBadge {
        position: absolute; top: -4px; right: -4px;
        background: #c64439; color: white;
        width: 16px; height: 16px;
        border-radius: 50%;
        font-size: 9px; font-weight: 700;
        display: none; align-items: center; justify-content: center;
        font-family: 'Inter', sans-serif;
        pointer-events: none;
      }
    `;
        document.head.appendChild(style);

        // Badge en el icono del carrito
        const cartBtn = document.querySelector('[data-target="cart"]');
        if (cartBtn) {
            cartBtn.style.position = 'relative';
            const badge = document.createElement('span');
            badge.id = 'mitCartBadge';
            cartBtn.appendChild(badge);
        }

        const closeBtn = document.getElementById('mitCartClose');
        const overlay  = document.getElementById('mitCartOverlay');
        if (closeBtn) closeBtn.addEventListener('click', closeCart);
        if (overlay)  overlay.addEventListener('click', closeCart);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeCart();
        });

        // Restaurar badge si había items guardados
        updateCartUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }

})();