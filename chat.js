const $ = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ====== TEMA ======
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
$("theme-toggle").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// ====== BASIS PENGETAHUAN (edit di sini untuk menambah jawaban) ======
const KB = [
  {
    id: "musik",
    keys: ["musik", "dj", "lagu", "remix", "mixing", "mix", "bpm", "beatmatch", "turntable", "playlist", "genre", "edm", "transisi", "beatmatching"],
    replies: [
      "Seru nih! Dasar DJ itu beatmatching: samakan BPM dua lagu supaya ketukannya berjalan bareng, lalu geser lagu kedua masuk perlahan.",
      "Trik transisi yang enak: mulai dari bass. Kecilkan bass lagu yang sedang main, naikkan bass lagu baru, supaya tidak bertabrakan.",
      "Coba mixing per frasa. Banyak lagu dance tersusun dalam kelipatan 8, 16, atau 32 ketukan, jadi masukkan lagu baru tepat di awal frasa.",
      "Kalau mau terdengar mulus, pilih lagu dengan kunci nada yang serasi (harmonic mixing) dan BPM yang berdekatan.",
    ],
    chips: ["Apa itu beatmatching?", "Ceritakan Aplikasi Mix Music"],
  },
  {
    id: "kopi",
    keys: ["kopi", "barista", "espresso", "latte", "seduh", "v60", "kafe", "cafe", "kopi susu", "grinder", "arabika", "robusta"],
    replies: [
      "Reyvan pernah jadi barista, jadi topik ini favorit! Patokan espresso: sekitar 18 g bubuk jadi 36 g espresso dalam 25–30 detik.",
      "Untuk seduh manual seperti V60, rasio umumnya 1:15 sampai 1:16, misalnya 15 g kopi dengan 240 ml air, suhu air sekitar 92–96°C.",
      "Rasa kopi sangat dipengaruhi gilingan. Terlalu halus cenderung pahit, terlalu kasar cenderung asam dan tipis. Atur pelan-pelan.",
      "Biji kopi segar itu penting. Simpan di wadah tertutup, jauh dari panas dan cahaya, dan giling sesaat sebelum diseduh.",
    ],
    chips: ["Bedanya arabika dan robusta?", "Cerita pengalaman barista"],
  },
  {
    id: "coding",
    keys: ["coding", "kode", "web", "html", "css", "javascript", "js", "program", "belajar", "developer", "website", "pemula", "proyek"],
    replies: [
      "Urutan belajar web yang umum: HTML untuk struktur, CSS untuk tampilan, lalu JavaScript untuk interaksi.",
      "Cara belajar paling cepat adalah langsung bikin proyek kecil, misalnya to-do list, kalkulator, atau kasir sederhana. Saat macet, baru cari tahu bagian yang kurang.",
      "Sumber belajar gratis yang bagus: MDN Web Docs untuk rujukan, dan freeCodeCamp untuk latihan terstruktur.",
      "Jangan takut error. Baca pesan error di konsol browser (F12), biasanya sudah menunjukkan baris yang bermasalah.",
    ],
    chips: ["Ceritakan Web Kasir", "Proyek pertama apa yang bagus?"],
  },
  {
    id: "kasir",
    keys: ["kasir", "pos", "transaksi", "pembayaran"],
    replies: ["Web Kasir adalah proyek Reyvan untuk mencatat transaksi dan menghitung pembayaran. Cocok untuk membantu usaha kecil bertransaksi lebih rapi."],
    chips: ["Ceritakan Aplikasi Mix Music", "Tips belajar coding"],
  },
  {
    id: "mixapp",
    keys: ["mix music", "aplikasi mix", "alat dj", "mixer"],
    replies: ["Aplikasi Mix Music adalah proyek Reyvan yang bekerja seperti alat DJ: memadukan dua lagu dengan kontrol mixing."],
    chips: ["Tips mixing lagu", "Ceritakan Web Kasir"],
  },
  {
    id: "arabika",
    keys: ["arabika", "robusta"],
    replies: ["Arabika biasanya lebih aromatik, manis, dan sedikit asam. Robusta lebih pahit, bodinya tebal, kafeinnya lebih tinggi. Banyak espresso blend memakai campuran keduanya."],
    chips: ["Tips seduh kopi", "Tips mixing lagu"],
  },
  {
    id: "pengalaman",
    keys: ["waiter", "hotel", "pengalaman", "kerja", "sekolah", "smk", "siswa", "siapa", "reyvan"],
    replies: ["Reyvan Maulana adalah siswa SMKS Cendika Bangsa. Dia punya pengalaman sebagai waiter hotel dan barista kafe, dan sedang mengerjakan Web Kasir serta Aplikasi Mix Music."],
    chips: ["Tips belajar coding", "Tips mixing lagu", "Tips seduh kopi"],
  },
  {
    id: "kontak",
    keys: ["kontak", "email", "hubungi", "kolaborasi"],
    replies: ["Untuk kolaborasi atau ngobrol langsung dengan Reyvan, kamu bisa lewat bagian Kontak di halaman utama."],
    chips: ["Tips belajar coding", "Tips seduh kopi"],
  },
];
// Topik spesifik dicek lebih dulu agar menang saat skor sama
const ORDER = ["kasir", "mixapp", "arabika", "pengalaman", "kontak", "musik", "kopi", "coding"];
KB.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
const GREET = { keys: ["halo", "hai", "hi", "hello", "selamat", "pagi", "siang", "sore", "malam"], reply: "Halo! Senang kamu mampir. Mau ngobrol soal apa?" };
const THANKS = { keys: ["makasih", "terima kasih", "thanks", "thx"], reply: "Sama-sama! Kalau mau lanjut ngobrol, tinggal tulis saja." };
const FALLBACK = "Hmm, aku belum paham yang itu. Aku paling bisa ngobrol soal musik & DJ, kopi, dan belajar coding. Mau mulai dari mana?";
const MAIN_CHIPS = ["Ngobrol musik & DJ", "Ngobrol kopi", "Ngobrol belajar coding"];
const TOPIC_START = { musik: "Ngobrol musik & DJ", kopi: "Ngobrol kopi", coding: "Ngobrol belajar coding" };

