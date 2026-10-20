# Catatan Integrasi Firebase (Google Sign-In & Review)

Fitur review di website Sumber Maju Teknik membutuhkan Firebase Auth (Google) + Firestore.
Ikuti langkah berikut jika ingin mengaktifkannya.

---

## Langkah 1 — Buat Project Firebase

1. Buka https://console.firebase.google.com
2. Klik **Add Project**, beri nama (mis. `sumber-maju-teknik`).
3. Setelah selesai, buka **Project Settings** → scroll ke bawah → copy konfigurasi `firebaseConfig`.

## Langkah 2 — Aktifkan Authentication

1. Menu kiri: **Authentication** → **Get Started**
2. Tab **Sign-in method** → aktifkan **Google**
3. Isi support email → **Save**

## Langkah 3 — Aktifkan Firestore

1. Menu kiri: **Firestore Database** → **Create database**
2. Pilih **Start in test mode** (untuk development)
3. Pilih region (mis. `asia-southeast2` untuk Jakarta)

## Langkah 4 — Tambahkan SDK ke index.html

Buka `index.html`, tambahkan **sebelum tag `</body>`**:

```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
  import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp }
    from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

  // GANTI dengan config dari Firebase Console
  const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx.firebaseapp.com",
    projectId: "xxx",
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "xxx",
    appId: "xxx"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  // 1. Login
  const btnGoogle = document.querySelector('.btn-google');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      signInWithPopup(auth, provider).catch(err => alert(err.message));
    });
  }

  // 2. Simpan review setelah login
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Sembunyikan tombol login, tampilkan form review
      if (btnGoogle) btnGoogle.style.display = 'none';
      // TODO: render form textarea + tombol kirim di sini
    }
  });
</script>