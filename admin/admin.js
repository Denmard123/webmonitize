/**
 * AIM FOAM SHOP — Admin Panel
 * Pure JavaScript DOM Manipulation (no server/API)
 * Data disimpan di localStorage, lalu di-apply ke DOM index.html
 * via BroadcastChannel + sessionStorage routing.
 */

// ─────────────────────────────────────────────
// DEFAULT DATA (mirror dari index.html)
// ─────────────────────────────────────────────
const DEFAULTS = {
  hero: {
    h1: 'AIM FOAM SHOP',
    h2: 'We are team of talented foam shop',
    btnText: 'WhatsApp',
    btnLink: 'https://wa.link/dqqi1l'
  },
  about: {
    desc: 'AIM FOAM SHOP merupakan AGEN RESMI KASUR BUSA INOAC yang menyediakan berbagai ukuran. Kami bergerak sebagai penyedia alas tidur dengan kwalitas terjamin',
    leftText: 'Kami hadir sebagai solusi untuk memenuhi kebutuhan tempat tidur anda',
    rightText: 'Melalui pengalaman lebih dari 10 tahun dalam dunia kasur ini. AIM FOAM SHOP sudah tidak diragukan lagi akan trust dan kepercayaannya terhadap ratusan pelanggan kami. Kami siap melayani pesanan anda ecer maupun grosir,bisa juga pesan ukuran sesuai kebutuhan anda.',
    features: ['Nyaman', 'Berkualitas', 'Harga Bersaing']
  },
  counts: {
    items: [
      { value: 85, label: 'Penjualan' },
      { value: 10, label: 'Years of experience' }
    ]
  },
  'about-video': {
    title: 'AIM FOAM SHOP Sudah tidak diragukan lagi untuk urusan tempat tidur anda!!!',
    italic: 'Dengan dedikasi yang tinggi sebagai sebuah etos kerja setiap hari tentunya ini adalah nilai plus yang tidak bisa anda dapatkan dari penjual kasur ditempat lain. Lebih lanjut, pelayanan prima menjadi prioritas kami dalam melayani semua customer. KARENA KEPUASAN COSTUMER ,ADALAH KESUKSESAN KAMI',
    closing: 'Dengan demikian anda tidak perlu khawatir akan kebutuhan tempat tidur anda. Kami telah menyediakan semua kelengkapan kamar tidur anda. Langkah terbaik saat ini yaitu menghubungi kontak kami yang tersedi di website kami.',
    products: [
      'Kasur busa inoac',
      'Kasur lipat',
      'Sofa bed',
      'Bantal dan guling (Hotel)',
      'Sarung kasur pengganti(home produksi)'
    ]
  },
  services: {
    title: 'Layanan Kami',
    desc: 'Berikut beberapa layanan kami aim foam shop selaku pengusaha dibidang foam',
    items: [
      { name: 'Kasur Lipat', desc: 'Kasur busa lipat sangat cocok untuk anda yang memiliki ruangan sempit,tetapi menginginkan tidur yang tetap berkualitas', img: 'assets/img/service/kasur lipat.jpg' },
      { name: 'Sofa bed', desc: '3 fungsi dalam 1 produk, Sofa bed kasur busa dengan tampilan yang elegan dapat di pakai sesuai kebutuhan,mudah di rapikan,enak dipandang.', img: 'assets/img/service/sofa bed.jpg' },
      { name: 'Kasur Busa Matras', desc: 'Kasur busa matras, kasur busa dengan kualitas premium untuk tidur yang lebih nyaman.', img: 'assets/img/service/kasur busa.jpg' },
      { name: 'Bantal / guling', desc: 'Bantal dan guling hotel isian busa memomy yang lembut nyaman dipake,tidak gampang kempes. Rasakan kenyamanan tidur dihotel pindah dirumah anda', img: 'assets/img/service/bantal guling.jpg' },
      { name: 'Sarung pengganti', desc: 'Sarung kasur pengganti produksi asli Aim foam shop dengan resleting sehingga mudah di bongkar pasang. Kasur anda akan terlihat baru kembali', img: 'assets/img/service/sarung pengganti.jpg' }
    ]
  },
  testimonials: {
    title: 'Testimonials',
    desc: 'Berikut beberapa testimoni pelanggan setia kami.',
    items: [
      { name: 'Saul Goodman', role: 'Ceo & Founder', text: 'Produk berkualitas dan pengiriman cepat. Sangat puas!' },
      { name: 'Sara Wilsson', role: 'Designer', text: 'Kasurnya nyaman banget, tidur jadi lebih enak. Recommended!' },
      { name: 'Jena Karlis', role: 'Store Owner', text: 'Harga bersaing, pelayanan ramah. Pasti beli lagi.' },
      { name: 'Matt Brandon', role: 'Freelancer', text: 'Sofa bednya bagus, cocok buat kamar kecil saya.' },
      { name: 'John Larson', role: 'Entrepreneur', text: 'Sudah langganan bertahun-tahun, kualitas selalu konsisten.' }
    ]
  },
  onlineshop: {
    title: 'Online Shop',
    desc: 'Media partner dalam menjual product kami anda dapat lihat dibawah ini berbagai fasilitas kerja sama kami dengan e-commece di indonesia',
    platforms: [
      { name: 'Tokopedia', url: 'https://www.tokopedia.com/ahmadmuhkarim', img: 'assets/img/clients/tokopedia logo.png' },
      { name: 'Facebook', url: 'https://www.facebook.com/aim.frends', img: 'assets/img/clients/facebook.png' },
      { name: 'Shopee', url: 'https://shopee.co.id/aimfoamshop?smtt=0.99134003-1667660182.9', img: 'assets/img/clients/Shopee logo.png' }
    ]
  },
  contact: {
    desc: 'Anda dapat mengunjungi langsung toko kami dengan informasi dibawah ini',
    address: 'Jl. Raya Ciantra, Ciantra, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530',
    email: 'info@example.com',
    phone: '+62 5589 55488 55',
    maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.306061595961!2d107.0990843144398!3d-6.354411495401684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b15b9034261%3A0x3cc361aa517104b!2sAIM%20FOAM%20INOAC%20KEBUMEN!5e0!3m2!1sen!2sid!4v1667662560704!5m2!1sen!2sid'
  },
  footer: {
    name: 'AIM FOAM SHOP',
    addr1: 'Jl. Raya Ciantra, Ciantra',
    addr2: 'Cikarang Selatan,Jawa Barat 17330',
    country: 'Indonesia',
    phone: '+62 5589 55488 55',
    email: 'info@example.com',
    twitter: '#',
    instagram: '#',
    copyright: '© Copyright AIM FOAM SHOP. All Rights Reserved 2022'
  }
};

