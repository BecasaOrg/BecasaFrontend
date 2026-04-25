import Image from "next/image";
import { useState } from "react";

export default function VideoAthletic() {
    const [videoPlay, setVideoPlay] = useState(false);

    return (
        <div className="relative flex items-start justify-center w-full">

            {/* Tarjeta de video */}
            <div className="relative rounded-2xl overflow-hidden aspect-video w-full shadow-lg">

                {!videoPlay && (
                    <>
                        <Image
                            src="/img/becasa/VIDEO.jpg"
                            alt="Video Becasa Camp"
                            fill
                            className="object-cover"
                        />
                        {/* capa negra suave */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Botón play */}
                        <button
                            onClick={() => setVideoPlay(true)}
                            aria-label="Reproducir video"
                            className="absolute inset-0 flex items-center justify-center group"
                        >
                            <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all duration-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>
                    </>
                )}

                {/* Video */}
                {videoPlay && (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://youtube.com/embed/DCPyHNSZAKs?si=URL6c1mFtfwSA1xc"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    )
}