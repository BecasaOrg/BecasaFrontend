"use client";
import Image from "next/image";
import Link from "next/link";

export default function BecasaCampBanner() {
  return (
    <div className="mx-4 mt-5 mb-5 rounded-2xl overflow-hidden">
      <Link href="/becasa">
      <Image
        src="/img/becasa/BANNER.jpg"
        alt="Becasa Camp 2026"
        width={1920}
        height={270}
        sizes="100vw"
        className="w-full h-auto hidden sm:block"
        priority
      />

       {/* Mobile — oculto en desktop */}

      <Image
        src="/img/becasa/BANNER-mobile2.jpg"
        alt="Becasa Camp 2026"
        width={800}
        height={800}
        sizes="100vw"
        className="w-full h-auto block sm:hidden"
        priority
      />
      </Link>
    </div>
  );
}