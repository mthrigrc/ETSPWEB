## 1. Persona dan Permasalahan

### Persona
Pengguna aplikasi ini adalah pengemudi ojek online yang memiliki pendapatan harian tidak tetap. Pengemudi memperoleh pemasukan dari order, bonus, dan tip, serta memiliki pengeluaran seperti bensin, servis kendaraan, dan kebutuhan pribadi.

### Permasalahan
Pengemudi ojek online sering kesulitan mengetahui pendapatan bersih karena pemasukan dan pengeluaran harian tidak selalu dicatat dengan teratur. Akibatnya, pengemudi sulit mengetahui jumlah uang yang benar-benar diperoleh setelah dikurangi pengeluaran.

### Solusi
Dibuat aplikasi Catatan Keuangan Ojol berbasis web yang memungkinkan pengguna mencatat pemasukan dan pengeluaran, melihat riwayat transaksi, serta mengetahui total pemasukan, pengeluaran, dan pendapatan bersih pada hari ini.

## 2. Rancangan Struktur Data

Aplikasi menggunakan objek JavaScript untuk menyimpan data transaksi. Setiap transaksi memiliki struktur sebagai berikut:

| Atribut | Tipe Data | Keterangan |
|---|---|---|
| id | Number | Identitas unik transaksi |
| date | String | Tanggal transaksi |
| type | String | Jenis transaksi: pemasukan atau pengeluaran |
| category | String | Kategori transaksi |
| amount | Number | Nominal transaksi dalam rupiah |
| note | String | Catatan tambahan, bersifat opsional |

## 3. Keputusan Desain dan Alasannya

**Keputusan:** Menggunakan `localStorage` untuk menyimpan data transaksi.

**Alasan:** `localStorage` mudah digunakan, tidak memerlukan database atau server tambahan, dan memungkinkan data tetap tersimpan setelah halaman ditutup atau dimuat ulang. Solusi ini sesuai untuk aplikasi pencatatan keuangan sederhana yang digunakan pada satu browser.

Namun, data tidak otomatis tersinkronisasi ke perangkat lain dan dapat hilang jika penyimpanan browser dihapus.

## 4. Bug atau Kendala dan Cara Mengatasinya

### Bug 1: Kategori tidak sesuai dengan jenis transaksi

**Permasalahan:** Ketika pengguna mengganti jenis transaksi dari pemasukan menjadi pengeluaran, pilihan kategori harus ikut berubah. Jika tidak diperbarui, kategori yang dipilih dapat tidak sesuai dengan jenis transaksi.

**Penyebab:** Daftar kategori bergantung pada nilai input jenis transaksi.

**Solusi:** Membuat fungsi `updateCategories()` yang memperbarui pilihan kategori berdasarkan jenis transaksi. Fungsi ini dipanggil ketika jenis transaksi berubah dan ketika halaman pertama kali dibuka.

### Bug 2: Nominal transaksi tidak valid

**Permasalahan:** Pengguna dapat memasukkan nominal kosong, nol, negatif, atau nilai yang tidak valid.

**Penyebab:** Input pengguna tidak selalu sesuai dengan ketentuan nominal transaksi.

**Solusi:** Memvalidasi nominal menggunakan `Number()` dan `Number.isFinite()`, serta memastikan nominal lebih besar dari nol sebelum transaksi disimpan.

### Kendala 3: Data transaksi perlu tetap tersimpan

**Permasalahan:** Data transaksi dapat hilang dari tampilan jika hanya disimpan sementara di dalam variabel JavaScript.

**Penyebab:** Variabel JavaScript tidak mempertahankan data setelah halaman dimuat ulang.

**Solusi:** Menggunakan `localStorage` melalui fungsi `saveTransactions()` dan membaca data saat aplikasi dijalankan.
