import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "トリモブフェスタ「トリモブのハロウィンナイト」事業計画書",
  description: "株式会社琴線主催・トリモブのハロウィンナイト事業計画書",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0d0d1a] text-gray-100">
        {children}
      </body>
    </html>
  );
}
