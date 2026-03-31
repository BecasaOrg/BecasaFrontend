import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/FooterAtletic";
import { TemaProvider } from "@/context/TemaContext";
import MainWrapper from "./MainWrapper";
import HeaderGlobal from "@/components/HeaderGlobal";
import FooterGlobal from "@/components/FooterGlobal";
export const metadata: Metadata = {
  title: "Athletic Scholarship Agency",
  description: "Desbloqueando tu potencial como atleta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <TemaProvider>
          <HeaderGlobal />

          <MainWrapper>{children}</MainWrapper> 

          <FooterGlobal />
        </TemaProvider>
      </body>
    </html>
  );
}
