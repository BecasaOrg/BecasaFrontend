"use client";

import { SLIDES_DATA } from "@/data/experienciaBecasa";
import Image from "next/image";
import { useState } from "react";

const TABS = [
    { id: "rendimiento", label: "Rendimiento" },
    { id: "aula", label: "Aula Becasa" },
    { id: "autoconocimiento", label: "Autoconocimiento" },
    { id: "showcase", label: "Showcase" },
    { id: "comunidad", label: "Comunidad" },
];

export default function ExperienciaCamp() {
    const [activeTab, setActiveTab] = useState("rendimiento");
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

    const goToSlide = (direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) =>
            direction === "next"
                ? (prev + 1) % total
                : (prev - 1 + total) % total
        );
        setTimeout(() => setIsTransitioning(false), 400);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setCurrentSlide(0);
    };

    // Tamaño/alto por posición del carrusel
    const slideClasses = [
        // Posición 0 la más grande
        "flex-none w-[330px] h-[440px] rounded-2xl opacity-100 overflow-hidden relative transition-all duration-400 ease-out bg-[red] ",
        // Posición 1 mas pequeña
        "flex-none w-[250px] h-[370px] rounded-[14px] opacity-90 overflow-hidden relative transition-all duration-400 ease-out bg-[red] ",
        //Posición 2 igual de pequena que la 1
        "flex-none w-[220px] h-[340px] rounded-[14px] opacity-90 overflow-hidden relative transition-all duration-400 ease-out bg-[red] ",
        //Posición 3 igual de pequena que la 1
        "flex-none w-[220px] h-[310px] rounded-[14px] opacity-90 overflow-hidden relative transition-all duration-400 ease-out bg-[red] ",
    ];

    return (
        <section className="pt-16 pb-20 max-w-[1280px] mx-auto font-serif" >

            <div className="text-center mb-10 px-2">
                <hr />
                <h2 className="text-[40px] font-black tracking-[3px] mb-4 uppercase mt-5" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}>
                    EXPERIENCIA BECASA CAMP
                </h2>
                <p className="text-sm max-w-[680px] mx-auto leading-[-2.7]">
                    BECASA CAMP es una experiencia integral donde el entrenamiento, la educación y la orientación se conectan para ayudarte a entender tu camino como estudiante-atleta. Está diseñado para que no solo vivas el proceso, sino que tengas más claridad de tan lejos quieres llegar.
                </p>
            </div>

            {/* menú para el el cambio de info del carrusel  */}
            <div className="flex justify-center mb-12">
                <nav className="flex border rounded-full py-0.5 w-[90%] sm:w-auto overflow-y-scroll " style={{scrollbarWidth: "none"}}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`relative px-3 py-0.5 text-[13px] tracking-[0.5px] cursor-pointer border-none transition-colors duration-200 whitespace-nowrap
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

            <div className="flex gap-7 md:gap-12 items-start relative">

                <div className="flex-none w-[180px] pt-2 pl-3 md:pl-6 mt-25 md:mt-0 hidden sm:block ">
                    <h3 className="text-[22px] font-extrabold mb-4 leading-tight" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 500 }}>
                        {tabData.title}
                    </h3>
                    <p className="text-[12px] leading-[1.8] m-0">
                        {tabData.description}
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-4 min-w-0">

                    {/* Controles arriba a la derecha */}
                    <div className="flex justify-end items-end gap-5 absolute right-0 md:-top-20 -top-7 ">

                        {/* Flechas */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => goToSlide("prev")}
                                aria-label="Anterior"
                                className="w-5 h-5 rounded-full border border-[#ddd] bg-white cursor-pointer flex items-center justify-center text-[#333] transition-all duration-200 hover:border-[#999] hover:bg-gray-50 p-0"
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
                                className="text-[62px] font-black leading-none"
                                style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                            >
                                {String(currentSlide + 1).padStart(2, "0")}
                            </span>
                        </div>

                    </div>

                    {/* Track del carrusel */}
                    <div className="flex items-end gap-3 overflow-hidden mt-25 md:mt-0 pl-6 sm:pl-0 ">
                        {visibleSlides.map((slide, i) => (
                            <div
                                key={`${slide.id}-${i}`}
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
                                        <p className="text-white text-xs m-0 leading-[1.4]">
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
