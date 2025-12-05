"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

// Alumni stories data
const alumniStories = [
    {
        id: 1,
        name: "Dr. Ahmad Wijaya, S.TP., M.Si.",
        classYear: "2008",
        major: "Teknologi Pangan",
        position: "Direktur Riset",
        company: "PT. Food Innovasi Indonesia",
        location: "Jakarta",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial:
            "Studi di FTIP Unpad memberikan saya fondasi yang kuat dalam industri pangan. Jaringan alumni sangat membantu karir saya berkembang hingga saat ini.",
        achievement: "Pemenang Inovasi Pangan Nasional 2022",
    },
    {
        id: 2,
        name: "Sarah Puspitasari, S.TP., M.Eng.",
        classYear: "2012",
        major: "Teknik Pertanian",
        position: "Founder & CEO",
        company: "AgriTech Solutions",
        location: "Bandung",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial: "Ilmu pertanian modern yang saya dapatkan di FTIP menjadi modal utama dalam membangun startup di sektor agroteknologi.",
        achievement: "Top 50 Women in Tech Asia 2023",
    },
    {
        id: 3,
        name: "Ir. Budi Santoso, M.T.",
        classYear: "2005",
        major: "Teknologi Industri Pertanian",
        position: "VP Operations",
        company: "PT. Charoen Pokphand Indonesia",
        location: "Surabaya",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial:
            "Kurikulum FTIP yang relevan dengan industri membantu saya beradaptasi dengan cepat di dunia kerja dan mencapai posisi saat ini.",
        achievement: "Best Operational Manager 2021",
    },
    {
        id: 4,
        name: "Maya Putri, S.T.P., MBA",
        classYear: "2015",
        major: "Teknologi Pangan",
        position: "Product Development Manager",
        company: "Unilever Indonesia",
        location: "Jakarta",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial:
            "Alumni FTIP memiliki reputasi yang baik di industri. Komunitas yang solid dan mendukung menjadi nilai tambah dalam karir profesional.",
        achievement: "Young Leader Award 2022",
    },
    {
        id: 5,
        name: "Ir. Hendra Kusuma, S.T., M.Sc.",
        classYear: "2010",
        major: "Teknik Pertanian",
        position: "Head of Sustainability",
        company: "Sinar Mas Agro Resources",
        location: "Jakarta",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial: "FTIP mengajarkan pentingnya pertanian berkelanjutan. Ini menjadi fondasi dalam peran saya memimpin program sustainability.",
        achievement: "Sustainability Champion 2023",
    },
    {
        id: 6,
        name: "Rina Wijayanti, S.T.P.",
        classYear: "2018",
        major: "Teknologi Industri Pertanian",
        position: "Quality Assurance Manager",
        company: "PT. Indofood CBP Sukses Makmur",
        location: "Bekasi",
        image: "/api/placeholder/80/80",
        rating: 5,
        testimonial: "Pembelajaran praktis dan link & match dengan industri membuat saya siap kerja setelah lulus. FTIP adalah pilihan tepat!",
        achievement: "Best QA Manager 2023",
    },
];

export default function AlumniStory() {
    return (
        <section id="alumni-story" className="bg-primary/10 py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl">
                    {/* Section Header */}
                    <div className="text-primary space-y-3 pb-10 text-center">
                        <h2 className="text-3xl font-bold md:text-4xl">Cerita Alumni</h2>
                        <p className="mx-auto max-w-2xl text-lg font-medium">
                            Inspirasi dari alumni FTIP yang telah sukses berkarir di berbagai bidang
                        </p>
                    </div>

                    {/* Alumni Stories Grid */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {alumniStories.map((story) => (
                            <Card key={story.id} className="group transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-1">
                                            <h3 className="group-hover:text-primary font-semibold text-gray-900 transition-colors">{story.name}</h3>
                                            <p className="text-sm">
                                                {story.major} - {story.classYear}
                                            </p>
                                            <p className="text-sm">{story.position}</p>
                                            <p className="text-primary text-sm font-medium">{story.company}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex h-full flex-col justify-between gap-3">
                                    {/* Testimonial */}
                                    <blockquote className="relative">
                                        <Quote className="text-primary/50 absolute -top-2 -left-2 h-8 w-8" />
                                        <p className="pl-6 text-sm font-medium italic">&quot;{story.testimonial}&quot;</p>
                                    </blockquote>

                                    {/* Achievement Badge */}
                                    <Badge variant="default" className="text-primary border-green-200 bg-green-100 text-xs hover:bg-green-100">
                                        {story.achievement}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
