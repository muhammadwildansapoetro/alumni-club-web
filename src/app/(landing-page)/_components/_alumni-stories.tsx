"use client";

import { Quote } from "lucide-react";

const stories = [
    {
        name: "Nama Alumni 1",
        major: "Teknologi Pangan · 2010",
        story: "Bergabung dengan IKA FTIP Unpad membuka pintu jejaring yang luar biasa. Saya bertemu mitra bisnis agribisnis saya justru lewat direktori alumni di dasbor ini.",
        initial: "RF",
    },
    {
        name: "Nama Alumni 2",
        major: "Teknik Pertanian · 2013",
        story: "Setelah lulus, saya sempat kesulitan mencari pekerjaan di bidang pertanian. Lowongan kerja di dasbor IKA FTIP Unpad mempertemukan saya dengan perusahaan tempat saya bekerja sekarang.",
        initial: "DP",
    },
    {
        name: "Nama Alumn 3",
        major: "Teknologi Industri Pertanian · 2015",
        story: "Dasbor ini bukan sekadar direktori — ini rumah bagi kami para alumni. Kartu anggota digital saya selalu saya tunjukkan dengan bangga di setiap acara profesional.",
        initial: "BN",
    },
];

export default function AlumniStories() {
    return (
        <section id="stories" className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="bg-primary-50 text-primary-600 mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-sm font-semibold">
                        <Quote className="h-3.5 w-3.5" /> Cerita Alumni
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Dampak Nyata, <span className="text-primary-gradient">Cerita Nyata</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Alumni FTIP Unpad berbagi pengalaman menggunakan dasbor — <br />
                        dari membangun jejaring hingga menemukan peluang karir.
                    </p>
                </div>

                {/* Story Cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {stories.map((alumni) => (
                        <div
                            key={alumni.name}
                            className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Accent bar */}
                            <div className="bg-primary-gradient absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Quote icon */}
                            <div className="bg-primary-50 text-primary-400 mb-6 inline-flex w-fit rounded-xl p-3">
                                <Quote className="h-5 w-5" />
                            </div>

                            {/* Story */}
                            <p className="mb-8 flex-1 leading-relaxed text-gray-600 italic">&ldquo;{alumni.story}&rdquo;</p>

                            {/* Alumni Info */}
                            <div className="flex items-center gap-3">
                                <div className="bg-primary-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                                    {alumni.initial}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{alumni.name}</p>
                                    <p className="text-primary-600 text-sm">{alumni.major}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