// ====== LOGIKA JAWABAN ======
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const score = (text, keys) => keys.reduce((n, k) => n + (` ${text} `.includes(` ${k} `) ? (k.includes(" ") ? 2 : 1) : 0), 0);

function answer(raw) {
  const t = norm(raw);
  if (!t) return null;
  let best = null, bestScore = 0;
  KB.forEach((e) => { const s = score(t, e.keys); if (s > bestScore) { best = e; bestScore = s; } });
  if (best) return { text: pick(best.replies), chips: best.chips };
  if (score(t, THANKS.keys)) return { text: THANKS.reply, chips: MAIN_CHIPS };
  if (score(t, GREET.keys)) return { text: GREET.reply, chips: MAIN_CHIPS };
  return { text: FALLBACK, chips: MAIN_CHIPS };
}

// ====== TAMPILAN CHAT ======
const msgs = $("msgs"), chips = $("chips"), input = $("input");

function addMsg(text, who) {
  const el = document.createElement("div");
  el.className = "m " + who;
  el.textContent = text;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
  return el;
}
function setChips(list) {
  chips.innerHTML = "";
  (list || []).forEach((c) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = c;
    b.addEventListener("click", () => send(c));
    chips.appendChild(b);
  });
}
function send(text) {
  text = text.trim();
  if (!text) return;
  addMsg(text, "me");
  setChips([]);
  const typing = addMsg("● ● ●", "bot typing");
  const res = answer(text);
  setTimeout(() => {
    typing.remove();
    addMsg(res.text, "bot");
    setChips(res.chips);
  }, 500 + Math.random() * 500);
}

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  send(input.value);
  input.value = "";
});

// ====== MULAI ======
addMsg("Halo, aku asisten otomatis Reyvan. Aku siap ngobrol soal musik & DJ, kopi, dan belajar coding. Mau mulai dari mana?", "bot");
setChips(MAIN_CHIPS);
const topik = new URLSearchParams(location.search).get("topik");
if (TOPIC_START[topik]) setTimeout(() => send(TOPIC_START[topik]), 400);
