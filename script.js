// ====== DATA: edit bagian ini saja untuk mengisi konten ======
const profile = { email: "reyvan@contoh.com" };

const ART = {
  kasir: `<svg viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice"><rect width="300" height="330" fill="#3b82ff"/><path d="M-20 260 L120 -20 L200 -20 L60 330Z" fill="#f2e8c9"/><path d="M150 350 L300 60 L340 60 L340 350Z" fill="#ffa400"/><g transform="rotate(-8 150 170)"><rect x="70" y="70" width="110" height="170" rx="8" fill="#fff"/><g fill="#d9d9d9"><rect x="84" y="92" width="70" height="8" rx="4"/><rect x="84" y="112" width="52" height="8" rx="4"/><rect x="84" y="132" width="76" height="8" rx="4"/><rect x="84" y="152" width="44" height="8" rx="4"/></g><rect x="84" y="190" width="82" height="26" rx="6" fill="#3fbf86"/></g><g transform="rotate(6 190 220)"><rect x="120" y="170" width="140" height="100" rx="14" fill="#1c1b19"/><rect x="134" y="182" width="112" height="30" rx="6" fill="#b6ff3c"/><g fill="#ef5b4b"><circle cx="150" cy="236" r="9"/><circle cx="180" cy="236" r="9"/></g><g fill="#f4c542"><circle cx="210" cy="236" r="9"/><circle cx="240" cy="236" r="9"/></g></g><circle cx="60" cy="280" r="20" fill="#f4c542" stroke="#1c1b19" stroke-width="4"/><circle cx="238" cy="70" r="14" fill="#f4c542" stroke="#1c1b19" stroke-width="4"/></svg>`,
  mix: `<svg viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice"><rect width="300" height="330" fill="#9b6cf0"/><path d="M-20 60 L140 -20 L200 -20 L40 100Z" fill="#f4c542"/><path d="M180 340 L340 220 L340 340Z" fill="#3fbf86"/><g transform="rotate(-6 150 170)"><rect x="25" y="85" width="250" height="150" rx="16" fill="#1c1b19"/><g><circle cx="85" cy="160" r="48" fill="#2d2b28"/><circle cx="85" cy="160" r="34" fill="none" stroke="#555" stroke-width="2"/><circle cx="85" cy="160" r="18" fill="#b6ff3c"/><circle cx="85" cy="160" r="4" fill="#1c1b19"/></g><g><circle cx="215" cy="160" r="48" fill="#2d2b28"/><circle cx="215" cy="160" r="34" fill="none" stroke="#555" stroke-width="2"/><circle cx="215" cy="160" r="18" fill="#ef5b4b"/><circle cx="215" cy="160" r="4" fill="#1c1b19"/></g><rect x="136" y="105" width="28" height="110" rx="6" fill="#4a4743"/><rect x="144" y="120" width="12" height="18" rx="3" fill="#f4c542"/><rect x="144" y="172" width="12" height="18" rx="3" fill="#3b82ff"/></g><g fill="#fff"><rect x="40" y="258" width="10" height="30" rx="5"/><rect x="58" y="248" width="10" height="50" rx="5"/><rect x="76" y="262" width="10" height="26" rx="5"/><rect x="214" y="252" width="10" height="42" rx="5"/><rect x="232" y="262" width="10" height="26" rx="5"/><rect x="250" y="246" width="10" height="52" rx="5"/></g></svg>`
};

const projects = [
  { title: "Web Kasir", desc: "Aplikasi web untuk mencatat transaksi dan menghitung pembayaran", color: "#3b82ff", art: ART.kasir, url: "#" },
  { title: "Aplikasi Mix Music", desc: "Alat mixing musik seperti DJ untuk memadukan lagu", color: "#9b6cf0", art: ART.mix, url: "#" },
];