// ─────────────────────────────────────────────
// STATE  (loaded from localStorage or defaults)
// ─────────────────────────────────────────────
const STORAGE_KEY = 'aim_admin_data';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return JSON.parse(JSON.stringify(DEFAULTS));
}

function saveState(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Broadcast ke tab index.html jika terbuka
  try {
    const ch = new BroadcastChannel('aim_admin');
    ch.postMessage({ type: 'DATA_UPDATE', data });
    ch.close();
  } catch (_) {}
  updateStoragePreview();
}

let STATE = loadState();

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
const PANEL_TITLES = {
  dashboard: 'Dashboard',
  hero: 'Hero Section',
  about: 'Tentang Kami',
  counts: 'Statistik',
  'about-video': 'Tentang & Produk',
  services: 'Layanan Kami',
  testimonials: 'Testimonials',
  onlineshop: 'Online Shop',
  contact: 'Kontak',
  footer: 'Footer',
  export: 'Export / Import'
};

function switchPanel(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const key = el.dataset.panel;
  document.getElementById('panel-' + key).classList.add('active');
  document.getElementById('topbar-title').textContent = PANEL_TITLES[key] || key;
  document.getElementById('topbar-bread').textContent = 'admin / ' + key;
  if (key === 'export') updateStoragePreview();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ─────────────────────────────────────────────
// INIT — Render semua panel dari STATE
// ─────────────────────────────────────────────
function initPanels() {
  // Hero
  document.getElementById('hero-h1').value         = STATE.hero.h1;
  document.getElementById('hero-h2').value         = STATE.hero.h2;
  document.getElementById('hero-btn-text').value   = STATE.hero.btnText;
  document.getElementById('hero-btn-link').value   = STATE.hero.btnLink;

  // About
  document.getElementById('about-desc').value       = STATE.about.desc;
  document.getElementById('about-left-text').value  = STATE.about.leftText;
  document.getElementById('about-right-text').value = STATE.about.rightText;
  renderListEditor('about-features', STATE.about.features);

  // Counts
  renderCounters();

  // About Video
  document.getElementById('av-title').value   = STATE['about-video'].title;
  document.getElementById('av-italic').value  = STATE['about-video'].italic;
  document.getElementById('av-closing').value = STATE['about-video'].closing;
  renderListEditor('av-products', STATE['about-video'].products);

  // Services
  document.getElementById('srv-title').value = STATE.services.title;
  document.getElementById('srv-desc').value  = STATE.services.desc;
  renderServices();

  // Testimonials
  document.getElementById('testi-title').value = STATE.testimonials.title;
  document.getElementById('testi-desc').value  = STATE.testimonials.desc;
  renderTestimonials();

  // Online Shop
  document.getElementById('shop-title').value = STATE.onlineshop.title;
  document.getElementById('shop-desc').value  = STATE.onlineshop.desc;
  renderShopPlatforms();

  // Contact
  document.getElementById('ct-desc').value    = STATE.contact.desc;
  document.getElementById('ct-address').value = STATE.contact.address;
  document.getElementById('ct-email').value   = STATE.contact.email;
  document.getElementById('ct-phone').value   = STATE.contact.phone;
  document.getElementById('ct-maps').value    = STATE.contact.maps;

  // Footer
  document.getElementById('ft-name').value      = STATE.footer.name;
  document.getElementById('ft-addr1').value     = STATE.footer.addr1;
  document.getElementById('ft-addr2').value     = STATE.footer.addr2;
  document.getElementById('ft-country').value   = STATE.footer.country;
  document.getElementById('ft-phone').value     = STATE.footer.phone;
  document.getElementById('ft-email').value     = STATE.footer.email;
  document.getElementById('ft-twitter').value   = STATE.footer.twitter;
  document.getElementById('ft-instagram').value = STATE.footer.instagram;
  document.getElementById('ft-copyright').value = STATE.footer.copyright;

  // Dashboard stats
  document.getElementById('stat-products').textContent  = STATE.services.items.length;
  document.getElementById('stat-testi').textContent     = STATE.testimonials.items.length;
}

// ─────────────────────────────────────────────
// LIST EDITOR (reusable)
// ─────────────────────────────────────────────
function renderListEditor(key, items) {
  const container = document.getElementById(key + '-list');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'list-editor-item';
    div.innerHTML = `
      <span style="color:var(--muted);font-size:12px;font-family:'DM Mono',monospace;min-width:20px">${i + 1}.</span>
      <input type="text" value="${escHtml(item)}" data-idx="${i}" data-key="${key}" onchange="updateListItem(this)">
      <button class="del-btn" onclick="removeListItem('${key}', ${i})">✕</button>
    `;
    container.appendChild(div);
  });
}

