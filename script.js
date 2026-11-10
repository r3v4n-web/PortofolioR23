// ====== DATA: edit bagian ini saja untuk mengisi konten ======
const profile = { email: "reyvan@contoh.com" };

const projects = [
  { label: "Kasir", title: "Web Kasir", desc: "Aplikasi web untuk mencatat transaksi dan menghitung pembayaran", color: "var(--c2)", url: "#" },
  { label: "Mix Music", title: "Aplikasi Mix Music", desc: "Alat mixing musik seperti DJ untuk memadukan lagu", color: "var(--c4)", url: "#" },
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
  { title: "Musik & DJ", text: "Suka ngobrol soal lagu, remix, dan teknik mixing." },
  { title: "Kopi", text: "Pernah jadi barista, jadi senang bahas racikan kopi." },
  { title: "Belajar coding", text: "Terbuka untuk belajar dan bikin proyek bareng." },
];

// ====== RENDER ======
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

$("projects").innerHTML = projects.map((p) => `
  <a class="card" href="${esc(p.url)}">
    <div class="thumb" style="background:${p.color}">${esc(p.label)}</div>
    <div class="t"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></div>
  </a>`).join("");

$("experience").innerHTML = experience.map((e) => `
  <div class="exp">
    <span>${esc(e.year)}</span>
    <div><h3>${esc(e.company)}</h3><p>${esc(e.role)}. ${esc(e.note)}</p></div>
  </div>`).join("");

$("links").innerHTML = links.map((l) =>
  `<a class="pill${l.main ? " main" : ""}" href="${esc(l.url)}">${esc(l.label)}</a>`).join("");

$("fun").innerHTML = fun.map((f) =>
  `<div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join("");

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
