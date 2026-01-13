# 💰 AI Expense Tracker

Aplikasi pencatat pengeluaran cerdas berbasis React Native (Expo) dan Python (FastAPI), terintegrasi dengan PostgreSQL untuk penyimpanan data dan analisis pola pengeluaran (Association Rule Learning).

## 🚀 Arsitektur Tech Stack

- **Frontend:** React Native (Expo), TypeScript, Zustand (State Management), Nativewind (Styling).
- **Backend:** Python, FastAPI, SQLAlchemy.
- **Database:** PostgreSQL.
- **Tools:** DBeaver (DB Management), Axios (API Client).

---

## 🛠️ Panduan Instalasi & Menjalankan Server

Proyek ini terdiri dari dua bagian utama: **Backend** (Server) dan **Frontend** (Aplikasi Mobile). Keduanya harus dijalankan secara bersamaan agar aplikasi berfungsi normal.

### 1️⃣ Menjalankan Backend (Server)

Pastikan PostgreSQL sudah berjalan dan database dengan nama `ai_expense_tracker_db` sudah dibuat di DBeaver/pgAdmin.

1.  **Masuk ke folder backend:**

    ```bash
    cd backend
    ```

2.  **Aktifkan Virtual Environment (Python):**

    - **Windows (CMD/PowerShell):**
      ```bash
      .venv\Scripts\activate
      ```
    - **Mac/Linux:**
      ```bash
      source .venv/bin/activate
      ```

3.  **Install dependencies (jika belum):**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Jalankan Server:**
    Perintah ini menjalankan server pada host `0.0.0.0` agar bisa diakses oleh Emulator Android atau HP Fisik.
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    > _Server akan berjalan di `http://localhost:8000` (atau IP Laptop)._

---

### 2️⃣ Menjalankan Frontend (Mobile App)

⚠️ **PENTING:** Pastikan IP Address laptop Anda sudah dikonfigurasi dengan benar di file `src/config/apiClient.ts` sebelum menjalankan frontend.

1.  **Masuk ke root folder aplikasi** (pastikan keluar dari folder backend dulu):

    ```bash
    cd ..
    ```

2.  **Install dependencies (Node modules):**

    ```bash
    npm install
    # atau jika menggunakan yarn
    yarn install
    ```

3.  **Jalankan Expo Development Server:**
    ```bash
    npx expo start
    ```
    - Tekan tombol `a` di terminal untuk membuka di **Android Emulator**.
    - Atau scan QR Code menggunakan aplikasi **Expo Go** untuk membuka di **HP Fisik**.

---

## 📜 Available Scripts

Berikut adalah perintah-perintah (scripts) yang dapat digunakan dalam pengembangan proyek ini:

| Script     | Deskripsi Teknis                                                                                        |
| :--------- | :------------------------------------------------------------------------------------------------------ |
| `start`    | Menjalankan server pengembangan Expo (Metro Bundler) untuk memulai proyek.                              |
| `android`  | Membuild dan menjalankan aplikasi pada Emulator Android atau perangkat fisik yang terhubung via USB.    |
| `ios`      | Membuild dan menjalankan aplikasi pada Simulator iOS (memerlukan macOS).                                |
| `web`      | Menjalankan aplikasi dalam mode web browser (React Native Web).                                         |
| `lint`     | Menjalankan ESLint untuk memindai kode guna menemukan potensi error dan ketidaksesuaian gaya penulisan. |
| `lint:fix` | Menjalankan ESLint dan secara otomatis memperbaiki masalah _styling_ kode yang sederhana.               |
| `doctor`   | Mendiagnosis masalah lingkungan pengembangan (environment) dan memberikan saran perbaikan.              |

---

## ⚠️ Troubleshooting Koneksi

Jika aplikasi di HP/Emulator tidak bisa menyimpan data (Error Network / Request Failed 404):

1.  **Cek IP Address:** \* Jalankan `ipconfig` (Windows) atau `ifconfig` (Mac/Linux).
    - Pastikan IP di file `src/config/apiClient.ts` sama persis dengan IP Laptop Anda.
2.  **Firewall:** \* Pastikan Firewall Windows tidak memblokir port `8000` (Python).
3.  **Jaringan:** \* Pastikan Laptop dan HP berada di jaringan Wi-Fi yang sama persis.
