(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ====== DATA: edit bagian ini untuk mengisi konten ======
  const projects = [
    { tag: "Proyek Web", title: "Web Kasir", desc: "Aplikasi web untuk mencatat transaksi dan menghitung pembayaran.", color: "#7a4a24", img: "kasir.jpg", url: "#" },
    { tag: "Aplikasi", title: "Aplikasi Mix Music", desc: "Alat mixing musik seperti DJ untuk memadukan lagu.", color: "#1c1b19", img: "mix.jpg", pos: "center", url: "#" },
  ];

  // ====== DAFTAR PROYEK ======
  const list = $("projects");
  if (list) {
    list.innerHTML = projects.map((p) => {
      const tag = p.url === "#" ? "div" : "a";
      const href = p.url === "#" ? "" : ` href="${esc(p.url)}"`;
      return `<${tag} class="pj"${href} style="--c:${p.color}">
        <div class="pj-art${p.img ? " shot" : ""}">${p.img ? `<img src="${esc(p.img)}" alt="Tampilan ${esc(p.title)}" loading="lazy"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ""}>` : p.art}</div>
        <div class="pj-info"><div><small>${esc(p.tag)}</small><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></div><span class="arrow">→</span></div>
      </${tag}>`;
    }).join("");
  }

  // ====== GALERI PENGALAMAN ======
  // Taruh foto di folder "galeri/", lalu isi daftar photos, contoh:
  // photos: [{ src: "galeri/hotel-1.jpg", cap: "Bertugas di restoran hotel" }, { src: "galeri/hotel-2.jpg" }]
  // Selama photos masih kosong, galeri menampilkan kotak foto sementara.
  const experiences = [
    { title: "SMKS Cendika Bangsa", role: "Siswa", photos: [] },
    { title: "Hotel", role: "Waiter", photos: [] },
    { title: "Kafe", role: "Barista", photos: [] },
  ];

  const tilesEl = $("tiles");
  if (tilesEl) {
    tilesEl.innerHTML = experiences.map((e, i) =>
      `<button class="tile" data-i="${i}"><b>${esc(e.title)}</b><span>${esc(e.role)}</span><em>Lihat galeri →</em></button>`).join("");

    const modal = document.createElement("div");
    modal.className = "gal"; modal.hidden = true;
    modal.innerHTML = `<div class="gal-panel" role="dialog" aria-modal="true" aria-labelledby="gal-title">
      <div class="gal-head"><div><h3 id="gal-title"></h3><p id="gal-role"></p></div><button class="gal-x" id="gal-close" aria-label="Tutup galeri">✕</button></div>
      <div class="gal-grid" id="gal-grid"></div></div>`;
    const lb = document.createElement("div");
    lb.className = "lb"; lb.hidden = true;
    lb.innerHTML = `<button class="lb-x" aria-label="Tutup foto">✕</button><button class="lb-n prev" aria-label="Sebelumnya">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure><button class="lb-n next" aria-label="Berikutnya">›</button>`;
    document.body.append(modal, lb);

    const grid = $("gal-grid"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
    let cur = [], idx = 0, lastBtn = null;

    const openGal = (i, btn) => {
      const e = experiences[i];
      lastBtn = btn;
      cur = e.photos.map((p) => (typeof p === "string" ? { src: p } : p));
      if (!cur.length) cur = Array.from({ length: 6 }, (_, k) => ({ ph: true, cap: `Foto ${k + 1}` }));
      $("gal-title").textContent = e.title;
      $("gal-role").textContent = e.role;
      grid.innerHTML = cur.map((p, k) => p.ph
        ? `<div class="gal-item ph" style="--k:${k}">${esc(p.cap)}</div>`
        : `<button class="gal-item" data-k="${k}"><img src="${esc(p.src)}" alt="${esc(p.cap || e.title)}" loading="lazy"></button>`).join("");
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      $("gal-close").focus();
    };
    const closeGal = () => { modal.hidden = true; document.body.style.overflow = ""; if (lastBtn) lastBtn.focus(); };
    const showPhoto = (k) => {
      idx = (k + cur.length) % cur.length;
      lbImg.src = cur[idx].src; lbImg.alt = cur[idx].cap || "";
      lbCap.textContent = cur[idx].cap || "";
      lb.hidden = false;
    };

    tilesEl.addEventListener("click", (e) => { const b = e.target.closest(".tile"); if (b) openGal(+b.dataset.i, b); });
    grid.addEventListener("click", (e) => { const b = e.target.closest("button.gal-item"); if (b) showPhoto(+b.dataset.k); });
    $("gal-close").addEventListener("click", closeGal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeGal(); });
    lb.addEventListener("click", (e) => {
      if (e.target.closest(".prev")) showPhoto(idx - 1);
      else if (e.target.closest(".next")) showPhoto(idx + 1);
      else if (e.target === lb || e.target.closest(".lb-x")) lb.hidden = true;
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.hidden) {
        if (e.key === "Escape") lb.hidden = true;
        if (e.key === "ArrowLeft") showPhoto(idx - 1);
        if (e.key === "ArrowRight") showPhoto(idx + 1);
      } else if (!modal.hidden && e.key === "Escape") closeGal();
    });
    let sx = null;
    lb.addEventListener("pointerdown", (e) => (sx = e.clientX));
    lb.addEventListener("pointerup", (e) => {
      if (sx !== null && Math.abs(e.clientX - sx) > 50) showPhoto(idx + (e.clientX < sx ? 1 : -1));
      sx = null;
    });
  }

  // ====== IKON SOSIAL ======
  // Ganti url dengan tautan akunmu. Selama masih "#", ikon tidak membuka apa-apa.
  // WhatsApp: https://wa.me/62812xxxxxxx (nomor tanpa 0 di depan dan tanpa tanda +)
  const socials = [
    { name: "Instagram", url: "#", vb: "0 0 24 24", svg: `<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3"/>` },
    { name: "GitHub", url: "https://github.com/r3v4n-web", vb: "0 0 16 16", svg: `<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>` },
    { name: "LinkedIn", url: "#", vb: "0 0 24 24", svg: `<path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4z"/>` },
    { name: "TikTok", url: "#", vb: "0 0 24 24", svg: `<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>` },
    { name: "WhatsApp", url: "#", vb: "0 0 24 24", svg: `<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>` },
  ];
  const EMAIL = "r3v4nmaulana789@gmail.com";
  const socialHTML = socials.map((s) =>
    `<a href="${esc(s.url)}" aria-label="${esc(s.name)}" title="${esc(s.name)}"${s.url === "#" ? "" : ' target="_blank" rel="noopener"'}><svg viewBox="${s.vb}" fill="currentColor" aria-hidden="true">${s.svg}</svg></a>`).join("");
  const socialEl = $("social");
  if (socialEl) socialEl.innerHTML = socialHTML;
  document.addEventListener("click", (e) => { if (e.target.closest('.social a[href="#"], .ct-soc a[href="#"]')) e.preventDefault(); });

  // ====== POPUP KONTAK ======
  const ct = document.createElement("div");
  ct.className = "ct"; ct.hidden = true;
  ct.innerHTML = `<div class="ct-panel" role="dialog" aria-modal="true" aria-labelledby="ct-title">
    <button class="ct-x" aria-label="Tutup kontak">✕</button>
    <p class="ct-lead">Terbuka untuk kolaborasi, belajar bareng, atau sekadar menyapa 😀</p>
    <p class="ct-lead">Silakan hubungi aku lewat email atau media sosial di bawah ini.</p>
    <h2 id="ct-title">Kontak</h2>
    <div class="ct-row"><span>Email</span><div><a href="mailto:${EMAIL}">${EMAIL}</a></div></div>
    <div class="ct-row"><span>Sekolah</span><div>SMKS Cendika Bangsa</div></div>
    <div class="ct-row"><span>Sosial</span><div class="ct-soc">${socialHTML}</div></div>
    <a class="ct-btn" href="mailto:${EMAIL}">Kirim email</a>
  </div>`;
  document.body.appendChild(ct);
  let ctFrom = null;
  const openCt = (from) => {
    ctFrom = from; ct.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => ct.classList.add("show"));
    ct.querySelector(".ct-x").focus();
  };
  const closeCt = () => {
    ct.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => { ct.hidden = true; }, 250);
    if (ctFrom) ctFrom.focus();
  };
  document.querySelectorAll("[data-contact]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); openCt(a); }));
  ct.addEventListener("click", (e) => { if (e.target === ct || e.target.closest(".ct-x")) closeCt(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !ct.hidden) closeCt(); });

  // ====== TEMA TERANG/GELAP ======
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  $("theme-toggle").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // ====== MENU HP ======
  const burger = $("burger"), links = $("links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.closest("a")) links.classList.remove("open"); });

  // ====== ANIMASI MUNCUL SAAT SCROLL ======
  const obs = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); obs.unobserve(en.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

  // ====== NAV BAYANGAN SAAT SCROLL + TAHUN ======
  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("year").textContent = new Date().getFullYear();
})();
