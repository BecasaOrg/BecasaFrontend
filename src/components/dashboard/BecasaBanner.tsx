import Image from 'next/image';

const BecasaBanner = () => {
    return (
        <div className="flex gap-4 mb-6">
            {/* Main Banner */}
            <div className="flex-[2] bg-white rounded-[32px] overflow-hidden flex items-center relative h-40 border border-gray-100 shadow-sm">
                <div className="flex-1 flex flex-col justify-center px-10 z-10">
                    <h3 className="text-3xl font-black text-[#1a1c2c] leading-tight">
                        Ellos no llegaron<br />
                        aquí por <span className="underline decoration-[#AAFF00] decoration-4">suerte.</span>
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide">
                        Inicia tu proceso ahora hacia una <span className="text-[#1a1c2c]">beca a EE.UU.</span>
                    </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600&auto=format&fit=crop" 
                        alt="Athletes highlighting successful process" 
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Side Call to Action */}
            <div className="flex-1 bg-[#1a1c2c] rounded-[32px] overflow-hidden flex flex-col justify-center items-center text-center p-6 border border-white/10 shadow-lg relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AAFF00]/10 rounded-full blur-3xl" />
                <h4 className="text-[#AAFF00] text-xl font-black italic tracking-tighter mb-1">
                    ¡MIRA LOS EVENTOS!
                </h4>
                <p className="text-white text-[8px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">
                    y regístrate en tu favorito
                </p>
                <div className="bg-white/10 w-full h-[1px] mb-4" />
                <p className="text-white text-[8px] font-medium leading-relaxed mb-4">
                    POR SEGUNDA VEZ VUELVE A BOGOTÁ
                </p>
                <p className="text-[#AAFF00] text-lg font-black tracking-tighter">
                    BECASA CAMP 2026
                </p>
            </div>
        </div>
    );
};

export default BecasaBanner;
