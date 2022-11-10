import Image from "next/image";
import novelTmp from '../../tmp/noveltmp.webp'
import { Template } from "../../src/components/Template"
import { NovelChapters } from "../../src/components/NovelChapters";

const Novel = () => {
    return (
        <Template>
            <div className="w-[94%] max-w-[94vw] m-auto">
                <main className="mt-14">
                    <div className="flex gap-4 md:flex-col items-center md:text-center">
                        <div className="min-w-fit">
                            <h1 className="text-3xl mb-1">1F no Kishi</h1>
                            <Image src={novelTmp} height={220} alt='Capa da novel' priority />
                        </div>
                        <div className="">
                            <div className="text-xl md:text-lg">
                                <p>Status: Em Lançamento</p>
                                <p>Último lançamento: há 2 dias</p>
                                <p>Autor: Hollow Takeuchi</p>
                            </div>
                            <div className="flex py-2 gap-4 items-center text-white flex-wrap text-xl md:text-lg md:items-center md:justify-center">
                                <div className="bg-yellow-700 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]">Ação</div>
                                <div className="bg-yellow-700 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]">Ação</div>
                                <div className="bg-yellow-700 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]">Ação</div>
                                <div className="bg-yellow-700 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]">Shounen</div>
                                <div className="bg-yellow-700 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]">Esporte</div>
                            </div>
                            <div className="">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptatum vitae nostrum quo minus, obcaecati deserunt assumenda labore sapiente perspiciatis neque error laudantium! Omnis, esse harum! Amet qui soluta distinctio.
                            </div>
                        </div>
                    </div>
                </main>
                <div>
                    <div className="flex items-center justify-between mt-16 text-white">
                        <button className="bg-yellow-700 rounded-lg px-2 py-[2px]">Crescente</button>
                        <button className="bg-yellow-700 rounded-lg px-2 py-[2px]">Expandir</button>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <NovelChapters />
                        <NovelChapters />
                        <NovelChapters />
                    </div>
                </div>
            </div>

        </Template>
    )
}

export default Novel;