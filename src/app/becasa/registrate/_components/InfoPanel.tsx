import Image from "next/image";

const atletas = [
  "/img/atletas/atleta-1.png",
  "/img/atletas/atleta-2.png",
  "/img/atletas/atleta-3.png",
];

export default function InfoPanel() {
  return (
    <div className="relative flex flex-col items-center justify-start px-10 pt-20 pb-12 text-center overflow-hidden">
      <p className="text-white/60 text-sm leading-relaxed mb-8 relative z-1 max-w-xs">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laore et dolore magna aliquam erat
        volutpat.
      </p>

      <div className="flex -space-x-4 mb-6 relative z-1">
        {atletas.map((src, i) => (
          <div
            key={i}
            className="w-20 h-20 rounded-full border-2 border-[#060f18] overflow-hidden bg-[#1a2e10] relative"
            style={{ zIndex: 3 - i }}
          >
            <Image src={src} alt={`Atleta ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <h3 className="text-white font-bold text-2xl leading-tight mb-8 relative z-1">
        Una comunidad de mas de<br />
        <span className="text-[#AAFF00]">300 atletas</span> de todo el mundo
      </h3>

      <div className="relative z-1 opacity-80">
        <Image
          src="/img/header/ASA-logo-6.png"
          alt="Becasa Camp"
          width={90}
          height={80}
          style={{ width: "90px", height: "auto" }}
        />
      </div>
    </div>
  );
}
