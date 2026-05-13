"use client";

import { SLIDES_DATA } from "@/data/experienciaBecasa";
import Image from "next/image";
import { useState } from "react";

const TABS: { id: keyof typeof SLIDES_DATA; label: string }[] = [
    { id: "rendimiento", label: "Rendimiento" },
    { id: "aula", label: "Aula Becasa" },
    { id: "autoconocimiento", label: "Autoconocimiento" },
    { id: "showcase", label: "Showcase" },
    { id: "comunidad", label: "Comunidad" },
];

export default function ExperienciaCamp() {
    const [activeTab, setActiveTab] = useState<keyof typeof SLIDES_DATA>("rendimiento");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const tabData = SLIDES_DATA[activeTab];
    const slides = tabData.slides;
    const total = slides.length;

    const visibleCount = 4;
    const visibleSlides = [];
    for (let i = 0; i < visibleCount; i++) {
        visibleSlides.push(slides[(currentSlide + i) % total]);
    }

    const goToSlide = (direction: "next" | "prev") => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) =>
            direction === "next"
                ? (prev + 1) % total
                : (prev - 1 + total) % total
        );
        setTimeout(() => setIsTransitioning(false), 400);
    };

    const handleTabChange = (tabId: keyof typeof SLIDES_DATA) => {
        setActiveTab(tabId);
        setCurrentSlide(0);
    };

    const slideClasses = [
        // Posición 0 la más grande
        "flex-none w-[220px] h-[450px] md:w-[330px] md:h-[440px] rounded-2xl overflow-hidden relative transition-all duration-400 ease-out bg-[grey]/70 ",
        // Posición 1 mas pequeña
        "flex-none w-[120px] h-[370px] md:w-[250px] rounded-[14px] overflow-hidden relative transition-all duration-400 ease-out bg-[grey]/70 ",
        //Posición 2 igual de pequena que la 1
        "flex-none w-[120px] h-[370px] md:w-[250px] rounded-[14px] overflow-hidden relative transition-all duration-400 ease-out bg-[grey]/70 ",
        //Posición 3 igual de pequena que la 1
        "flex-none w-[120px] h-[370px] md:w-[250px] rounded-[14px] overflow-hidden relative transition-all duration-400 ease-out bg-[grey]/70 ",
    ];

    return (
        <section className="pt-16 pb-20 max-w-[1280px] mx-auto font-serif" >

            <div className="text-center mb-10 px-2">
                <hr />
                <h2 className="font-black tracking-[3px] mb-4 uppercase mt-5"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                >
                    EXPERIENCIA BECASA CAMP
                </h2>
                <p className="text-sm max-w-[680px] mx-auto leading-[-2.7]"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
                >
                    BECASA CAMP es una experiencia integral donde el entrenamiento, la educación y la orientación se conectan para ayudarte a entender tu camino como estudiante-atleta. Está diseñado para que no solo vivas el proceso, sino que tengas más claridad de tan lejos quieres llegar.
                </p>
            </div>

            {/* menú para el el cambio de info del carrusel  */}
            <div className="flex justify-center mb-5 [@media(min-width:480px)]:mb-12">
                <nav className="flex border rounded-full py-0.5 min:w-[97%] overflow-y-scroll " style={{ scrollbarWidth: "none" }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`relative flex-1 sm:flex-0 px-3 py-0.5 text-[10px] sm:text-[13px] tracking-[0.5px] cursor-pointer border-none transition-colors duration-200 whitespace-nowrap
                                ${activeTab === tab.id
                                    ? "text-[#111] font-bold bg-[#AAFF00] rounded-full "
                                    : "font-medium"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex flex-col [@media(min-width:480px)]:flex-row [@media(min-width:480px)]:gap-7 md:gap-12 md:mt-27 [@media(min-width:480px)]:items-start relative ">

                <div className="flex-none [@media(min-width:480px)]:w-[120px] md:min-w-[180px] pt-2 [@media(min-width:480px)]:pl-3 md:pl-6 [@media(min-width:480px)]:mt-6 md:mt-0 [@media(min-width:480px)]:block text-center [@media(min-width:480px)]:text-start flex flex-col items-center">
                    <h3 className="text-[20px] sm:text-[22px] mb-4 leading-tight" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 500 }}>
                        {tabData.title}
                    </h3>
                    <p className="text-[12px] leading-[1.8] m-0 text-justify w-[90%] [@media(min-width:480px)]:w-auto ">
                        {tabData.description}
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-4 min-w-0 relative">

                    {/* Controles arriba a la derecha */}
                    <div className="flex justify-end items-end gap-2 md:gap-5 absolute right-0 md:-top-20  ">

                        {/* Flechas */}
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <button
                                onClick={() => goToSlide("prev")}
                                aria-label="Anterior"
                                className="w-5 h-5 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center text-[#333] transition-all duration-200 hover:border-[#999] hover:bg-gray-50 p-0 red"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => goToSlide("next")}
                                aria-label="Siguiente"
                                className="w-5 h-5 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center text-[#333] transition-all duration-200 hover:border-[#999] hover:bg-gray-50 p-0"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {/* Contador */}
                        <div className="flex flex-col items-end leading-none">
                            <div className="flex items-center gap-0.5">
                                <span
                                    className="text-sm font-semibold text-[#aaa] tracking-wide"
                                    style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                                >
                                    {String(total).padStart(2, "0")}
                                </span>
                                <span className="text-sm font-semibold text-[#aaa]">/</span>
                            </div>
                            <span
                                className="text-[42px] md:text-[62px] font-black leading-none"
                                style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                            >
                                {String(currentSlide + 1).padStart(2, "0")}
                            </span>
                        </div>

                    </div>

                    {/* Track del carrusel */}
                    <div className="flex items-end gap-3 overflow-hidden mt-2 md:mt-0 pl-6 [@media(min-width:480px)]:pl-6 duration-700 ">
                        {visibleSlides.map((slide, i) => (
                            <div
                                key={`${slide.id}`}
                                className={slideClasses[i]}
                            >
                                {/* Badge del año */}
                                <div
                                    className={`absolute top-3 left-3 z-10 text-[11px] font-bold tracking-[1.5px] px-[10px] py-1 rounded-full backdrop-blur-sm
                                        ${i === 0
                                            ? "bg-[#111] text-[#e8c547]"
                                            : "bg-black/60 text-white"
                                        }`}
                                >
                                    {slide.year}
                                </div>

                                {/* Imagen */}
                                <Image
                                    src={slide.image}
                                    alt={slide.caption}
                                    fill
                                    className="object-cover"
                                />

                                {/* Caption overlay solo en la slide principal */}
                                {i === 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent pt-10 px-4 pb-4 z-10">
                                        <p className="text-white p-3 rounded-md backdrop-blur-sm  bg-[#00000042] text-xs m-0 leading-[1.4]">
                                            {slide.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="mt-7" />
        </section>
    );
}
