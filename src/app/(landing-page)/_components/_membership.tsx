"use client";

import { CheckCircle2, GraduationCap, Users, XCircle } from "lucide-react";

const syarat = [
    "Pernah kuliah di Fakultas Teknologi Pertanian Universitas Padjadjaran",
    "Sanggup aktif dalam kegiatan perkumpulan",
    "Menerima Anggaran Dasar dan Anggaran Rumah Tangga",
];

const berakhir = ["Meninggal dunia", "Permintaan sendiri", "Pindah keanggotaan", "Diberhentikan sementara", "Diberhentikan tetap"];

export default function Membership() {
    return (
        <section id="membership" className="bg-white py-24">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="bg-primary-50 text-primary-600 mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-sm font-semibold">
                        <Users className="h-3.5 w-3.5" /> Keanggotaan
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Keanggotaan <span className="text-primary-gradient">IKA FTIP Unpad</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Berdasarkan Pasal 7 Anggaran Dasar IKA FTIP Unpad, berikut ketentuan keanggotaan perkumpulan.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Persyaratan */}
                    <div className="border-primary-200 bg-primary-50/40 rounded-2xl border p-8">
                        <div className="bg-primary-100 text-primary-600 mb-4 inline-flex rounded-xl p-3">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900">Persyaratan Anggota</h3>
                        <ul className="space-y-2">
                            {syarat.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-gray-900">
                                    <CheckCircle2 className="text-primary-500 mt-0.5 h-5 w-5 shrink-0" />
                                    <span className="text-sm leading-relaxed font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Berakhirnya Keanggotaan */}
                    <div className="rounded-2xl border border-red-100 bg-red-50/40 p-8">
                        <div className="mb-4 inline-flex rounded-xl bg-red-100 p-3 text-red-500">
                            <XCircle className="h-7 w-7" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900">Berakhirnya Keanggotaan</h3>
                        <ul className="space-y-2">
                            {berakhir.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-gray-900">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                                    <span className="text-sm leading-relaxed font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
