import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "IKA FTIP Unpad",
    description:
        "Dasbor IKA FTIP Unpad — situs web alumni resmi FTIP Universitas Padjadjaran. Kelola profil, telusuri direktori alumni, lacak statistik angkatan, serta temukan peluang karier dan bisnis sesama alumni.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
                <Providers>{children}</Providers>

                <Toaster
                    position="bottom-right"
                    expand={false}
                    richColors
                    closeButton
                    toastOptions={{
                        style: {
                            borderRadius: "10px",
                            padding: "12px 16px",
                            fontSize: "14px",
                        },
                    }}
                />
            </body>
        </html>
    );
}
