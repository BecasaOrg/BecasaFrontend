"use client";

import Image from "next/image";

export default function BecasaCampBanner() {
  return (
    <div className=" bg-[#1a1a1a] relative overflow-hidden flex items-center min-h-[130px] mx-4 rounded-2xl mt-5 mb-5">

      <Image
        src="/img/becasa/BANNER.jpg"
        alt="bannerBecasa"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}