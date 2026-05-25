export default function LoadingBecasaCard() {

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-3 md:px-10 lg:px-15 ">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-300 flex items-center gap-3 rounded-l-[100px] rounded-r-4xl px-2 py-2 flex-1 ">
                    <div className="w-15 h-15 rounded-full bg-gray-400 animate-pulse " />
                    <div className="w-full">
                        <div className=" w-[90%] h-7 rounded-2xl bg-gray-400 animate-pulse " />
                        <div className="w-[50%] h-2 rounded-2xl bg-gray-400 mt-1 animate-pulse " />
                        <div className="flex gap-3 mt-2">
                            <div className="w-[29%] sm:w-[17%] lg:w-[25%]  h-5 rounded-2xl bg-gray-400 animate-pulse " />
                            <div className="w-[29%] sm:w-[17%] lg:w-[25%] h-5 rounded-2xl bg-gray-400 animate-pulse " />
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-400 self-start animate-pulse " />
                </div>
            ))}
        </section>
    )
}