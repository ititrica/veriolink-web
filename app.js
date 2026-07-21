document.addEventListener('DOMContentLoaded', () => {
  const iconLibrary = window.lucide;
  if (iconLibrary) iconLibrary.createIcons();

  const initBrandAssets = () => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const pageDepth = segments.length && segments[segments.length - 1].includes('.') ? segments.length - 1 : segments.length;
    const prefix = '../'.repeat(pageDepth);
    const logoPath = `${prefix}assets/brand/veriolink-logo.webp`;
    const faviconPath = `${prefix}assets/brand/veriolink-favicon.webp`;

    document.querySelectorAll('.brand-mark').forEach((mark) => {
      const logo = document.createElement('img');
      logo.className = 'brand-mark brand-logo';
      logo.src = logoPath;
      logo.alt = 'VerioLink logo';
      mark.replaceWith(logo);
    });

    if (!document.querySelector('link[data-veriolink-favicon]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/webp';
      favicon.sizes = '512x512';
      favicon.href = faviconPath;
      favicon.dataset.veriolinkFavicon = 'true';
      document.head.appendChild(favicon);
    }
  };

  initBrandAssets();

  const initThreads = () => {
    const canvas = document.querySelector('.threads-canvas');
    if (!canvas) return;
    const section = canvas.closest('.hero');
    const context = canvas.getContext('2d');
    if (!context || !section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const palette = [
      'rgba(12, 14, 18, 0.12)',
      'rgba(49, 87, 255, 0.15)',
      'rgba(255, 115, 95, 0.11)',
      'rgba(12, 14, 18, 0.08)'
    ];
    const pointer = { x: 0.55, y: 0.46 };
    const target = { ...pointer };
    let width = 0;
    let height = 0;
    let deviceScale = 1;
    let time = 0;
    let frameId;

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    };

    const drawThreads = () => {
      context.clearRect(0, 0, width, height);
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;
      const lineCount = window.innerWidth < 700 ? 14 : 24;

      for (let index = 0; index < lineCount; index += 1) {
        const progress = index / (lineCount - 1);
        const origin = width * (-0.12 + progress * 1.24);
        const amplitude = 16 + progress * 22;
        const speed = 0.48 + progress * 0.16;
        context.beginPath();

        for (let step = 0; step <= 58; step += 1) {
          const vertical = step / 58;
          const wave = Math.sin(vertical * 5.2 + time * speed + index * 0.42) * amplitude;
          const secondaryWave = Math.sin(vertical * 11.5 - time * 0.18 + index) * 5;
          const pointerPull = Math.exp(-Math.pow((vertical - pointer.y) * 3.1, 2)) * (pointer.x - 0.5) * 76;
          const x = origin + wave + secondaryWave + pointerPull;
          const y = vertical * height;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = palette[index % palette.length];
        context.lineWidth = index % 6 === 0 ? 1.5 : 0.85;
        context.shadowColor = index % 6 === 0 ? palette[index % palette.length] : 'transparent';
        context.shadowBlur = index % 6 === 0 ? 6 : 0;
        context.stroke();
      }
      context.shadowBlur = 0;
    };

    const render = () => {
      drawThreads();
      if (!reducedMotion.matches && !document.hidden) {
        time += 0.012;
        frameId = window.requestAnimationFrame(render);
      }
    };

    const movePointer = (event) => {
      const bounds = section.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      target.y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    };

    resize();
    section.addEventListener('pointermove', movePointer, { passive: true });
    section.addEventListener('pointerleave', () => {
      target.x = 0.55;
      target.y = 0.46;
    }, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    render();

    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener('change', () => {
        window.cancelAnimationFrame(frameId);
        render();
      });
    }
  };

  initThreads();

  const initLinkCoreMedia = () => {
    const isLinkCorePage = /hdmi-to-usbc-adapter\.html$/i.test(window.location.pathname);
    const isJapanese = document.documentElement.lang === 'ja';
    const assetRoot = isJapanese
      ? (isLinkCorePage ? '../../assets/products/linkcore-01' : '../assets/products/linkcore-01')
      : (isLinkCorePage ? '../assets/products/linkcore-01' : 'assets/products/linkcore-01');
    const cover = `${assetRoot}/cover/05_architectural_platform_white_c6daf2.webp`;
    const details = [
      ['04_lifestyle_workspace_white_c6daf2.webp', isJapanese ? 'ノートPCとディスプレイをつなぐ、静かなワークスペース。' : 'A quiet workspace companion for laptop-to-display connections.', 'wide'],
      ['67f81004-e6bc-4bf8-8058-032efb505b57.webp', isJapanese ? '会議室でも、接続してすぐに使えるプラグ＆プレイ。' : 'Plug-and-play setup for presentations and shared screens.', 'tall'],
      ['ChatGPT Image 2026年6月8日 10_00_17.webp', isJapanese ? 'アルミニウム合金ボディと透明キャップ。' : 'Aluminium alloy housing and protective caps.', 'half'],
      ['Gemini_Generated_Image_gml55cgml55cgml5.webp', isJapanese ? '画面出力、PD充電、ヘッドホンをひとつの構成で。' : 'Display output, PD charging and headphone use in one setup.', 'half'],
      ['Gemini_Generated_Image_haotzwhaotzwhaot.webp', isJapanese ? '大画面でのゲームやエンターテインメントにも。' : 'Built for big-screen play and portable entertainment.', 'half'],
      ['Gemini_Generated_Image_nxk8tvnxk8tvnxk8.webp', isJapanese ? 'ミラーリングと拡張表示の2つのモード。' : 'Mirror a laptop screen or extend the desktop across two displays.', 'half'],
      ['Gemini_Generated_Image_o6zsi2o6zsi2o6zs.webp', isJapanese ? 'HDMI、3.5mmオーディオ、PD電源をわかりやすく接続。' : 'A clear port layout for HDMI, 3.5mm audio and PD power.', 'wide']
    ];

    const imageMarkup = (file, alt, className, lazy = true) => `<figure class="gallery-item gallery-item--${className}"><img src="${assetRoot}/details/${file}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} /><figcaption>${alt}</figcaption></figure>`;
    const galleryMarkup = `<section class="product-image-story"><div class="container"><div class="product-image-story-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>${isJapanese ? 'See it in use' : 'See it in use'}</p><h2>${isJapanese ? '毎日の接続を、<br /><em>写真で見る。</em>' : 'Designed around<br /><em>the everyday.</em>'}</h2></div><p class="section-description">${isJapanese ? '提供された製品写真をもとに、デスク、会議室、エンターテインメント、デュアルディスプレイでの使い方を紹介します。' : 'The product images show a compact aluminium bridge for desks, meeting rooms, entertainment setups and dual-screen work.'}</p></div><div class="product-gallery">${details.map(([file, caption, size]) => imageMarkup(file, caption, size)).join('')}</div></div></section>`;

    if (isLinkCorePage) {
      const detailArt = document.querySelector('.detail-art');
      if (detailArt) {
        detailArt.outerHTML = `<figure class="detail-image reveal reveal-delay"><img src="${cover}" alt="${isJapanese ? 'アルミニウムボディと透明キャップを備えたLinkCore 01 HDMI to USB-Cアダプター' : 'LinkCore 01 HDMI to USB-C adapter with aluminium body and transparent cap'}" /><figcaption>${isJapanese ? 'アルミニウム合金ボディ、透明保護キャップ。' : 'Aluminium alloy body, transparent protective cap.'}</figcaption></figure>`;
      }
      if (!document.querySelector('.product-image-story')) {
        document.querySelector('.product-info-section')?.insertAdjacentHTML('afterend', galleryMarkup);
      }

      const intro = document.querySelector('.product-detail-intro');
      if (intro) intro.textContent = isJapanese
        ? 'LinkCore 01は、HDMI映像をUSB-Cディスプレイへ届けるコンパクトなブリッジ。アルミニウム合金ボディ、PD 100W給電、3.5mmオーディオに対応し、デスクからリビングまで活躍します。'
        : 'LinkCore 01 is a compact bridge from HDMI video to a USB-C display. Its aluminium alloy body, PD 100W pass-through and 3.5mm audio support make it ready for desks, meeting rooms and the living room.';

      const featureCopy = isJapanese
        ? [['4K映像出力', '最大4K / 30Hzのディスプレイ出力で、会議資料や映像を大画面に。'], ['アルミ合金ボディ', '放熱性と耐久性を考えた金属ボディに、透明保護キャップを組み合わせています。'], ['PD 100W給電', '画面を映しながら、対応機器へ最大100WのPower Delivery。'], ['プラグ＆プレイ', 'ドライバー不要。接続するだけでミラーリングや拡張表示を始められます。']]
        : [['4K display output', 'Up to 4K / 30Hz output for presentations, films and a larger everyday workspace.'], ['Aluminium alloy body', 'A durable, heat-conscious metal housing paired with a transparent protective cap.'], ['PD 100W pass-through', 'Keep a compatible device powered while sending the display signal.'], ['Plug and play', 'No driver setup shown. Connect, choose mirror or extend, and get started.']];
      document.querySelectorAll('.feature-item').forEach((item, index) => {
        if (!featureCopy[index]) return;
        const heading = item.querySelector('h3');
        const paragraph = item.querySelector('p');
        if (heading) heading.textContent = featureCopy[index][0];
        if (paragraph) paragraph.textContent = featureCopy[index][1];
      });

      const specStrip = isJapanese
        ? [['映像', '最大4K / 30Hz'], ['電力', 'PD 最大100W'], ['オーディオ', '3.5mm対応']]
        : [['Video', 'Up to 4K / 30Hz'], ['Power', 'PD up to 100W'], ['Audio', '3.5mm support']];
      document.querySelectorAll('.product-spec').forEach((item, index) => {
        if (!specStrip[index]) return;
        const label = item.querySelector('span');
        const value = item.querySelector('strong');
        if (label) label.textContent = specStrip[index][0];
        if (value) value.textContent = specStrip[index][1];
      });

      const specRows = isJapanese
        ? [['映像入力', 'HDMI'], ['ディスプレイ出力', 'USB-Cディスプレイ接続、最大4K / 30Hz'], ['給電', 'PDパススルー、最大100W'], ['オーディオ', '3.5mmオーディオジャック対応'], ['モード', 'ミラーリング / 拡張表示'], ['セットアップ', 'ドライバー不要のプラグ＆プレイ']]
        : [['Video input', 'HDMI'], ['Display output', 'USB-C display connection, up to 4K / 30Hz'], ['Power delivery', 'PD pass-through up to 100W'], ['Audio', '3.5mm audio jack support'], ['Modes', 'Mirror and extended display modes'], ['Setup', 'Plug and play, no driver installation shown']];
      document.querySelectorAll('.spec-table tbody tr').forEach((row, index) => {
        if (!specRows[index]) return;
        const cells = row.querySelectorAll('th, td');
        if (cells[0]) cells[0].textContent = specRows[index][0];
        if (cells[1]) cells[1].textContent = specRows[index][1];
      });
    }

    if (isJapanese && !isLinkCorePage) {
      const heroVisual = document.querySelector('.hero-visual');
      if (heroVisual) {
        heroVisual.innerHTML = `<div class="hero-product-photo"><img src="${cover}" alt="アルミニウムボディと透明キャップを備えたLinkCore 01 HDMI to USB-Cアダプター" /></div><div class="hero-note note-top"><span class="note-dot"></span> 4K映像出力</div><div class="hero-note note-bottom"><span class="note-dot accent"></span> PD 100W対応</div><div class="stage-caption"><span>LINKCORE 01</span><i data-lucide="arrow-right" aria-hidden="true"></i><span>HDMI / USB-C</span></div>`;
        if (iconLibrary) iconLibrary.createIcons();
      }
      const productArt = document.querySelector('.product-card[data-category="video"] .product-art');
      if (productArt) {
        productArt.classList.add('product-art-image');
        productArt.innerHTML = `<img src="${cover}" alt="LinkCore 01 HDMI to USB-Cアダプター" /><span class="art-tag">定番</span><div class="art-label">HDMI <b>to</b> USB-C</div>`;
      }
    }
  };

  initLinkCoreMedia();

  const initFiberLineMedia = () => {
    const isFiberLinePage = /usb-c-to-usb-c-cable\.html$/i.test(window.location.pathname);
    const isJapanese = document.documentElement.lang === 'ja';
    const assetRoot = isJapanese
      ? (isFiberLinePage ? '../../assets/products/fiberline-02' : '../assets/products/fiberline-02')
      : (isFiberLinePage ? '../assets/products/fiberline-02' : 'assets/products/fiberline-02');
    const cover = `${assetRoot}/cover/ChatGPT Image 2026年6月8日 14_14_41.webp`;
    const details = [
      ['ChatGPT Image 2026年6月10日 14_11_59.webp', isJapanese ? 'ノートPC、タブレット、高出力デバイスの急速充電に対応。' : 'Built to charge laptops, tablets, and high-power setups.', 'wide'],
      ['ChatGPT Image 2026年6月10日 14_02_59.webp', isJapanese ? '堅牢で放熱性に優れたコネクターシールドのクローズアップ。' : 'A close-up of the robust, heat-conscious connector shield.', 'tall'],
      ['A+ .1.手机.webp', isJapanese ? '外出先でもスマートフォンの急速充電をサポート。' : 'Supports high-speed charging for mobile devices on the go.', 'half'],
      ['Gemini_Generated_Image_rx4detrx4detrx4d.webp', isJapanese ? '毎日の使いやすさを考えた、しなやかなナイロン編み込み。' : 'Flexible braided texture designed for everyday flexibility.', 'half'],
      ['Gemini_Generated_Image_vt4i4cvt4i4cvt4i.webp', isJapanese ? '繰り返しの曲げや引っ張りに耐える耐久テスト済み。' : 'Tested to withstand repeated bends, twists, and pulls.', 'half'],
      ['ChatGPT Image 2026年6月9日 15_58_14.webp', isJapanese ? '現代のデスクハブや充電スタンドにすっきり収まります。' : 'Fits cleanly into modern desk hubs and charging setups.', 'half'],
      ['ChatGPT Image 2026年6月10日 14_16_55.webp', isJapanese ? '整理しやすく、いつでも使える毎日の接続ブリッジ。' : 'Your daily connection bridge, organized and ready for work.', 'wide']
    ];

    const imageMarkup = (file, alt, className, lazy = true) => `<figure class="gallery-item gallery-item--${className}"><img src="${assetRoot}/details/${file}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} /><figcaption>${alt}</figcaption></figure>`;
    const galleryMarkup = `<section class="product-image-story"><div class="container"><div class="product-image-story-heading"><div><p class="eyebrow"><span class="eyebrow-line"></span>${isJapanese ? '使用イメージ' : 'See it in use'}</p><h2>${isJapanese ? '毎日の充電を、<br /><em>写真で見る。</em>' : 'Designed around<br /><em>the everyday.</em>'}</h2></div><p class="section-description">${isJapanese ? 'デスク、モバイル、高出力充電など、さまざまな日常の場面で活躍するケーブルの写真です。' : 'The product images show a flexible 100W charging cable built for everyday speed, power delivery, and tidy setups.'}</p></div><div class="product-gallery">${details.map(([file, caption, size]) => imageMarkup(file, caption, size)).join('')}</div></div></section>`;

    if (isFiberLinePage) {
      const detailArt = document.querySelector('.detail-art');
      if (detailArt) {
        detailArt.outerHTML = `<figure class="detail-image reveal reveal-delay"><img src="${cover}" alt="${isJapanese ? 'しなやかなナイロン編み込みのFiberLine 02 USB-C to USB-C ケーブル' : 'FiberLine 02 USB-C to USB-C Cable with flexible braided nylon body'}" /><figcaption>${isJapanese ? '高耐久ナイロン編み込み、100W PD対応。' : 'Durable braided nylon weave, 100W PD ready.'}</figcaption></figure>`;
      }
      if (!document.querySelector('.product-image-story')) {
        document.querySelector('.product-info-section')?.insertAdjacentHTML('afterend', galleryMarkup);
      }
    }

    if (isJapanese && !isFiberLinePage) {
      const productArt = document.querySelector('.product-card .product-art.art-cable');
      if (productArt) {
        productArt.classList.add('product-art-image');
        productArt.innerHTML = `<img src="${cover}" alt="FiberLine 02 USB-C to USB-C ケーブル" /><span class="art-tag">新製品</span><div class="art-label">100W <b>power</b></div>`;
      }
    }
  };

  initFiberLineMedia();

  const initBenefits = () => {
    const isJapanese = document.documentElement.lang === 'ja';
    const signalGrid = document.querySelector('.signal-grid');
    if (!signalGrid) return;
    if (!isJapanese) {
      signalGrid.innerHTML = `
        <div class="signal-item"><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>One-year product warranty</strong><small>We cover product defects for one year from the purchase date.</small></span></div>
        <div class="signal-item"><i data-lucide="store" aria-hidden="true"></i><span><strong>Available on Amazon.co.jp</strong><small>Shop with confidence online whenever you need to.</small></span></div>
        <div class="signal-item"><i data-lucide="message-circle" aria-hidden="true"></i><span><strong>Japanese-language support</strong><small>Questions about product use and specifications are welcome.</small></span></div>
        <div class="signal-item"><i data-lucide="clipboard-check" aria-hidden="true"></i><span><strong>Quality checked</strong><small>We review every product with usability and stability in mind.</small></span></div>`;
      if (iconLibrary) iconLibrary.createIcons();
      return;
    }
    signalGrid.innerHTML = `
      <div class="signal-item"><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>1年間の製品保証</strong><small>ご購入日から1年間、製品の不具合に対応します。</small></span></div>
      <div class="signal-item"><i data-lucide="store" aria-hidden="true"></i><span><strong>Amazon.co.jpで販売</strong><small>オンラインでいつでも安心してご購入いただけます。</small></span></div>
      <div class="signal-item"><i data-lucide="message-circle" aria-hidden="true"></i><span><strong>日本語サポート</strong><small>製品の使い方や仕様に関するご質問に対応します。</small></span></div>
      <div class="signal-item"><i data-lucide="clipboard-check" aria-hidden="true"></i><span><strong>安心の品質確認</strong><small>使いやすさと安定性を重視し、製品を確認しています。</small></span></div>`;
    if (iconLibrary) iconLibrary.createIcons();
  };

  initBenefits();

  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const searchToggle = document.querySelector('.search-toggle');
  const searchPanel = document.querySelector('.search-panel');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('#site-search');
  const announcement = document.querySelector('.announcement');
  const toast = document.querySelector('.toast');
  const toastText = toast?.querySelector('span');
  let toastTimer;

  const showToast = (message) => {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  header && window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 8), { passive: true });

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" aria-hidden="true"></i>`;
    if (iconLibrary) iconLibrary.createIcons();
  });

  mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    if (iconLibrary) iconLibrary.createIcons();
  }));

  const setSearchState = (open) => {
    searchPanel.classList.toggle('is-open', open);
    searchPanel.setAttribute('aria-hidden', String(!open));
    if (open) window.setTimeout(() => searchInput.focus(), 120);
  };
  searchToggle?.addEventListener('click', () => setSearchState(!searchPanel.classList.contains('is-open')));
  searchClose?.addEventListener('click', () => setSearchState(false));
  searchInput?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (query.length < 2) return;
    showToast(`Searching the collection for "${query}"`);
  });

  document.querySelector('.announcement-close')?.addEventListener('click', () => {
    announcement.setAttribute('hidden', '');
  });

  const productCards = [...document.querySelectorAll('.product-card')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const productTotal = document.querySelector('.product-total');
  const emptyProducts = document.querySelector('.empty-products');

  const filterProducts = (filter) => {
    let visibleCount = 0;
    productCards.forEach((card) => {
      const isVisible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });
    if (productTotal) productTotal.textContent = `${String(visibleCount).padStart(2, '0')} products`;
    if (emptyProducts) emptyProducts.hidden = visibleCount !== 0;
  };

  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    filterProducts(button.dataset.filter);
  }));
  document.querySelector('.reset-filter')?.addEventListener('click', () => filterButtons[0].click());

  document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formNote = document.querySelector('.form-note');
    const email = document.querySelector('#email');
    if (!email.value) return;
    formNote.textContent = 'You are on the list. Welcome to the connected everyday.';
    email.value = '';
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
});
