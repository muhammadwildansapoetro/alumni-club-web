import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Kebijakan Privasi — Alumni Club Dashboard",
    description: "Kebijakan Privasi Alumni Club Dashboard - FTIP Unpad",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="from-secondary-100 to-primary-200 min-h-screen bg-linear-to-b">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo IKA FTIP Unpad" width={40} height={40} />
                            <span className="text-xl font-semibold text-gray-900">FTIP Unpad Alumni Club</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900">Kebijakan Privasi — FTIP Unpad Alumni Club</h1>

                    <p className="mb-8 text-sm text-gray-600">Terakhir diperbarui: 14 Desember 2025</p>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">1. Pendahuluan</h2>
                            <p className="mb-4 text-gray-700">
                                <strong>FTIP Alumni Club (&quot;Kami&quot;, &quot;milik kami&quot;, atau &quot;Kami&quot;)</strong> berkomitmen untuk
                                melindungi privasi dan keamanan informasi pribadi yang dikumpulkan melalui platform manajemen alumni kami. Kebijakan
                                Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat
                                menggunakan layanan kami.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Tanggal Berlaku:</strong> 14 Desember 2025
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">2. Informasi yang Kami Kumpulkan</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">2.1 Informasi Pribadi</h3>
                                    <p className="mb-2 text-gray-700">Saat Anda mendaftar akun, kami mengumpulkan:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Alamat Email:</strong> Digunakan sebagai identifier unik dan untuk komunikasi
                                        </li>
                                        <li>
                                            <strong>Nama Lengkap:</strong> Nama lengkap Anda untuk direktori alumni dan identifikasi
                                        </li>
                                        <li>
                                            <strong>Informasi Akun Google:</strong> Saat mengautentikasi melalui Google OAuth, kami menerima ID Google
                                            dan informasi profil dasar
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">2.2 Informasi Profil Alumni</h3>
                                    <p className="mb-2 text-gray-700">Kami mengumpulkan informasi alumni detail termasuk:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Informasi Akademik:</strong> Jurusan (TEP/TPN/TIN), tahun angkatan
                                        </li>
                                        <li>
                                            <strong>Lokasi:</strong> Kota tempat tinggal
                                        </li>
                                        <li>
                                            <strong>Informasi Profesional:</strong>
                                            <ul className="list-circle ml-4 list-inside space-y-1 text-gray-600">
                                                <li>
                                                    Bidang industri (Pertanian, Teknologi Pangan, Bioteknologi, Riset, Pendidikan, Teknik, Bisnis,
                                                    Pemasaran, Keuangan, Pemerintah, Freelance, Lainnya)
                                                </li>
                                                <li>
                                                    Tingkat pekerjaan (Magang, Staf, Supervisor, Manager, Senior Manager, Direktur, VP, C-Level,
                                                    Founder, Lainnya)
                                                </li>
                                                <li>Rentang pendapatan (Di bawah 5Jt, 5-10Jt, 10-20Jt, Di atas 20Jt IDR, Tidak diketahui)</li>
                                                <li>Jabatan dan nama perusahaan</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <strong>Media Sosial Profesional:</strong> URL profil LinkedIn (opsional)
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">2.3 Konten yang Dihasilkan Pengguna</h3>
                                    <p className="mb-2 text-gray-700">Jika Anda memilih untuk berkontribusi, kami mengumpulkan:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Lowongan Pekerjaan:</strong> Judul, deskripsi, perusahaan, lokasi, jenis pekerjaan, rentang gaji,
                                            URL eksternal
                                        </li>
                                        <li>
                                            <strong>Daftar Direktori Bisnis:</strong> Nama bisnis, deskripsi, kategori, lokasi, website, informasi
                                            kontak
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">2.4 Informasi yang Dikumpulkan Secara Otomatis</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Data Autentikasi:</strong> Token Google OAuth dan status autentikasi
                                        </li>
                                        <li>
                                            <strong>Data Penggunaan:</strong> Interaksi sistem dan pola akses API
                                        </li>
                                        <li>
                                            <strong>Data Teknis:</strong> Alamat IP, informasi perangkat, jenis browser (untuk tujuan keamanan)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">3. Cara Kami Menggunakan Informasi Anda</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">3.1 Tujuan Utama</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Autentikasi & Manajemen Akun:</strong> Untuk verifikasi identitas dan manajemen akun
                                        </li>
                                        <li>
                                            <strong>Direktori Alumni:</strong> Untuk memelihara direktori alumni yang dapat dicari
                                        </li>
                                        <li>
                                            <strong>Jaringan Profesional:</strong> Untuk memfasilitasi koneksi antar alumni
                                        </li>
                                        <li>
                                            <strong>Kesempatan Karier:</strong> Untuk berbagi lowongan pekerjaan dan peluang bisnis
                                        </li>
                                        <li>
                                            <strong>Analisis Statistik:</strong> Untuk menghasilkan statistik agregat tentang alumni FTIP (data
                                            anonim)
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">3.2 Penggunaan Spesifik</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Komunikasi Email:</strong> Notifikasi akun, pembaruan sistem, dan berita alumni relevan
                                        </li>
                                        <li>
                                            <strong>Manajemen Profil:</strong> Memungkinkan Anda memperbarui dan memelihara profil alumni
                                        </li>
                                        <li>
                                            <strong>Moderasi Konten:</strong> Meninjau lowongan pekerjaan dan daftar bisnis yang dihasilkan pengguna
                                        </li>
                                        <li>
                                            <strong>Keamanan:</strong> Melindungi terhadap akses tidak sah dan aktivitas penipuan
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">4. Penyimpanan dan Keamanan Data</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">4.1 Lokasi Penyimpanan</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Semua data disimpan dengan aman di database cloud PostgreSQL Supabase</li>
                                        <li>Database dihosting di infrastruktur AWS dengan keamanan tingkat enterprise</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">4.2 Langkah Keamanan</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Enkripsi Data Pribadi:</strong> Informasi sensitif (email, token OAuth, data lokasi, pendapatan)
                                            dienkripsi menggunakan AES-256-GCM sebelum penyimpanan
                                        </li>
                                        <li>
                                            <strong>Enkripsi Parameter Query:</strong> Parameter URL sensitif dienkripsi untuk mencegah eksposisi data
                                            di browser history dan logs
                                        </li>
                                        <li>
                                            <strong>Enkripsi Transit:</strong> Semua data dikirim melalui koneksi HTTPS/TLS 1.3 dengan enkripsi
                                            end-to-end
                                        </li>
                                        <li>
                                            <strong>Autentikasi:</strong> Integrasi Google OAuth 2.0 yang aman dengan token JWT yang dienkripsi
                                        </li>
                                        <li>
                                            <strong>Kontrol Akses:</strong> Kontrol akses berbasis peran (Peran Pengguna/Admin) dengan validasi
                                            terenkripsi
                                        </li>
                                        <li>
                                            <strong>Pembatasan Laju:</strong> Endpoint API dilindungi dari penyalahgunaan dengan pembatasan laju
                                            (100/15 menit umum, 15/5 menit autentikasi)
                                        </li>
                                        <li>
                                            <strong>Manajemen Kunci:</strong> Kunci enkripsi AES-256 dikelola dengan aman menggunakan derivasi kunci
                                            PBKDF2 dengan 100,000 iterasi
                                        </li>
                                        <li>
                                            <strong>Penghapusan Lembut:</strong> Data pengguna ditandai sebagai dihapus daripada dihapus permanen
                                            untuk integritas data
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">4.3 Retensi Data</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Akun Aktif:</strong> Data disimpan selama akun Anda tetap aktif
                                        </li>
                                        <li>
                                            <strong>Akun Dihapus:</strong> Data dihapus secara lembut dan dipertahankan untuk integritas sistem
                                        </li>
                                        <li>
                                            <strong>Data Statistik:</strong> Statistik agregat dapat dipertahankan tanpa batas waktu
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">5. Berbagi dan Pengungkapan Informasi</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">5.1 Informasi Publik</h3>
                                    <p className="mb-2 text-gray-700">Informasi berikut terlihat oleh alumni lain yang terautentikasi:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Profil Dasar:</strong> Nama, jurusan, tahun angkatan, kota
                                        </li>
                                        <li>
                                            <strong>Informasi Profesional:</strong> Industri, tingkat pekerjaan, jabatan, perusahaan (jika disediakan)
                                        </li>
                                        <li>
                                            <strong>Profil LinkedIn:</strong> Jika Anda memilih untuk menyertakannya
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">5.2 Informasi Pribadi</h3>
                                    <p className="mb-2 text-gray-700">Informasi berikut tidak pernah dibagikan secara publik:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Alamat email (hanya terlihat oleh administrator)</li>
                                        <li>Token autentikasi Google</li>
                                        <li>Informasi rentang pendapatan (hanya digunakan untuk statistik agregat)</li>
                                        <li>Status penghapusan akun</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">5.3 Layanan Pihak Ketiga</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Google OAuth:</strong> Kami menggunakan layanan autentikasi Google untuk login yang aman
                                        </li>
                                        <li>
                                            <strong>Supabase:</strong> Hosting dan manajemen database
                                        </li>
                                        <li>
                                            <strong>AWS Cloud Infrastructure:</strong> Hosting server dan penyimpanan data
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">6. Hak dan Pilihan Anda</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">6.1 Akses dan Kontrol Data</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Lihat:</strong> Anda dapat melihat semua data pribadi melalui profil Anda
                                        </li>
                                        <li>
                                            <strong>Perbarui:</strong> Anda dapat memperbarui informasi profil alumni kapan saja
                                        </li>
                                        <li>
                                            <strong>Hapus:</strong> Anda dapat meminta penghapusan akun (penghapusan lembut dengan retensi data)
                                        </li>
                                        <li>
                                            <strong>Ekspor:</strong> Anda dapat meminta salinan data pribadi Anda
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">6.2 Pilihan Autentikasi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Google OAuth:</strong> Kami menggunakan Google sebagai penyedia autentikasi eksklusif
                                        </li>
                                        <li>
                                            <strong>Keamanan Akun:</strong> Anda mengontrol akses melalui akun Google Anda
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">6.3 Preferensi Komunikasi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Notifikasi Email:</strong> Komunikasi akun penting tidak dapat dinonaktifkan
                                        </li>
                                        <li>
                                            <strong>Komunikasi Promosi:</strong> Anda dapat keluar dari komunikasi non-esensial
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">7. Cookie dan Pelacakan</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">7.1 Cookie Autentikasi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Token JWT:</strong> Token autentikasi aman dengan masa kedaluwarsa 7 hari
                                        </li>
                                        <li>
                                            <strong>Manajemen Sesi:</strong> Cookie untuk mempertahankan status login Anda
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">7.2 Cookie Keamanan</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Perlindungan CSRF:</strong> Token keamanan untuk mencegah pemalsuan permintaan lintas situs
                                        </li>
                                        <li>
                                            <strong>Pembatasan Laju:</strong> Cookie untuk menegakkan batas penggunaan API
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">8. Privasi Anak-Anak</h2>
                            <p className="mb-4 text-gray-700">
                                Layanan ini dimaksudkan untuk alumni dewasa FTIP Unpad. Kami tidak sengaja mengumpulkan informasi dari individu di
                                bawah 18 tahun.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">9. Transfer Data Internasional</h2>
                            <p className="mb-4 text-gray-700">
                                Data Anda dapat diproses dan disimpan di server yang terletak di luar Indonesia. Kami memastikan perlindungan yang
                                tepat ada untuk transfer data internasional.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">10. Notifikasi Pelanggaran Data</h2>
                            <p className="mb-4 text-gray-700">Dalam kasus pelanggaran data yang memengaruhi informasi pribadi Anda, kami akan:</p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Memberi tahu pengguna yang terpengaruh dalam 72 jam sejak penemuan</li>
                                <li>Memberikan detail tentang pelanggaran dan dampaknya</li>
                                <li>Menguraikan langkah yang diambil untuk mengurangi pelanggaran</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">11. Perubahan pada Kebijakan Privasi Ini</h2>
                            <p className="mb-4 text-gray-700">
                                Kami mungkin memperbarui Kebijakan Privasi ini secara berkala. Kami akan memberi tahu pengguna tentang perubahan
                                signifikan melalui:
                            </p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Notifikasi email</li>
                                <li>Notifikasi situs web</li>
                                <li>Pengumuman dalam aplikasi</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">12. Informasi Kontak</h2>
                            <p className="mb-4 text-gray-700">
                                Untuk pertanyaan, kekhawatiran, atau pelaksanaan hak Anda mengenai Kebijakan Privasi ini, silakan hubungi:
                            </p>
                            <div className="ml-4 text-gray-700">
                                <p>
                                    <strong>Administrasi FTIP Alumni Club</strong>
                                </p>
                                <p>Email: [alamat email admin]</p>
                                <p>Fakultas: Fakultas Teknologi Industri Pertanian</p>
                                <p>Universitas Padjadjaran</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">13. Dasar Hukum untuk Pemrosesan</h2>
                            <p className="mb-4 text-gray-700">
                                Sesuai hukum perlindungan data yang berlaku, kami memproses data pribadi Anda berdasarkan:
                            </p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>
                                    <strong>Kepentingan Sah:</strong> Memelihara jaringan alumni dan memfasilitasi koneksi profesional
                                </li>
                                <li>
                                    <strong>Kewajiban Kontraktual:</strong> Menyediakan layanan alumni yang Anda minta
                                </li>
                                <li>
                                    <strong>Persetujuan:</strong> Di mana Anda telah memberikan persetujuan eksplisit untuk aktivitas pemrosesan
                                    tertentu
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">14. Detail Pemrosesan Data Spesifik</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">14.1 Pemrosesan Data Statistik</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Data pribadi yang digunakan untuk statistik diagregasi dan dianonimkan</li>
                                        <li>Tidak ada individu yang dapat diidentifikasi dari statistik yang dipublikasikan</li>
                                        <li>Data pendapatan hanya digunakan dalam bentuk agregat untuk analisis demografis</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">14.2 Lowongan Pekerjaan dan Direktori Bisnis</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Konten yang dihasilkan pengguna dimoderasi tetapi tidak diedit</li>
                                        <li>Informasi kontak dalam daftar bisnis bersifat publik untuk alumni lain</li>
                                        <li>Lowongan pekerjaan dapat menyertakan tautan eksternal ke situs web pihak ketiga</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">15. Detail Implementasi Teknis</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">15.1 Keamanan API</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Semua endpoint API memerlukan autentikasi</li>
                                        <li>Autentikasi berbasis password telah dihentikan untuk Google OAuth yang aman</li>
                                        <li>
                                            Pembatasan laju mencegah penyalahgunaan otomatis (100 permintaan/15 menit umum, 15 permintaan/5 menit
                                            untuk autentikasi)
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">15.2 Integritas Data</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Transaksi database memastikan konsistensi data</li>
                                        <li>Backup reguler melindungi dari kehilangan data</li>
                                        <li>Log audit melacak tindakan administratif</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">16. Detail Implementasi Enkripsi</h2>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">16.1 Standar Enkripsi yang Digunakan</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Algoritma:</strong> AES-256-GCM (Advanced Encryption Standard dengan Galois/Counter Mode)
                                        </li>
                                        <li>
                                            <strong>Panjang Kunci:</strong> 256 bits (32 bytes) dengan derivasi kunci PBKDF2
                                        </li>
                                        <li>
                                            <strong>Vector Inisialisasi (IV):</strong> 96 bits yang dihasilkan secara acak untuk setiap enkripsi
                                        </li>
                                        <li>
                                            <strong>Tag Autentikasi:</strong> 128 bits untuk memastikan integritas data
                                        </li>
                                        <li>
                                            <strong>Derivasi Kunci:</strong> PBKDF2 dengan HMAC-SHA256 dan 100,000 iterasi
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">16.2 Data yang Dienkripsi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Data Identitas Pribadi:</strong> Alamat email, token OAuth, informasi profil sensitif
                                        </li>
                                        <li>
                                            <strong>Data Lokasi:</strong> Informasi kota dan alamat pengguna
                                        </li>
                                        <li>
                                            <strong>Data Finansial:</strong> Rentang pendapatan dan informasi gaji
                                        </li>
                                        <li>
                                            <strong>Data Kontak:</strong> Nomor telepon dan informasi kontak profesional
                                        </li>
                                        <li>
                                            <strong>Parameter URL:</strong> ID pengguna, token sesi, dan parameter sensitif lainnya
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">16.3 Manajemen Kunci Enkripsi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Penyimpanan Kunci:</strong> Kunci master disimpan dalam environment variables yang aman
                                        </li>
                                        <li>
                                            <strong>Rotasi Kunci:</strong> Direkomendasikan rotasi kunci setiap 1 tahun untuk keamanan maksimal
                                        </li>
                                        <li>
                                            <strong>Derivasi Kunci:</strong> Kunci unik dihasilkan untuk setiap operasi enkripsi menggunakan salt acak
                                        </li>
                                        <li>
                                            <strong>Backup Kunci:</strong> Prosedur backup dan recovery kunci untuk mencegah kehilangan data
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">16.4 Performa Enkripsi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>Hardware Acceleration:</strong> Menggunakan Web Crypto API dan Node.js crypto module untuk
                                            performa optimal
                                        </li>
                                        <li>
                                            <strong>Impact Minimal:</strong> Enkripsi dirancang untuk memiliki impact minimal terhadap performa
                                            aplikasi
                                        </li>
                                        <li>
                                            <strong>Async Operations:</strong> Operasi enkripsi bersifat asinkron untuk mencegal blocking UI
                                        </li>
                                        <li>
                                            <strong>Caching:</strong> Hasil enkripsi di-cache secara efisien untuk akses berulang
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">16.5 Kepatuhan Regulasi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>
                                            <strong>UU PDP Indonesia:</strong> Enkripsi data pribadi sesuai Pasal 28 UU No. 27/2022
                                        </li>
                                        <li>
                                            <strong>Standar Internasional:</strong> Kepatuhan GDPR Article 32 untuk keamanan data
                                        </li>
                                        <li>
                                            <strong>Audit Trail:</strong> Log enkripsi dan dekripsi untuk audit keamanan
                                        </li>
                                        <li>
                                            <strong>Testing Keamanan:</strong> Penetration testing rutin untuk validasi implementasi enkripsi
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <p className="text-center text-sm text-gray-600">
                                <strong>Terakhir Diperbarui:</strong> 14 Desember 2025
                            </p>
                            <p className="mt-2 text-center text-xs text-gray-500">
                                Kebijakan Privasi ini dirancang untuk mematuhi Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU
                                PDP).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