function addListItem(key) {
  const arr = getListByKey(key);
  arr.push('Item baru');
  renderListEditor(key, arr);
}

function removeListItem(key, idx) {
  const arr = getListByKey(key);
  arr.splice(idx, 1);
  renderListEditor(key, arr);
}

function updateListItem(input) {
  const arr = getListByKey(input.dataset.key);
  arr[parseInt(input.dataset.idx)] = input.value;
}

function getListByKey(key) {
  if (key === 'about-features') return STATE.about.features;
  if (key === 'av-products')    return STATE['about-video'].products;
  return [];
}

// ─────────────────────────────────────────────
// COUNTERS
// ─────────────────────────────────────────────
function renderCounters() {
  const container = document.getElementById('counts-items');
  container.innerHTML = '';
  STATE.counts.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'product-card-edit';
    card.innerHTML = `
      <button class="remove-product" onclick="removeCounter(${i})">✕</button>
      <div class="form-group" style="margin-bottom:12px">
        <label>Nilai Angka</label>
        <input type="number" value="${item.value}" onchange="STATE.counts.items[${i}].value = parseInt(this.value)">
      </div>
      <div class="form-group">
        <label>Label</label>
        <input type="text" value="${escHtml(item.label)}" onchange="STATE.counts.items[${i}].label = this.value">
      </div>
    `;
    container.appendChild(card);
  });
}

