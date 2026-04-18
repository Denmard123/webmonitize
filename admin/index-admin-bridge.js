/**
 * AIM FOAM SHOP — index-admin-bridge.js
 * 
 * Tambahkan script ini ke index.html tepat sebelum </body>:
 *   <script src="index-admin-bridge.js"></script>
 * 
 * Script ini membaca data dari localStorage yang diset oleh admin.html
 * dan memanipulasi DOM index.html secara langsung (pure DOM manipulation).
 * Juga mendengarkan BroadcastChannel untuk live-update real-time.
 */

(function() {
  const STORAGE_KEY = 'aim_admin_data';

  // ── Baca data dari localStorage ──
  function getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  // ── Apply semua perubahan ke DOM ──
  function applyData(data) {
    if (!data) return;

    try { applyHero(data.hero); }          catch(e) { console.warn('[admin-bridge] hero:', e); }
    try { applyAbout(data.about); }        catch(e) { console.warn('[admin-bridge] about:', e); }
    try { applyCounts(data.counts); }      catch(e) { console.warn('[admin-bridge] counts:', e); }
    try { applyAboutVideo(data['about-video']); } catch(e) { console.warn('[admin-bridge] about-video:', e); }
    try { applyServices(data.services); }  catch(e) { console.warn('[admin-bridge] services:', e); }
    try { applyTestimonials(data.testimonials); } catch(e) { console.warn('[admin-bridge] testimonials:', e); }
    try { applyOnlineShop(data.onlineshop); }     catch(e) { console.warn('[admin-bridge] onlineshop:', e); }
    try { applyContact(data.contact); }    catch(e) { console.warn('[admin-bridge] contact:', e); }
    try { applyFooter(data.footer); }      catch(e) { console.warn('[admin-bridge] footer:', e); }
  }

  // ─────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────
  function applyHero(d) {
    if (!d) return;
    const section = document.querySelector('#hero');
    if (!section) return;

    const h1 = section.querySelector('h1');
    const h2 = section.querySelector('h2');
    const btn = section.querySelector('.btn-get-whatsapp');

    if (h1) h1.textContent = d.h1;
    if (h2) h2.textContent = d.h2;
    if (btn) {
      btn.href = d.btnLink;
      // Pertahankan ikon WhatsApp, hanya update teks
      const icon = btn.querySelector('i');
      btn.textContent = ' ' + d.btnText;
      if (icon) btn.prepend(icon);
    }
  }

  // ─────────────────────────────────────────
  // ABOUT
  // ─────────────────────────────────────────
  function applyAbout(d) {
    if (!d) return;
    const section = document.querySelector('#about');
    if (!section) return;

    // Deskripsi utama di section-title
    const titleP = section.querySelector('.section-title p');
    if (titleP) titleP.textContent = d.desc;

    // Kolom kiri — paragraf pertama
    const leftCol  = section.querySelector('.col-lg-6:first-of-type p');
    const rightCol = section.querySelector('.col-lg-6.pt-4 p:first-of-type');
    if (leftCol)  leftCol.textContent  = d.leftText;
    if (rightCol) rightCol.textContent = d.rightText;

    // Keunggulan (li items)
    const ul = section.querySelector('ul');
    if (ul && d.features) {
      ul.innerHTML = d.features.map(f =>
        `<li><i class="ri-check-double-line"></i> ${escTxt(f)}</li>`
      ).join('');
    }
  }

  // ─────────────────────────────────────────
  // COUNTS
  // ─────────────────────────────────────────
  function applyCounts(d) {
    if (!d || !d.items) return;
    const section = document.querySelector('#counts');
    if (!section) return;

    const row = section.querySelector('.row');
    if (!row) return;

    row.innerHTML = d.items.map(item => `
      <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
        <div class="count-box">
          <span data-purecounter-start="0" data-purecounter-end="${item.value}" data-purecounter-duration="2" class="purecounter">${item.value}</span>
          <p>${escTxt(item.label)}</p>
        </div>
      </div>
    `).join('');

    // Re-init PureCounter jika tersedia
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  }

  // ─────────────────────────────────────────
  // ABOUT VIDEO
  // ─────────────────────────────────────────
  function applyAboutVideo(d) {
    if (!d) return;
    const section = document.querySelector('#about-video');
    if (!section) return;

    const h3  = section.querySelector('h3');
    const italic = section.querySelector('.fst-italic');
    const closing = section.querySelectorAll('.content > p');
    const ul = section.querySelector('ul');

    if (h3) h3.textContent = d.title;
    if (italic) italic.textContent = d.italic;

    // Paragraf penutup (biasanya elemen p terakhir di .content)
    if (closing && closing.length >= 2) {
      closing[closing.length - 1].textContent = d.closing;
    }

    if (ul && d.products) {
      ul.innerHTML = d.products.map(p =>
        `<li><i class="bx bx-check-double"></i> ${escTxt(p)}</li>`
      ).join('');
    }
  }

  // ─────────────────────────────────────────
  // SERVICES
  // ─────────────────────────────────────────
  function applyServices(d) {
    if (!d) return;
    const section = document.querySelector('#services');
    if (!section) return;

    const titleEl = section.querySelector('.section-title h2');
    const descEl  = section.querySelector('.section-title p');
    if (titleEl) titleEl.textContent = d.title;
    if (descEl)  descEl.textContent  = d.desc;

    if (!d.items) return;
    const row = section.querySelector('.row');
    if (!row) return;

    const colorClasses = ['iconbox-blue','iconbox-orange','iconbox-pink','iconbox-yellow','iconbox-red','iconbox-teal'];
    const delays       = [100, 200, 300, 100, 200];

    row.innerHTML = d.items.map((item, i) => {
      const colorClass = colorClasses[i % colorClasses.length];
      const delay      = delays[i % delays.length];
      const mt         = i < 3 ? (i === 0 ? '' : 'mt-4 mt-md-0') : (i === 3 ? 'mt-4' : 'mt-4');
      return `
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch ${mt}" data-aos="zoom-in" data-aos-delay="${delay}">
          <div class="icon-box ${colorClass}">
            ${item.img ? `<img src="${escAttr(item.img)}" alt="${escAttr(item.name)}" style="width:60%">` : ''}
            <h4>${escTxt(item.name)}</h4>
            <p>${escTxt(item.desc)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─────────────────────────────────────────
  // TESTIMONIALS
  // ─────────────────────────────────────────
  function applyTestimonials(d) {
    if (!d) return;
    const section = document.querySelector('#testimonials');
    if (!section) return;

    const titleEl = section.querySelector('.section-title h2');
    const descEl  = section.querySelector('.section-title p');
    if (titleEl) titleEl.textContent = d.title;
    if (descEl)  descEl.textContent  = d.desc;

    if (!d.items) return;
    const wrapper = section.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = d.items.map(item => `
      <div class="swiper-slide">
        <div class="testimonial-item">
          <p>
            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
            ${escTxt(item.text)}
            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
          </p>
          <h3>${escTxt(item.name)}</h3>
          <h4>${escTxt(item.role)}</h4>
        </div>
      </div>
    `).join('');

    // Re-init Swiper jika tersedia
    if (typeof Swiper !== 'undefined') {
      const swiperEl = section.querySelector('.testimonials-slider');
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.update();
      }
    }
  }

  // ─────────────────────────────────────────
  // ONLINE SHOP
  // ─────────────────────────────────────────
  function applyOnlineShop(d) {
    if (!d) return;
    const section = document.querySelector('#onlineshop');
    if (!section) return;

    const titleEl = section.querySelector('.section-title h2');
    const descEl  = section.querySelector('.section-title p');
    if (titleEl) titleEl.textContent = d.title;
    if (descEl)  descEl.textContent  = d.desc;

    if (!d.platforms) return;
    const row = section.querySelector('.row.justify-content-center');
    if (!row) return;

    row.innerHTML = d.platforms.map(p => `
      <div class="col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center" data-aos="zoom-in">
        <a href="${escAttr(p.url)}" target="_blank">
          <img src="${escAttr(p.img)}" class="img-fluid" alt="${escAttr(p.name)}">
        </a>
      </div>
    `).join('');
  }

  // ─────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────
  function applyContact(d) {
    if (!d) return;
    const section = document.querySelector('#contact');
    if (!section) return;

    const descEl = section.querySelector('.section-title p');
    if (descEl) descEl.textContent = d.desc;

    // Alamat
    const addrP = section.querySelector('.address p');
    if (addrP) addrP.textContent = d.address;

    // Email
    const emailP = section.querySelector('.email p');
    if (emailP) emailP.textContent = d.email;

    // Phone
    const phoneP = section.querySelector('.phone p');
    if (phoneP) phoneP.textContent = d.phone;

    // Maps iframe
    const iframe = section.querySelector('iframe');
    if (iframe && d.maps) iframe.src = d.maps;
  }

  // ─────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────
  function applyFooter(d) {
    if (!d) return;
    const footer = document.querySelector('#footer');
    if (!footer) return;

    const nameEl = footer.querySelector('.footer-contact h3');
    if (nameEl) nameEl.textContent = d.name;

    const addrEl = footer.querySelector('.footer-contact p');
    if (addrEl) {
      addrEl.innerHTML = `
        ${escTxt(d.addr1)} <br>
        ${escTxt(d.addr2)}<br>
        ${escTxt(d.country)} <br><br>
        <strong>Phone:</strong> ${escTxt(d.phone)}<br>
        <strong>Email:</strong> ${escTxt(d.email)}<br>
      `;
    }

    const copyrightEl = footer.querySelector('.copyright');
    if (copyrightEl) copyrightEl.innerHTML = d.copyright;

    const twEl = footer.querySelector('.social-links .twitter');
    const igEl = footer.querySelector('.social-links .instagram');
    if (twEl) twEl.href = d.twitter;
    if (igEl) igEl.href = d.instagram;
  }

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  function escTxt(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  function escAttr(str) {
    return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ─────────────────────────────────────────
  // ADMIN LINK — Tambah tombol admin ke navbar
  // ─────────────────────────────────────────
  // function injectAdminLink() {
  //   const nav = document.querySelector('#navbar ul');
  //   if (!nav) return;
  //   if (nav.querySelector('.admin-link')) return; // hindari duplikat

  //   const li = document.createElement('li');
  //   li.innerHTML = `<a class="nav-link admin-link" href="admin.html" style="color:#f0a500;font-weight:700">⚙ Admin</a>`;
  //   nav.appendChild(li);
  // }

  // ─────────────────────────────────────────
  // BROADCASTCHANNEL — Live update dari admin tab
  // ─────────────────────────────────────────
  function listenBroadcast() {
    try {
      const ch = new BroadcastChannel('aim_admin');
      ch.onmessage = function(e) {
        if (!e.data) return;
        if (e.data.type === 'DATA_UPDATE' || e.data.type === 'APPLY_ALL') {
          applyData(e.data.data);
          showLiveUpdateBadge();
        }
      };
      // Minta data terbaru dari admin tab jika ada
      ch.postMessage({ type: 'REQUEST_DATA' });
    } catch (_) {}
  }

  function showLiveUpdateBadge() {
    let badge = document.getElementById('admin-live-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'admin-live-badge';
      badge.style.cssText = `
        position:fixed; bottom:16px; right:16px;
        background:#f0a500; color:#000;
        padding:8px 16px; border-radius:20px;
        font-family:sans-serif; font-size:12px; font-weight:700;
        z-index:9999; box-shadow:0 4px 12px rgba(0,0,0,.3);
        animation: fadeinbadge .3s ease;
      `;
      const style = document.createElement('style');
      style.textContent = '@keyframes fadeinbadge{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
      document.head.appendChild(style);
      document.body.appendChild(badge);
    }
    badge.textContent = '⚡ Live update dari Admin Panel';
    clearTimeout(badge._timer);
    badge._timer = setTimeout(() => badge.remove(), 3000);
  }

  // ─────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────
  function boot() {
    const data = getData();
    if (data || localStorage.getItem('aim_pending_apply')) {
      applyData(data);
      localStorage.removeItem('aim_pending_apply');
    }
    injectAdminLink();
    listenBroadcast();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
