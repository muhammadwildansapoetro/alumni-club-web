import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Kebijakan Privasi — Alumni Club Dashboard",
    description: "Kebijakan Privasi Alumni Club Dashboard - FTIP Unpad",
};

export default function PrivacyPolicyPage() {
    const currentDate = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo IKA FTIP Unpad" width={40} height={40} />
                            <span className="text-xl font-semibold text-gray-900">FTIP Unpad Alumni Club</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900">Kebijakan Privasi — FTIP Unpad Alumni Club</h1>

                    <p className="mb-8 text-sm text-gray-600">Terakhir diperbarui: {currentDate}</p>

                    <div className="prose prose-gray max-w-none space-y-6">
                        <p className="leading-relaxed text-gray-700">
                            <strong>Pengurus Ikatan Alumni FTIP Unpad (&quot;Kami&quot;)</strong> berkomitmen untuk melindungi privasi dan data
                            pribadi <strong>pengguna (&quot;Anda&quot;)</strong>. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
                            menggunakan, menyimpan, dan melindungi data Anda ketika menggunakan platform Alumni Club Dashboard.
                        </p>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">1. Data yang Kami Kumpulkan</h2>
                            <p className="mb-4 text-gray-700">Kami mengumpulkan data sesuai kebutuhan operasional platform, termasuk:</p>

                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">1.1 Data Akun</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>ID pengguna</li>
                                        <li>Email</li>
                                        <li>Nama (opsional)</li>
                                        <li>Password (di-hash, tidak dapat dibaca)</li>
                                        <li>Google ID (jika login menggunakan Google OAuth)</li>
                                        <li>Auth Provider (EMAIL atau GOOGLE)</li>
                                        <li>Role pengguna (USER atau ADMIN)</li>
                                        <li>Timestamp pembuatan & pembaruan data</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">1.2 Data Profil Alumni</h3>
                                    <p className="mb-2 text-gray-700">Data ini digunakan untuk direktori alumni dan statistik agregat:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Full name</li>
                                        <li>Department (TEP, TPN, TIN)</li>
                                        <li>Tahun angkatan</li>
                                        <li>Kota domisili</li>
                                        <li>Industry field</li>
                                        <li>Employment level</li>
                                        <li>Income range (opsional & tidak ditampilkan secara publik per individu)</li>
                                        <li>Jabatan pekerjaan</li>
                                        <li>Nama perusahaan</li>
                                        <li>LinkedIn URL</li>
                                        <li>Timestamp pembuatan & pembaruan data</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">1.3 Konten yang Dibuat Pengguna</h3>
                                    <div className="ml-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Job Posting</h4>
                                        <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                            <li>Judul pekerjaan</li>
                                            <li>Deskripsi</li>
                                            <li>Nama perusahaan</li>
                                            <li>Lokasi</li>
                                            <li>Tipe kerja (remote / hybrid / onsite)</li>
                                            <li>Rentang gaji</li>
                                            <li>URL eksternal</li>
                                            <li>Status aktif/nonaktif</li>
                                        </ul>
                                    </div>

                                    <div className="mt-3 ml-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Business Directory</h4>
                                        <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                            <li>Nama bisnis</li>
                                            <li>Deskripsi</li>
                                            <li>Kategori</li>
                                            <li>Lokasi</li>
                                            <li>Website</li>
                                            <li>Kontak</li>
                                            <li>Status aktif/nonaktif</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">1.4 Log Sistem</h3>
                                    <p className="mb-2 text-gray-700">Kami dapat menyimpan:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Aktivitas login</li>
                                        <li>Perubahan data tertentu</li>
                                        <li>Error logs</li>
                                    </ul>
                                    <p className="text-sm text-gray-700 italic">Tidak termasuk data sensitif seperti password atau token OAuth.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">2. Bagaimana Kami Menggunakan Data Anda</h2>
                            <p className="mb-4 text-gray-700">Data digunakan untuk:</p>

                            <div className="ml-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">2.1 Pengoperasian Platform</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Autentikasi dan verifikasi pengguna</li>
                                        <li>Menampilkan profil alumni</li>
                                        <li>Menyediakan fitur job posting dan business directory</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900">2.2 Pengembangan & Peningkatan Layanan</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Analisis agregat untuk statistik alumni</li>
                                        <li>Evaluasi performa fitur</li>
                                        <li>Deteksi penyalahgunaan atau aktivitas mencurigakan</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900">2.3 Komunikasi</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Notifikasi penting terkait akun</li>
                                        <li>Pengumuman fitur baru (opsional)</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4 font-medium text-gray-700">Kami tidak menggunakan data Anda untuk menjual kepada pihak ketiga.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">3. Dasar Pemrosesan Data</h2>
                            <p className="mb-4 text-gray-700">Kami memproses data berdasarkan:</p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Persetujuan Anda saat membuat akun dan mengisi profil</li>
                                <li>Kepentingan sah untuk peningkatan layanan</li>
                                <li>Kewajiban hukum, bila diperlukan</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">4. Bagaimana Data Ditampilkan dan Dibagikan</h2>
                            <div className="ml-4 space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">4.1 Ditampilkan kepada Pengguna Lain</h3>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Profil alumni dapat ditampilkan dalam direktori sesuai pengaturan platform</li>
                                        <li>Job posting dan business listing bersifat publik dalam konteks komunitas alumni</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">4.2 Dibagikan kepada Pihak Ketiga</h3>
                                    <p className="mb-2 text-gray-700">Kami dapat menggunakan layanan pihak ketiga seperti:</p>
                                    <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                        <li>Google OAuth</li>
                                        <li>Provider cloud hosting</li>
                                        <li>Analytics tool (jika digunakan)</li>
                                    </ul>
                                    <p className="mb-2 text-gray-700">Seluruh pihak ketiga wajib mematuhi standar keamanan data yang setara.</p>
                                    <p className="font-medium text-gray-700">Kami tidak menjual data pribadi Anda.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">5. Keamanan Data</h2>
                            <p className="mb-4 text-gray-700">Kami menerapkan langkah keamanan teknis seperti:</p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Hashing password (tidak dapat didekripsi)</li>
                                <li>Pembatasan akses berbasis role (User/Admin)</li>
                                <li>Enkripsi (jika tersedia di layer infrastruktur)</li>
                                <li>Audit log internal</li>
                            </ul>
                            <p className="text-gray-700 italic">Walaupun kami berusaha maksimal, tidak ada sistem yang 100% aman.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">6. Hak Anda sebagai Pengguna</h2>
                            <p className="mb-4 text-gray-700">Anda memiliki hak untuk:</p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Mengakses data Anda</li>
                                <li>Memperbarui atau memperbaiki data</li>
                                <li>Meminta penghapusan akun</li>
                                <li>Menonaktifkan job posting atau business listing</li>
                                <li>Menarik persetujuan tertentu</li>
                            </ul>
                            <p className="text-gray-700">Permintaan dapat diajukan melalui admin platform.</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">7. Retensi Data</h2>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Data akun dan profil disimpan selama akun aktif</li>
                                <li>Data dapat dihapus ketika pengguna meminta</li>
                                <li>Log tertentu dapat disimpan lebih lama untuk tujuan keamanan</li>
                                <li>Akun yang dihapus dapat memiliki status soft delete (deletedAt) sebelum dihapus permanen</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">8. Cookie & Tracking</h2>
                            <p className="mb-2 text-gray-700">Jika platform menggunakan cookie/session:</p>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Cookie digunakan untuk autentikasi & menjaga session login</li>
                                <li>Tidak ada tracking untuk iklan</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">9. Perubahan Kebijakan</h2>
                            <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700">
                                <li>Kami dapat memperbarui kebijakan ini sewaktu-waktu</li>
                                <li>Perubahan signifikan akan diinformasikan melalui email atau notifikasi dalam dashboard</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">10. Kontak</h2>
                            <p className="text-gray-700">Jika memiliki pertanyaan tentang Kebijakan Privasi, hubungi: [email admin alumni club]</p>
                        </section>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 border-t pt-6">
                        <Link href="/register" className="text-primary hover:text-primary/80 inline-flex items-center font-medium">
                            ← Kembali ke halaman Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
