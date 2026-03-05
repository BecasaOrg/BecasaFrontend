import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TemaProvider } from "@/context/TemaContext";
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
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </TemaProvider>
      </body>
    </html>
  );
}
