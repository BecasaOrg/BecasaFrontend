"use client";

import { useTema } from "@/context/TemaContext";
import VideoAthletic from "../VideoAthletic";

export default function QueHaceDiferente() {
    const {oscuro} = useTema();

    return (
        <section className={`w-full py-12 px-6 ${oscuro ? " text-white bg-black" : "text-black bg-white"} `}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-3xl p-4  ${oscuro ? "border-white/60" : "border-black/60"} `}>

                {/* ── Columna izquierda: texto ── */}
                <div>
                    <h2
                        className="uppercase text-xl md:text-2xl tracking-wide mb-2"
                        style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
                    >
                        ¿Que hace diferente al Becasa Camp?:
                    </h2>

                    <h3 className="font-bold text-lg md:text-xl mb-4">
                        Lorem ipsum dolor sit amet, consectetue.
                    </h3>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                        iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
                        nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                        zzril delenit augue duis dolore te feugait nulla facilisi.
                    </p>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </p>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum.
                    </p>
                </div>

                {/* ── Columna derecha: video ── */}
                <VideoAthletic />

            </div>
        </section>
    );
}