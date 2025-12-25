import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { SearchParamsProvider } from "@/components/search-params-provider";

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
                <AuthProvider>
                    <SearchParamsProvider>
                        {children}
                    </SearchParamsProvider>
                </AuthProvider>

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
