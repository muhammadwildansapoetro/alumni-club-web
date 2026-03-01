import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { VERSION_TAG } from "@/config";

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

                <span className="fixed right-0 bottom-0 z-40 rounded-tl-md bg-white px-2 text-xs select-none">v{VERSION_TAG}</span>
            </body>
        </html>
    );
}
