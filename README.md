# 🌐 Website Portfolio/CV Profesional

Website profil pribadi yang modern dan responsif untuk menampilkan CV, pengalaman kerja, keahlian, dan informasi kontak.

## 📁 Struktur Project

```
portfolio_website/
│
├── index.html          # File HTML utama
├── css/
│   └── style.css       # Styling website
├── js/
│   └── script.js       # Interaktivitas JavaScript
├── images/
│   └── profile.jpg     # Foto profil (tambahkan sendiri)
└── README.md           # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. **Setup Awal**
   - Pastikan semua file sudah tersimpan dalam struktur folder yang benar
   - Tambahkan foto profil Anda ke folder `images/` dengan nama `profile.jpg`

### 2. **Personalisasi Konten**

Edit file `index.html` dan ganti bagian berikut:

#### **Informasi Pribadi**
```html
<!-- Ganti bagian ini dengan informasi Anda -->
<h1 class="hero-title">Halo, Saya <span class="highlight">[Nama Anda]</span></h1>
<p class="hero-subtitle">[IT Security Specialist / Python Developer / Job Title Anda]</p>
```

#### **Link LinkedIn & Social Media**
```html
<!-- Ganti URL LinkedIn Anda -->
<a href="https://linkedin.com/in/yourprofile" target="_blank" class="social-btn linkedin">
    <i class="fab fa-linkedin"></i> LinkedIn
</a>

<!-- Ganti URL GitHub Anda -->
<a href="https://github.com/yourprofile" target="_blank" class="social-btn github">
    <i class="fab fa-github"></i> GitHub
</a>

<!-- Ganti email Anda -->
<a href="mailto:your.email@example.com" class="social-btn email">
    <i class="fas fa-envelope"></i> Email
</a>
```

#### **Pengalaman Kerja**
Edit bagian `<section id="experience">` untuk menambah/mengubah pengalaman:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">2023 - Sekarang</div>
        <h3>Posisi Anda</h3>
        <h4>Nama Perusahaan</h4>
        <ul>
            <li>Tanggung jawab 1</li>
            <li>Tanggung jawab 2</li>
            <li>Tanggung jawab 3</li>
        </ul>
    </div>
</div>
```

#### **Keahlian (Skills)**
Edit bagian skills sesuai keahlian Anda:

```html
<div class="skill-items">
    <span class="skill-tag">Python</span>
    <span class="skill-tag">JavaScript</span>
    <span class="skill-tag">Skill Lainnya</span>
</div>
```

#### **Kontak**
Ganti informasi kontak di bagian `<section id="contact">`:

```html
<p>your.email@example.com</p>
<p>+62 xxx-xxxx-xxxx</p>
<p>Jakarta, Indonesia</p>
```

### 3. **Menjalankan Website**

#### **Metode 1: Langsung Buka File**
- Double-click file `index.html`
- Website akan terbuka di browser default Anda

#### **Metode 2: Menggunakan VS Code Live Server**
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Website akan otomatis reload saat Anda edit file

#### **Metode 3: Python Simple HTTP Server**
```bash
# Buka terminal di folder portfolio_website
cd /Users/pakpahanw/Documents/ITSec/workspace_python/PythonLearning/portfolio_website

# Jalankan server
python3 -m http.server 8000

# Buka browser dan akses:
# http://localhost:8000
```

## ✨ Fitur Website

### ✅ **Responsif**
- Otomatis menyesuaikan dengan ukuran layar (desktop, tablet, mobile)
- Mobile-friendly navigation dengan hamburger menu

### ✅ **Smooth Scrolling**
- Navigasi halus antar section

### ✅ **Animasi**
- Elemen muncul saat di-scroll
- Hover effects pada buttons dan cards

### ✅ **Social Media Integration**
- Link langsung ke LinkedIn
- Link ke GitHub
- Email contact

### ✅ **Contact Form**
- Form kontak yang functional
- Otomatis membuka email client

### ✅ **Scroll to Top Button**
- Tombol untuk kembali ke atas halaman

## 🎨 Kustomisasi Warna

Edit file `css/style.css` pada bagian `:root` untuk mengubah warna:

```css
:root {
    --primary-color: #2563eb;      /* Warna utama */
    --secondary-color: #1e40af;    /* Warna sekunder */
    --accent-color: #3b82f6;       /* Warna aksen */
    --text-dark: #1f2937;          /* Warna teks gelap */
    --text-light: #6b7280;         /* Warna teks terang */
}
```

