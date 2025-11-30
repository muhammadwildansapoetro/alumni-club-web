import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import NextProgressProviders from "@/providers/nprogress";
import { SheetProvider } from "@/providers/sheet-provider";
import { ModalProvider } from "@/providers/modal-provider";

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
    title: "FTIP Unpad Alumni Club",
    description: "Platform resmi untuk terhubung, berkolaborasi, dan mengakses informasi alumni FTIP Unpad.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
                <NextProgressProviders>
                    {children}
                    <SheetProvider />
                    <ModalProvider />
                </NextProgressProviders>
            </body>
        </html>
    );
}