const experience = [
  { year: "Pendidikan", company: "SMKS Cendika Bangsa", role: "Siswa", note: "Belajar dan membangun proyek web serta aplikasi." },
  { year: "Hotel", company: "Waiter Hotel", role: "Waiter", note: "Melayani tamu dengan ramah dan bekerja cepat dalam tim." },
  { year: "Kafe", company: "Barista Kafe", role: "Barista", note: "Meracik minuman, melayani pelanggan, dan menjaga kualitas." },
];

const links = [
  { label: profile.email, url: "mailto:" + profile.email, main: true },
  { label: "Instagram", url: "#" },
  { label: "GitHub", url: "#" },
  { label: "Unduh CV", url: "#" },
];

const fun = [
  { topic: "musik", title: "Musik & DJ", text: "Suka ngobrol soal lagu, remix, dan teknik mixing." },
  { topic: "kopi", title: "Kopi", text: "Pernah jadi barista, jadi senang bahas racikan kopi." },
  { topic: "coding", title: "Belajar coding", text: "Terbuka untuk belajar dan bikin proyek bareng." },
];

// ====== RENDER ======
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ====== CAROUSEL KARYA ======
$("projects").innerHTML = `
  <div class="stage" id="stage">${projects.map((p, i) =>
    `<div class="pcard" data-i="${i}" style="--bg-c:${p.color}" role="button" aria-label="${esc(p.title)}">${p.art}</div>`).join("")}</div>
  <div class="car-title"><span class="pill-g" id="car-title"></span></div>`;

const cards = [...document.querySelectorAll(".pcard")];
let active = 0;
function showCard() {
  cards.forEach((el, i) => {
    const off = i - active;
    const rot = off === 0 ? -3 : off * 13;
    el.style.transform = `translate(calc(-50% + ${off * 108}%), -50%) rotate(${rot}deg) scale(${off === 0 ? 1 : 0.88})`;
    el.style.zIndex = 10 - Math.abs(off);
    el.style.opacity = Math.abs(off) > 1 ? 0 : 1;
  });
  $("car-title").textContent = projects[active].title;
}
const go = (d) => { active = Math.min(projects.length - 1, Math.max(0, active + d)); showCard(); };
document.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); });
// Geser (swipe/drag) untuk ganti kartu
let startX = null, moved = false;
const stageEl = $("stage");
stageEl.addEventListener("pointerdown", (e) => { startX = e.clientX; moved = false; });
stageEl.addEventListener("pointerup", (e) => {
  if (startX !== null && Math.abs(e.clientX - startX) > 40) { moved = true; go(e.clientX < startX ? 1 : -1); }
  startX = null;
});
stageEl.addEventListener("pointercancel", () => (startX = null));
// Klik kartu samping: pindah ke kartu itu (diabaikan jika baru digeser)
cards.forEach((el, i) => el.addEventListener("click", () => {
  if (moved) { moved = false; return; }
  active = i; showCard();
}));
showCard();

$("experience").innerHTML = experience.map((e) => `
  <div class="exp">
    <span>${esc(e.year)}</span>
    <div><h3>${esc(e.company)}</h3><p>${esc(e.role)}. ${esc(e.note)}</p></div>
  </div>`).join("");

$("links").innerHTML = links.map((l) =>
  `<a class="pill${l.main ? " main" : ""}" href="${esc(l.url)}">${esc(l.label)}</a>`).join("");

$("fun").innerHTML = fun.map((f) =>
  `<a class="fc" href="chat.html?topik=${f.topic}"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><span>Ngobrol sama bot →</span></a>`).join("");

$("year").textContent = new Date().getFullYear();

// ====== TEMA (terang/gelap) ======
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}

$("theme-toggle").addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = isDark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ====== SALIN EMAIL ======
$("copy-email").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(profile.email);
    btn.textContent = "Tersalin ✓";
  } catch (err) {
    btn.textContent = profile.email;
  }
  setTimeout(() => (btn.textContent = "Salin email"), 2000);
});

// ====== ANIMASI MUNCUL SAAT SCROLL ======
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); revealObs.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// ====== MENU AKTIF SESUAI SECTION ======
const navLinks = document.querySelectorAll(".menu a");
const navObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section[id]").forEach((s) => navObs.observe(s));
