"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="from-primary-50 to-primary-100 min-h-screen bg-gradient-to-br via-white">
            {/* Read Progress Bar */}
            <div className="bg-primary-100 fixed top-0 left-0 z-50 h-1 w-full">
                <div className="bg-primary-500 h-full transition-[width] duration-200 ease-out" style={{ width: `${progress}%` }} />
            </div>

            {/* Hero Banner */}
            <div className="from-primary-600 to-primary-400 bg-gradient-to-r py-12 text-white shadow-md">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight">Kebijakan Privasi</h1>
                    <p className="text-primary-100 mt-2 font-semibold">Dasbor IKA FTIP Unpad</p>
                    <div className="text-primary-100 mt-4 flex flex-wrap gap-4 text-sm">
                        <span>Terakhir diperbarui: 26 Maret 2026</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="ring-primary-100 overflow-hidden rounded-2xl bg-white shadow-lg ring-1">
                    <div className="p-8 md:p-12">
                        <div className="space-y-10 text-gray-700">
                            {/* Section 1 */}
                            <section>
                                <SectionHeading number="1" title="Pendahuluan" />
                                <p className="mb-4">
                                    Ikatan Keluarga Alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran (
                                    <strong>IKA FTIP Unpad</strong>) mengoperasikan dasbor IKA FTIP Unpad yang dapat diakses melalui aplikasi ini
                                    (&quot;Layanan&quot;). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan
                                    melindungi informasi pribadi Anda ketika menggunakan Layanan kami.
                                </p>
                                <p>
                                    Dengan mendaftar dan menggunakan Layanan, Anda menyetujui pengumpulan dan penggunaan informasi sebagaimana
                                    dijelaskan dalam Kebijakan Privasi ini.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section>
                                <SectionHeading number="2" title="Informasi yang Kami Kumpulkan" />

                                <SubHeading title="2.1 Informasi yang Anda Berikan Langsung" />
                                <p className="mb-2 font-medium text-gray-800">Saat Registrasi (Email/Password):</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>Alamat email</li>
                                    <li>Nama lengkap</li>
                                    <li>Nomor Pokok Mahasiswa (NPM)</li>
                                    <li>Program Studi (TEP, TPN, TIN, atau Teknotan)</li>
                                    <li>Tahun masuk kuliah</li>
                                    <li>Tahun kelulusan</li>
                                    <li>Kata sandi (disimpan dalam bentuk terenkripsi menggunakan bcrypt)</li>
                                </ul>

                                <p className="mb-2 font-medium text-gray-800">Saat Registrasi (Google OAuth):</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>Alamat email (dari akun Google)</li>
                                    <li>Nama lengkap (dari profil Google)</li>
                                    <li>NPM, program studi, tahun masuk, dan tahun kelulusan (diisi manual saat registrasi)</li>
                                </ul>

                                <p className="mb-2 font-medium text-gray-800">Saat Memperbarui Profil Alumni:</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>URL LinkedIn (opsional)</li>
                                    <li>Informasi lokasi: kota, provinsi, negara (opsional)</li>
                                    <li>
                                        Riwayat pekerjaan: industri, level jabatan, tipe pekerjaan, kisaran penghasilan, judul pekerjaan, nama
                                        perusahaan, tahun mulai/selesai (opsional)
                                    </li>
                                    <li>Riwayat pendidikan lanjut: gelar, universitas, bidang studi, tahun masuk/kelulusan (opsional)</li>
                                </ul>

                                <p className="mb-2 font-medium text-gray-800">Saat Memposting Lowongan Kerja:</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>Judul, deskripsi, nama perusahaan, lokasi, tipe pekerjaan, kisaran gaji</li>
                                    <li>URL eksternal (opsional)</li>
                                </ul>

                                <p className="mb-2 font-medium text-gray-800">Saat Mendaftarkan Bisnis:</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>Nama bisnis, deskripsi, kategori, lokasi, website, informasi kontak</li>
                                </ul>

                                <SubHeading title="2.2 Informasi yang Dikumpulkan Secara Otomatis" />
                                <p className="mb-2 font-medium text-gray-800">Data Sesi:</p>
                                <ul className="mb-4 ml-4 list-disc space-y-1 pl-2">
                                    <li>ID pengguna dan peran (USER/ADMIN) disimpan dalam cookie sesi terenkripsi (iron-session)</li>
                                    <li>Cookie sesi bersifat HTTP-only (tidak dapat diakses oleh JavaScript) dan berlaku selama 1 hari</li>
                                </ul>

                                <p className="mb-2 font-medium text-gray-800">Data Teknis:</p>
                                <ul className="ml-4 list-disc space-y-1 pl-2">
                                    <li>
                                        Kami tidak secara aktif mencatat alamat IP, browser, atau informasi perangkat; namun penyedia infrastruktur
                                        (Vercel, Supabase) dapat mencatat ini sesuai kebijakan mereka masing-masing.
                                    </li>
                                </ul>
                            </section>

                            {/* Section 3 */}
                            <section>
                                <SectionHeading number="3" title="Bagaimana Kami Menggunakan Informasi Anda" />
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-primary-50">
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Tujuan
                                                </th>
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Dasar Hukum
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                ["Membuat dan mengelola akun alumni", "Pelaksanaan perjanjian (syarat & ketentuan layanan)"],
                                                ["Verifikasi identitas alumni FTIP Unpad", "Kepentingan sah organisasi"],
                                                ["Mengirim email verifikasi dan reset kata sandi", "Pelaksanaan perjanjian"],
                                                ["Menampilkan direktori alumni kepada sesama anggota", "Persetujuan (dengan mendaftar ke platform)"],
                                                ["Menampilkan lowongan kerja dan direktori bisnis", "Pelaksanaan perjanjian"],
                                                ["Mengirimkan email selamat datang setelah verifikasi", "Kepentingan sah organisasi"],
                                                ["Memungkinkan pencarian dan filter data alumni", "Kepentingan sah organisasi"],
                                                ["Menghasilkan statistik agregat (jumlah alumni, lowongan, bisnis)", "Kepentingan sah organisasi"],
                                                ["Keamanan: mendeteksi dan mencegah penyalahgunaan", "Kewajiban hukum dan kepentingan sah"],
                                            ].map(([tujuan, dasar], i) => (
                                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                    <td className="border border-gray-200 px-4 py-2">{tujuan}</td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">{dasar}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section>
                                <SectionHeading number="4" title="Berbagi dan Pengungkapan Data" />

                                <SubHeading title="4.1 Dengan Sesama Anggota Terdaftar" />
                                <p className="mb-4">
                                    Informasi profil alumni (nama, NPM, program studi, angkatan, lokasi, LinkedIn, riwayat kerja dan pendidikan) dapat
                                    dilihat oleh seluruh anggota terdaftar yang telah login. Lowongan kerja dan listing bisnis bersifat publik untuk
                                    seluruh anggota.
                                </p>

                                <SubHeading title="4.2 Penyedia Layanan Pihak Ketiga" />
                                <p className="mb-2">Kami menggunakan pihak ketiga berikut dalam mengoperasikan Layanan:</p>
                                <div className="mb-4 overflow-x-auto">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-primary-50">
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Penyedia
                                                </th>
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Layanan
                                                </th>
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Data yang Diproses
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                [
                                                    "Google (Google Identity Services)",
                                                    "Autentikasi OAuth",
                                                    "Email, nama dari akun Google; token diverifikasi melalui JWKS Google",
                                                ],
                                                ["Supabase (PostgreSQL)", "Penyimpanan database", "Seluruh data pengguna dan konten"],
                                                ["Vercel", "Hosting & serverless functions", "Request HTTP, variabel lingkungan"],
                                                ["Layanan SMTP (Gmail/SMTP konfigurasi)", "Pengiriman email", "Alamat email penerima, konten email"],
                                            ].map(([penyedia, layanan, data], i) => (
                                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                    <td className="border border-gray-200 px-4 py-2 font-medium">{penyedia}</td>
                                                    <td className="border border-gray-200 px-4 py-2">{layanan}</td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">{data}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mb-4 text-sm text-gray-600">Kami tidak menjual data pribadi Anda kepada pihak ketiga.</p>

                                <SubHeading title="4.3 Kebutuhan Hukum" />
                                <p>
                                    Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum yang berlaku atau perintah pengadilan yang sah.
                                </p>
                            </section>

                            {/* Section 5 */}
                            <section>
                                <SectionHeading number="5" title="Penyimpanan dan Retensi Data" />
                                <ul className="ml-4 list-disc space-y-2 pl-2">
                                    <li>Data disimpan di server database PostgreSQL yang dioperasikan oleh Supabase (region: AWS ap-south-1).</li>
                                    <li>
                                        Akun yang dihapus menggunakan <strong>soft delete</strong> — data ditandai dengan{" "}
                                        <code className="bg-primary-50 text-primary-700 rounded px-1 py-0.5 text-sm">deletedAt</code> dan tidak
                                        ditampilkan, namun masih tersimpan di database. Penghapusan permanen dapat diminta dengan menghubungi kami.
                                    </li>
                                    <li>
                                        Token verifikasi email kedaluwarsa dalam <strong>24 jam</strong>.
                                    </li>
                                    <li>
                                        Token reset kata sandi kedaluwarsa dalam <strong>1 jam</strong>.
                                    </li>
                                    <li>
                                        Cookie sesi kedaluwarsa dalam <strong>1 hari</strong>.
                                    </li>
                                </ul>
                            </section>

                            {/* Section 6 */}
                            <section>
                                <SectionHeading number="6" title="Keamanan Data" />
                                <p className="mb-4">Kami menerapkan langkah-langkah keamanan teknis berikut:</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {[
                                        ["Enkripsi kata sandi", "Menggunakan bcrypt (one-way hash)"],
                                        ["Enkripsi sesi", "Cookie dienkripsi menggunakan iron-session (AES-256-GCM)"],
                                        ["HTTPS", "Cookie hanya dikirim melalui koneksi HTTPS di lingkungan produksi"],
                                        ["HTTP-only cookie", "Cookie sesi tidak dapat diakses oleh JavaScript browser"],
                                        ["Rate limiting", "Pembatasan jumlah permintaan pada endpoint sensitif untuk mencegah penyalahgunaan"],
                                        ["Verifikasi token OAuth", "Token Google diverifikasi terhadap JWKS resmi Google"],
                                        ["Parameterized queries", "Seluruh query database menggunakan Prisma ORM untuk mencegah SQL injection"],
                                        ["CORS", "Akses API dibatasi hanya dari domain frontend yang dikonfigurasi"],
                                    ].map(([label, desc], i) => (
                                        <div key={i} className="border-primary-100 bg-primary-50/40 rounded-lg border p-3">
                                            <p className="text-primary-800 font-medium">{label}</p>
                                            <p className="text-sm text-gray-600">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-sm text-gray-600">
                                    Meski demikian, tidak ada sistem yang 100% aman. Kami mendorong Anda untuk menggunakan kata sandi yang kuat dan
                                    menjaga kerahasiaan kredensial Anda.
                                </p>
                            </section>

                            {/* Section 7 */}
                            <section>
                                <SectionHeading number="7" title="Hak-Hak Anda" />

                                <SubHeading title="7.1 Hak Akses" />
                                <p className="mb-4">Anda dapat melihat data profil Anda melalui halaman profil di aplikasi.</p>

                                <SubHeading title="7.2 Hak Pembaruan" />
                                <p className="mb-4">
                                    Anda dapat memperbarui profil alumni Anda (termasuk nama, NPM, angkatan, lokasi, riwayat kerja, dan pendidikan)
                                    kapan saja melalui halaman profil.
                                </p>

                                <SubHeading title="7.3 Hak Penghapusan" />
                                <p className="mb-4">
                                    Anda dapat meminta penghapusan akun Anda dengan menghubungi administrator. Akun akan ditandai sebagai terhapus
                                    (soft delete); untuk penghapusan data permanen, ajukan permintaan tertulis kepada kami.
                                </p>

                                <SubHeading title="7.4 Hak Portabilitas" />
                                <p className="mb-4">
                                    Anda berhak meminta salinan data pribadi Anda dalam format yang dapat dibaca mesin. Hubungi kami untuk mengajukan
                                    permintaan ini.
                                </p>

                                <SubHeading title="7.5 Pencabutan Persetujuan Google" />
                                <p>
                                    Jika Anda menggunakan Google OAuth, Anda dapat mencabut akses IKA FTIP dari pengaturan akun Google Anda kapan
                                    saja. Ini tidak menghapus data yang sudah tersimpan di sistem kami.
                                </p>
                            </section>

                            {/* Section 8 */}
                            <section>
                                <SectionHeading number="8" title="Cookie" />
                                <p className="mb-4">Kami menggunakan satu jenis cookie:</p>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-primary-50">
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Cookie
                                                </th>
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Tujuan
                                                </th>
                                                <th className="border-primary-200 text-primary-800 border px-4 py-2 text-left font-semibold">
                                                    Durasi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white">
                                                <td className="border border-gray-200 px-4 py-2">
                                                    <code className="bg-primary-50 text-primary-700 rounded px-1 py-0.5">alumni_session</code>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">
                                                    Menyimpan status login (ID pengguna dan peran, terenkripsi)
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2">1 hari</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-3 text-sm text-gray-600">
                                    Cookie ini bersifat <strong>esensial</strong> untuk fungsi Layanan dan tidak dapat dinonaktifkan tanpa kehilangan
                                    akses ke Layanan.
                                </p>
                            </section>

                            {/* Section 9 */}
                            <section>
                                <SectionHeading number="9" title="Privasi Anak-Anak" />
                                <p>
                                    Layanan ini ditujukan untuk alumni perguruan tinggi. Kami tidak secara sengaja mengumpulkan data dari individu di
                                    bawah usia 17 tahun. Jika Anda mengetahui bahwa seorang anak telah memberikan data kepada kami, silakan hubungi
                                    kami agar dapat segera kami hapus.
                                </p>
                            </section>

                            {/* Section 10 */}
                            <section>
                                <SectionHeading number="10" title="Perubahan Kebijakan Privasi" />
                                <p>
                                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan diinformasikan melalui
                                    email atau pemberitahuan dalam aplikasi. Penggunaan Layanan yang berkelanjutan setelah perubahan dianggap sebagai
                                    penerimaan terhadap kebijakan yang diperbarui.
                                </p>
                            </section>

                            {/* Section 11 */}
                            <section>
                                <SectionHeading number="11" title="Kontak" />
                                <p className="mb-4">Untuk pertanyaan, permintaan akses data, atau pelaporan masalah privasi, hubungi:</p>
                                <div className="border-primary-200 bg-primary-50 rounded-xl border p-5">
                                    <p className="text-primary-900 font-semibold">IKA FTIP Unpad</p>
                                    <p className="mt-1 text-sm">
                                        Email:{" "}
                                        <a href="mailto:noreply@ikaftipunpad.com" className="text-primary-600 hover:text-primary-800 underline">
                                            noreply@ikaftipunpad.com
                                        </a>
                                    </p>
                                    <p className="mt-1 text-sm">
                                        Website:{" "}
                                        <a href="https://ikaftipunpad.vercel.app" className="text-primary-600 hover:text-primary-800 underline">
                                            ikaftipunpad
                                        </a>
                                    </p>
                                </div>
                            </section>

                            {/* Footer note */}
                            <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                                <p>Dokumen ini dibuat berdasarkan analisis teknis API Dasbor IKA FTIP Unpad versi Maret 2026.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
    return (
        <div className="mb-4 flex items-center gap-3">
            <span className="bg-primary-500 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                {number}
            </span>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
    );
}

function SubHeading({ title }: { title: string }) {
    return <h3 className="text-primary-700 mt-4 mb-2 font-semibold">{title}</h3>;
}
