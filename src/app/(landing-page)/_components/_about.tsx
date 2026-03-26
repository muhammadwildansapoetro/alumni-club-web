"use client";

import { FileText, Info, Landmark, ScrollText } from "lucide-react";

const founders = [
    "Aos Firdausil Malisi",
    "Dwi Purnomo",
    "Widiana Safaat",
    "Irvan Suhendra",
    "Endah Wulandari",
    "Siti Nur Maftuhah",
    "Ferry Sofwan Arif",
    "Edy Suryadi",
    "Achmad Rivani",
    "Dicky Adi Prihadi",
];

export default function About() {
    return (
        <section id="about" className="from-primary-600 to-primary-800 relative overflow-hidden bg-linear-to-br py-24 text-white">
            {/* Ornament blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                <div className="bg-primary-400/20 absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-2xl" />
                {/* Grid dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
                        <Info className="h-3.5 w-3.5" /> Tentang Kami
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Sejarah & <span className="text-primary-200">Legalitas</span>
                    </h2>
                    <p className="text-lg text-white/80">
                        IKA FTIP Unpad berdiri secara resmi dan berbadan hukum sejak 2017, <br />
                        berdasarkan Anggaran Dasar yang disahkan oleh negara.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Akta Notaris */}
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                        <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 text-white">
                            <ScrollText className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 font-bold text-white">Akta Pendirian</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white/70">
                                Notaris: <span className="font-medium text-white">Irwanto Karseno, S.H.</span>
                            </li>
                            <li className="text-white/70">
                                Nomor Akta: <span className="font-medium text-white">01</span>
                            </li>
                            <li className="text-white/70">
                                Tanggal: <span className="font-medium text-white">7 Maret 2017</span>
                            </li>
                            <li className="pt-1 text-white/70">
                                Saksi: <span className="font-medium text-white">{founders.join(", ")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* SK Kemenkumham */}
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                        <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 text-white">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="mb-3 font-bold text-white">SK Kemenkumham</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white/70">
                                Nomor: <span className="font-medium text-white">AHU-0005459.AH.01.07.TAHUN 2017</span>
                            </li>
                            <li className="text-white/70">
                                Tanggal: <span className="font-medium text-white">29 Maret 2017</span>
                            </li>
                        </ul>
                    </div>

                    {/* Azas & Tujuan */}
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                        <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 text-white">
                            <Landmark className="h-6 w-6" />
                        </div>
                        <h3 className="mb-1 font-bold text-white">Azas & Tujuan</h3>
                        <p className="mb-3 text-xs text-white/60">Berdasarkan Anggaran Dasar Pasal 2 & 3</p>
                        <ul className="list-disc space-y-2 pl-3 text-sm font-medium">
                            <li>Berazaskan Pancasila & UUD 1945</li>
                            <li>Menghimpun alumni FTIP Unpad</li>
                            <li>Membantu pemerintah mencerdaskan bangsa</li>
                            <li>Membangun perekonomian di bidang teknologi industri pertanian</li>
                        </ul>
                    </div>
                </div>

                {/* Kegiatan Organisasi */}
                <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                    <h3 className="mb-1 text-center text-xl font-bold text-white">Kegiatan Organisasi</h3>
                    <p className="mb-6 text-center text-sm text-white/60">Berdasarkan Anggaran Dasar Pasal 4</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            "Menyelenggarakan lembaga pendidikan",
                            "Menjalankan penelitian pertanian",
                            "Mengelola usaha peternakan & pertanian",
                            "Mengembangkan budidaya tanaman",
                            "Memasarkan hasil produksi",
                            "Menyediakan jasa konsultasi & kemitraan",
                        ].map((kegiatan) => (
                            <div key={kegiatan} className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white">
                                <span className="bg-primary-200 h-2 w-2 shrink-0 rounded-full" />
                                {kegiatan}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