function addCounter() {
  STATE.counts.items.push({ value: 0, label: 'Label Baru' });
  renderCounters();
}

function removeCounter(i) {
  STATE.counts.items.splice(i, 1);
  renderCounters();
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
function renderServices() {
  const container = document.getElementById('services-products');
  container.innerHTML = '';
  STATE.services.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'product-card-edit';
    card.innerHTML = `
      <button class="remove-product" onclick="removeService(${i})">✕</button>
      <div class="form-group" style="margin-bottom:10px">
        <label>Nama Layanan</label>
        <input type="text" value="${escHtml(item.name)}" onchange="STATE.services.items[${i}].name = this.value">
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label>Deskripsi</label>
        <textarea style="min-height:70px" onchange="STATE.services.items[${i}].desc = this.value">${escHtml(item.desc)}</textarea>
      </div>
      <div class="form-group">
        <label>Path Gambar</label>
        <input type="file" value="${escHtml(item.img)}" onchange="STATE.services.items[${i}].img = this.value" placeholder="assets/img/service/...">
      </div>
    `;
    container.appendChild(card);
  });
}

function addService() {
  STATE.services.items.push({ name: 'Layanan Baru', desc: 'Deskripsi layanan', img: '' });
  renderServices();
}

function removeService(i) {
  STATE.services.items.splice(i, 1);
  renderServices();
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
function renderTestimonials() {
  const container = document.getElementById('testi-list');
  container.innerHTML = '';
  STATE.testimonials.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'product-card-edit';
    card.style.marginBottom = '12px';
    card.innerHTML = `
      <button class="remove-product" onclick="removeTestimonial(${i})">✕</button>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
        <div class="form-group">
          <label>Nama</label>
          <input type="text" value="${escHtml(item.name)}" onchange="STATE.testimonials.items[${i}].name = this.value">
        </div>
        <div class="form-group">
          <label>Role / Jabatan</label>
          <input type="text" value="${escHtml(item.role)}" onchange="STATE.testimonials.items[${i}].role = this.value">
        </div>
      </div>
      <div class="form-group">
        <label>Teks Testimoni</label>
        <textarea onchange="STATE.testimonials.items[${i}].text = this.value">${escHtml(item.text)}</textarea>
      </div>
    `;
    container.appendChild(card);
  });
}

function addTestimonial() {
  STATE.testimonials.items.push({ name: 'Nama Pelanggan', role: 'Customer', text: 'Testimoni pelanggan.' });
  renderTestimonials();
}

function removeTestimonial(i) {
  STATE.testimonials.items.splice(i, 1);
  renderTestimonials();
}

