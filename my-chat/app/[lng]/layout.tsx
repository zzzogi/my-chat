import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "../context/ToasterContext";
import AuthContext from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Analytics } from "@vercel/analytics/react";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  title: "My Chat",
  description: "My Chat",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContext>
            <ToasterContext />
            {children}
            <Analytics />
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
