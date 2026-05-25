export default function LoadingInformacion() {

    return (
        <section className="">
            <div className="w-full h-[90vh] bg-gray-300 flex flex-col justify-center items-center space-y-3 ">
                <div className="w-[90%] h-20 rounded-2xl bg-gray-400 animate-pulse " />

                <div className="w-[70%] h-2 rounded-2xl bg-gray-400 animate-pulse" />
                <div className="w-[50%] h-2 rounded-2xl bg-gray-400 animate-pulse " />

                <div className="flex gap-3 mt-10 ">
                    <div className="w-[20vw] h-12 rounded-2xl bg-gray-400 animate-pulse" />
                    <div className="w-[20vw] h-12 rounded-2xl bg-gray-400 animate-pulse" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-4 bg-gray-200 ">
                <div className="md:w-[30vw] w-[95%] py-4 px-2 rounded-2xl bg-gray-300 animate-pulse flex flex-col items-center justify-start " >
                    <div className="w-[6vw] h-4 bg-gray-400 rounded-2xl self-start mt-5 ml-4 " />
                    <div className="w-[90%] h-14 bg-gray-400 rounded-2xl mt-9 " />
                    <div className="w-[90%] h-2 bg-gray-400 rounded-2xl mt-2 " />
                </div>
                <div className="md:w-[30vw] w-[95%] py-4 px-2 rounded-2xl bg-gray-300 animate-pulse flex flex-col items-center justify-start " >
                    <div className="w-[6vw] h-4 bg-gray-400 rounded-2xl self-start mt-5 ml-4 " />
                    <div className="w-[90%] h-14 bg-gray-400 rounded-2xl mt-9 " />
                    <div className="w-[90%] h-2 bg-gray-400 rounded-2xl mt-2 " />
                </div>
                <div className="md:w-[30vw] w-[95%] py-4 px-2 rounded-2xl bg-gray-300 animate-pulse flex flex-col items-center justify-start " >
                    <div className="w-[6vw] h-4 bg-gray-400 rounded-2xl self-start mt-5 ml-4 " />
                    <div className="w-[90%] h-14 bg-gray-400 rounded-2xl mt-9 " />
                    <div className="w-[90%] h-2 bg-gray-400 rounded-2xl mt-2 " />
                </div>
            </div>
        </section>
    )
}