import type { Metadata } from "next";
import "./globals.css";
import LocalFont from 'next/font/local'
import Footer from "@/components/FooterAtletic";
import { TemaProvider } from "@/context/TemaContext";
import MainWrapper from "./MainWrapper";
import HeaderGlobal from "@/components/HeaderGlobal";
import FooterGlobal from "@/components/FooterGlobal";
import { ProfileProvider } from "@/context/ProfileContext";

export const metadata: Metadata = {
  title: "Athletic Scholarship Agency",
  description: "Desbloqueando tu potencial como atleta",
};

/*const barlow = LocalFont({
  src:'../public/fonts/AcuminVariableConcept.otf',
  variable: '--font-barlow',
  display: "swap",
})*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" >
      <body className="flex flex-col min-h-screen">
        <TemaProvider>
          <ProfileProvider>
            <HeaderGlobal />

            <MainWrapper>{children}</MainWrapper>
            
            <FooterGlobal />
          </ProfileProvider>
        </TemaProvider>
      </body>
    </html>
  );
}
