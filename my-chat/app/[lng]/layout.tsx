import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "../context/ToasterContext";
import AuthContext from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