// ─────────────────────────────────────────────
// ONLINE SHOP PLATFORMS
// ─────────────────────────────────────────────
function renderShopPlatforms() {
  const container = document.getElementById('shop-platforms');
  container.innerHTML = '';
  STATE.onlineshop.platforms.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card-edit';
    card.style.marginBottom = '12px';
    card.innerHTML = `
      <button class="remove-product" onclick="removeShopPlatform(${i})">✕</button>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="form-group">
          <label>Nama Platform</label>
          <input type="text" value="${escHtml(p.name)}" onchange="STATE.onlineshop.platforms[${i}].name = this.value">
        </div>
        <div class="form-group">
          <label>URL Toko</label>
          <input type="url" value="${escHtml(p.url)}" onchange="STATE.onlineshop.platforms[${i}].url = this.value">
        </div>
        <div class="form-group">
          <label>Path Logo</label>
          <input type="text" value="${escHtml(p.img)}" onchange="STATE.onlineshop.platforms[${i}].img = this.value">
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addShopPlatform() {
  STATE.onlineshop.platforms.push({ name: 'Platform Baru', url: 'https://', img: '' });
  renderShopPlatforms();
}

function removeShopPlatform(i) {
  STATE.onlineshop.platforms.splice(i, 1);
  renderShopPlatforms();
}

// ─────────────────────────────────────────────
// SAVE SECTION — Baca dari form → update STATE
// ─────────────────────────────────────────────
function saveSection(section) {
  switch (section) {
    case 'hero':
      STATE.hero.h1      = document.getElementById('hero-h1').value;
      STATE.hero.h2      = document.getElementById('hero-h2').value;
      STATE.hero.btnText = document.getElementById('hero-btn-text').value;
      STATE.hero.btnLink = document.getElementById('hero-btn-link').value;
      break;

    case 'about':
      STATE.about.desc      = document.getElementById('about-desc').value;
      STATE.about.leftText  = document.getElementById('about-left-text').value;
      STATE.about.rightText = document.getElementById('about-right-text').value;
      // features sudah di-update via onchange
      break;

    case 'counts':
      // sudah via onchange di renderCounters
      break;

    case 'about-video':
      STATE['about-video'].title   = document.getElementById('av-title').value;
      STATE['about-video'].italic  = document.getElementById('av-italic').value;
      STATE['about-video'].closing = document.getElementById('av-closing').value;
      // products sudah via onchange
      break;

    case 'services':
      STATE.services.title = document.getElementById('srv-title').value;
      STATE.services.desc  = document.getElementById('srv-desc').value;
      // items sudah via onchange
      document.getElementById('stat-products').textContent = STATE.services.items.length;
      break;

    case 'testimonials':
      STATE.testimonials.title = document.getElementById('testi-title').value;
      STATE.testimonials.desc  = document.getElementById('testi-desc').value;
      document.getElementById('stat-testi').textContent = STATE.testimonials.items.length;
      break;

    case 'onlineshop':
      STATE.onlineshop.title = document.getElementById('shop-title').value;
      STATE.onlineshop.desc  = document.getElementById('shop-desc').value;
      break;

    case 'contact':
      STATE.contact.desc    = document.getElementById('ct-desc').value;
      STATE.contact.address = document.getElementById('ct-address').value;
      STATE.contact.email   = document.getElementById('ct-email').value;
      STATE.contact.phone   = document.getElementById('ct-phone').value;
      STATE.contact.maps    = document.getElementById('ct-maps').value;
      break;

    case 'footer':
      STATE.footer.name      = document.getElementById('ft-name').value;
      STATE.footer.addr1     = document.getElementById('ft-addr1').value;
      STATE.footer.addr2     = document.getElementById('ft-addr2').value;
      STATE.footer.country   = document.getElementById('ft-country').value;
      STATE.footer.phone     = document.getElementById('ft-phone').value;
      STATE.footer.email     = document.getElementById('ft-email').value;
      STATE.footer.twitter   = document.getElementById('ft-twitter').value;
      STATE.footer.instagram = document.getElementById('ft-instagram').value;
      STATE.footer.copyright = document.getElementById('ft-copyright').value;
      break;
  }

  saveState(STATE);
  toast(`✅ Section "${section}" berhasil disimpan!`);
}

// ─────────────────────────────────────────────
// APPLY ALL — Tulis ke localStorage dengan key
// khusus yang dibaca oleh index.html via admin.js
// ─────────────────────────────────────────────
function applyAllChanges() {
  // Simpan semua section dulu
  ['hero','about','counts','about-video','services','testimonials','onlineshop','contact','footer'].forEach(s => {
    try { saveSection(s); } catch (_) {}
  });

  // Tandai bahwa ada perubahan pending untuk diterapkan
  localStorage.setItem('aim_pending_apply', 'true');

  toast('⚡ Semua perubahan telah disimpan! Refresh index.html untuk melihat hasilnya.', 4000);

  // Coba broadcast ke tab index.html
  try {
    const ch = new BroadcastChannel('aim_admin');
    ch.postMessage({ type: 'APPLY_ALL', data: STATE });
    ch.close();
  } catch (_) {}
}

// ─────────────────────────────────────────────
// PREVIEW SECTION
// ─────────────────────────────────────────────
function previewSection(section) {
  const overlay = document.getElementById('preview-overlay');
  const title   = document.getElementById('preview-title');
  const content = document.getElementById('preview-content');

  title.textContent = '👁 Preview — ' + (PANEL_TITLES[section] || section);

  let html = '';
  switch (section) {
    case 'hero':
      html = `
        <div class="preview-item"><strong>H1:</strong> ${escHtml(STATE.hero.h1)}</div>
        <div class="preview-item"><strong>H2:</strong> ${escHtml(STATE.hero.h2)}</div>
        <div class="preview-item"><strong>Tombol:</strong> ${escHtml(STATE.hero.btnText)} → <a href="${escHtml(STATE.hero.btnLink)}" target="_blank" style="color:var(--accent)">${escHtml(STATE.hero.btnLink)}</a></div>
      `;
      break;
    case 'about':
      html = `
        <div class="preview-item"><strong>Deskripsi:</strong> ${escHtml(STATE.about.desc)}</div>
        <div class="preview-item"><strong>Kiri:</strong> ${escHtml(STATE.about.leftText)}</div>
        <div class="preview-item"><strong>Kanan:</strong> ${escHtml(STATE.about.rightText)}</div>
        <div class="preview-item"><strong>Keunggulan:</strong><ul style="margin-top:6px;padding-left:18px">${STATE.about.features.map(f => `<li>${escHtml(f)}</li>`).join('')}</ul></div>
      `;
      break;
    case 'counts':
      html = STATE.counts.items.map(c => `<div class="preview-item"><strong>${escHtml(c.label)}:</strong> ${c.value}</div>`).join('');
      break;
    case 'about-video':
      html = `
        <div class="preview-item"><strong>Judul:</strong> ${escHtml(STATE['about-video'].title)}</div>
        <div class="preview-item"><strong>Italic:</strong> ${escHtml(STATE['about-video'].italic)}</div>
        <div class="preview-item"><strong>Penutup:</strong> ${escHtml(STATE['about-video'].closing)}</div>
        <div class="preview-item"><strong>Produk:</strong><ul style="margin-top:6px;padding-left:18px">${STATE['about-video'].products.map(p => `<li>${escHtml(p)}</li>`).join('')}</ul></div>
      `;
      break;
    case 'services':
      html = `<div class="preview-item"><strong>Judul:</strong> ${escHtml(STATE.services.title)}</div>` +
        STATE.services.items.map(s => `<div class="preview-item" style="border-left:3px solid var(--accent);padding-left:10px;margin:8px 0"><strong>${escHtml(s.name)}</strong><br><small style="color:var(--muted)">${escHtml(s.desc)}</small></div>`).join('');
      break;
    case 'testimonials':
      html = STATE.testimonials.items.map(t => `
        <div class="preview-item" style="background:var(--surface2);padding:10px;border-radius:8px;margin-bottom:8px">
          <strong>${escHtml(t.name)}</strong> <small style="color:var(--muted)">(${escHtml(t.role)})</small><br>
          <span style="font-style:italic">"${escHtml(t.text)}"</span>
        </div>
      `).join('');
      break;
    case 'onlineshop':
      html = `<div class="preview-item"><strong>Judul:</strong> ${escHtml(STATE.onlineshop.title)}</div>` +
        STATE.onlineshop.platforms.map(p => `<div class="preview-item"><strong>${escHtml(p.name)}:</strong> <a href="${escHtml(p.url)}" target="_blank" style="color:var(--accent)">${escHtml(p.url)}</a></div>`).join('');
      break;
    case 'contact':
      html = `
        <div class="preview-item"><strong>Alamat:</strong> ${escHtml(STATE.contact.address)}</div>
        <div class="preview-item"><strong>Email:</strong> ${escHtml(STATE.contact.email)}</div>
        <div class="preview-item"><strong>Telepon:</strong> ${escHtml(STATE.contact.phone)}</div>
      `;
      break;
    case 'footer':
      html = `
        <div class="preview-item"><strong>Nama:</strong> ${escHtml(STATE.footer.name)}</div>
        <div class="preview-item"><strong>Alamat:</strong> ${escHtml(STATE.footer.addr1)}, ${escHtml(STATE.footer.addr2)}, ${escHtml(STATE.footer.country)}</div>
        <div class="preview-item"><strong>Phone:</strong> ${escHtml(STATE.footer.phone)}</div>
        <div class="preview-item"><strong>Email:</strong> ${escHtml(STATE.footer.email)}</div>
        <div class="preview-item"><strong>Copyright:</strong> ${escHtml(STATE.footer.copyright)}</div>
      `;
      break;
    default:
      html = '<div class="preview-item">Tidak ada preview tersedia.</div>';
  }

  content.innerHTML = html;
  overlay.classList.add('open');
}

function closePreview() {
  document.getElementById('preview-overlay').classList.remove('open');
}

// ─────────────────────────────────────────────
// EXPORT / IMPORT
// ─────────────────────────────────────────────
function exportData() {
  const json = JSON.stringify(STATE, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'aim-admin-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('⬇ Data berhasil diekspor!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      STATE = parsed;
      saveState(STATE);
      initPanels();
      toast('⬆ Data berhasil diimport!');
    } catch (err) {
      toast('❌ File JSON tidak valid!', 3000, true);
    }
  };
  reader.readAsText(file);
}

function clearAllData() {
  if (!confirm('Yakin ingin menghapus semua data dan kembali ke default?')) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('aim_pending_apply');
  STATE = JSON.parse(JSON.stringify(DEFAULTS));
  saveState(STATE);
  initPanels();
  toast('🗑 Data direset ke default.');
}

function resetAll() {
  if (!confirm('Reset semua perubahan yang belum disimpan?')) return;
  STATE = loadState();
  initPanels();
  toast('↩ Perubahan di-reset.');
}

function updateStoragePreview() {
  const el = document.getElementById('storage-preview');
  if (!el) return;
  el.textContent = JSON.stringify(STATE, null, 2);
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
function toast(msg, duration = 3000, isError = false) {
  const container = document.getElementById('toast-container');
  const div = document.createElement('div');
  div.className = 'toast' + (isError ? ' error' : '');
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => {
    div.style.opacity = '0';
    div.style.transform = 'translateX(20px)';
    div.style.transition = 'all .3s';
    setTimeout(() => div.remove(), 300);
  }, duration);
}

// ─────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────
function escHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─────────────────────────────────────────────
// LISTEN dari BroadcastChannel (index.html → admin)
// ─────────────────────────────────────────────
try {
  const ch = new BroadcastChannel('aim_admin');
  ch.onmessage = function(e) {
    if (e.data && e.data.type === 'REQUEST_DATA') {
      const reply = new BroadcastChannel('aim_admin');
      reply.postMessage({ type: 'DATA_UPDATE', data: STATE });
      reply.close();
    }
  };
} catch (_) {}

// TEMA TOGGLE
function applyTheme(checkbox) {
  const theme = checkbox.checked ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('ts-thumb').textContent = checkbox.checked ? '☀️' : '🌙';
  localStorage.setItem('aim_admin_theme', theme);
}

// Load saved theme saat halaman dibuka
(function() {
  const saved = localStorage.getItem('aim_admin_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const toggle = document.getElementById('themeToggle');
  const thumb = document.getElementById('ts-thumb');
  if (toggle && saved === 'light') {
    toggle.checked = true;
    if (thumb) thumb.textContent = '☀️';
  }
})();


// ─────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPanels();
  updateStoragePreview();
});