## 📱 Sections Website

1. **Home/Hero** - Intro dengan foto profil
2. **About** - Tentang diri Anda dan statistik
3. **Experience** - Timeline pengalaman kerja
4. **Skills** - Keahlian dan teknologi yang dikuasai
5. **Education** - Pendidikan dan sertifikasi
6. **Contact** - Informasi kontak dan form

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur website
- **CSS3** - Styling dan animasi
- **JavaScript** - Interaktivitas
- **Font Awesome** - Icons
- **Google Fonts** (opsional)

## 📝 Tips untuk Pemula

### **1. Edit Konten**
- Mulai dari atas ke bawah
- Edit satu section pada satu waktu
- Simpan dan refresh browser untuk melihat perubahan

### **2. Ganti Foto Profil**
- Siapkan foto dengan rasio 1:1 (kotak)
- Ukuran ideal: 500x500px atau lebih
- Format: JPG atau PNG
- Simpan dengan nama `profile.jpg` di folder `images/`

### **3. Link LinkedIn**
- Format: `https://linkedin.com/in/username-anda`
- Ganti `username-anda` dengan username LinkedIn Anda
- Pastikan profile LinkedIn sudah public

### **4. Testing**
- Test website di berbagai ukuran layar
- Gunakan Developer Tools (F12) di browser
- Test semua link berfungsi dengan baik

## 🌐 Deploy Website (Hosting Gratis)

### **1. GitHub Pages**
```bash
# 1. Buat repository baru di GitHub
# 2. Upload semua file
# 3. Settings → Pages → Deploy from main branch
# 4. URL: https://username.github.io/repository-name
```

### **2. Netlify**
- Drag & drop folder ke netlify.com
- Gratis dengan custom domain

### **3. Vercel**
- Import dari GitHub
- Deploy otomatis setiap kali update

### **4. Cloudflare Pages**
- Free hosting dengan CDN global

## 📧 Setup Contact Form (Advanced)

Untuk form yang benar-benar mengirim email tanpa membuka email client:

### **Option 1: EmailJS (Gratis)**
1. Daftar di [emailjs.com](https://www.emailjs.com/)
2. Setup email service
3. Tambahkan library EmailJS
4. Update script untuk kirim email

### **Option 2: FormSpree (Gratis)**
1. Daftar di [formspree.io](https://formspree.io/)
2. Ganti form action dengan endpoint FormSpree

### **Option 3: Backend Sendiri**
- Buat API dengan Python Flask/FastAPI
- Setup email service (Gmail SMTP, SendGrid, dll)

## 🎯 Next Steps

1. ✅ Personalisasi semua konten
2. ✅ Tambahkan foto profil
3. ✅ Update link LinkedIn dan social media
4. ✅ Test di browser
5. ✅ Deploy ke hosting gratis
6. ✅ Share link di LinkedIn

## 🆘 Troubleshooting

### **Foto tidak muncul?**
- Pastikan path: `images/profile.jpg` benar
- Cek nama file sama persis (case-sensitive)
- Gunakan format JPG atau PNG

### **Icons tidak muncul?**
- Pastikan koneksi internet aktif (Font Awesome dari CDN)
- Cek console browser untuk error (F12)

### **Layout berantakan di mobile?**
- Pastikan tag `<meta name="viewport">` ada di HTML
- Test dengan DevTools Responsive Mode

### **Smooth scroll tidak jalan?**
- Pastikan file `js/script.js` ter-load dengan benar
- Cek console untuk JavaScript errors

## 📚 Belajar Lebih Lanjut

- **HTML**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS**: [CSS-Tricks](https://css-tricks.com/)
- **JavaScript**: [JavaScript.info](https://javascript.info/)
- **Responsive Design**: [This is Responsive](https://bradfrost.github.io/this-is-responsive/)

## 💡 Ide Pengembangan

- [ ] Tambahkan section Portfolio/Projects
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog section
- [ ] Download CV button (PDF)
- [ ] Visitor counter
- [ ] Testimonials section

## 📄 License

Free to use untuk personal dan commercial projects.

---

**Selamat mencoba! 🚀**

Jika ada pertanyaan, jangan ragu untuk bertanya!
# Portfolio
