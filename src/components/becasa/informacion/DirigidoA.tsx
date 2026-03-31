"use client"

import Image from "next/image";
import { useTema } from "@/context/TemaContext";

export default function DirigidoA() {

    const { oscuro } = useTema();

    return (
        <section className={`w-full py-14 px-6 md:px-12 ${oscuro ? "bg-black text-white " : "bg-white text-black shadow-2xl"}` }>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* ── Columna izquierda: texto ── */}
                <div>
                    <h2
                        className="uppercase text-3xl md:text-4xl tracking-widest mb-8"
                        style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
                    >
                        Dirigido A:
                    </h2>

                    <h3 className="font-bold text-xl mb-3">
                        Lorem ipsum dolor sit amet, consectetuer
                    </h3>

                    <p className="text-sm leading-relaxed mb-5">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                        quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                        consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
                        odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.
                    </p>

                    <p className="text-sm leading-relaxed mb-5">
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                        quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat.
                    </p>

                    <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                        quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                        consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
                        odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.
                    </p>
                </div>

                {/* ── Columna derecha: galeria ── */}
                <div className="flex flex-col gap-3">

                    {/* magen grande */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                            src="/img/becasa/fotos1.jpg"
                            alt="Atleta principal"
                            fill
                            className="object-cover"
                        />

                        {/*año en la imagen */}
                        <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                            2025
                        </div>
                    </div>

                    {/* Dos imágenes pequeñas */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/img/becasa/fotos2.jpg"
                                alt="Atleta 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/img/becasa/fotos3.jpg"
                                alt="Atleta 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
