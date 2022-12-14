import Image from "next/image";
import { Template } from "../../src/components/LayoutComponents/Template"
import { NovelChapters } from "../../src/components/NovelChapters";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from '../../src/services/backServices/prisma';
import { NovelPageNovelTypes } from "../../src/types/FrontTypes/NovelPageNovelTypes";
import { getCloudflareUrl } from "../../src/services/frontServices/getCloudflareUrl";
import { getNovelStatus, StatusType } from "../../src/services/frontServices/getNovelStatus";
import Link from "next/link";
import { useState } from "react";
import { HeadSrc } from "../../src/components/LayoutComponents/HeadSrc";

interface Props {
    novel: NovelPageNovelTypes
}

const Novel = ({ novel }: Props) => {
    const [sorted, setSorted] = useState(true);
    const [seeMore, setSeeMore] = useState(false);


    const volumes: number[] = []


    novel.chapter.map(chapter => {
        if (!volumes.includes(chapter.volume)) {
            volumes.push(chapter.volume)
        }
    });
    novel.chapter.sort((a, b) => a.chapter > b.chapter ? -1 : 1)
    volumes.sort((a, b) => a > b ? -1 : 1)

    return (
        <Template currentPage='novel' novel={{ chapter: novel.chapter[0]?.chapter || null, volume: novel.chapter[0]?.volume || null }}>
            <HeadSrc title={novel.title} />
            <div className="w-[100%] md:max-w-[94vw] m-auto">
                <main className="mt-14">
                    <div className="flex gap-4 md:flex-col md:items-center md:text-center">
                        <div className="min-w-fit">
                            <h1 className="text-3xl absolute md:left-0 md:right-0">{novel.title}</h1>
                            <div className="relative w-44 h-64 top-10">
                                <Image
                                    src={getCloudflareUrl(novel.image_url)}
                                    fill
                                    sizes='20vw'
                                    alt='Capa da novel'
                                    priority
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="text-xl pt-8 md:pt-0 md:text-lg">
                                <p>Status: {getNovelStatus(novel.status as StatusType)}</p>
                                <p>??ltimo lan??amento: h?? 2 dias</p>
                                <p>Autor: {novel.author}</p>
                            </div>
                            <div className="flex py-2 max-w-4xl items-center text-white flex-wrap text-xl md:text-lg md:items-center md:justify-center">
                                {novel.genres.map((genre, index) => {
                                    return index < 8 ?
                                        (
                                            <Link
                                                className="bg-yellow-700 my-2 px-2 mr-2 rounded-lg "
                                                href={`/genres/${genre.genre.slug}`}
                                                key={genre.id}
                                            >
                                                {genre.genre.name}
                                            </Link>
                                        ) : seeMore ? (
                                            <Link
                                                className="bg-yellow-700 my-2 px-2 mr-2 rounded-lg "
                                                href={`/genres/${genre.genre.slug}`}
                                                key={genre.id}
                                            >
                                                {genre.genre.name}
                                            </Link>
                                        ) : null
                                })}
                                {novel.genres.length >= 8 &&
                                    <button className="text-sm text-gray-200 " onClick={() => setSeeMore(!seeMore)}>{seeMore ? 'Ver menos' : 'Ver mais'}</button>
                                }
                            </div>
                            <div className="h-[102px] break-all md:max-w-[90vw] max-w-[50vw] w-[940px] overflow-y-scroll md:overflow-y-visible md:h-fit">
                                {novel.sinopse}
                            </div>
                        </div>
                    </div>
                </main>
                <div>
                    <div className="flex items-center justify-between mt-16 text-white">
                        <button
                            className="bg-yellow-700 rounded-lg px-2 py-[2px]"
                            onClick={() => setSorted(!sorted)}
                        >
                            Crescente
                        </button>
                        <button className="bg-yellow-700 rounded-lg px-2 py-[2px]">Expandir</button>
                    </div>
                    <div className="mt-6 flex flex-col">
                        {sorted && volumes.map((volume) => {
                            return (
                                <NovelChapters
                                    chapters={novel.chapter.filter(chapter => chapter.volume === volume)}
                                    key={volume}
                                    type={novel.type}
                                />
                            )
                        })}
                        {!sorted && volumes.reverse().map((volume) => {
                            return (
                                <NovelChapters
                                    chapters={novel.chapter.reverse().filter(chapter => chapter.volume === volume)}
                                    key={volume}
                                    type={novel.type}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </Template>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paramsOfNovels = await prisma.novel.findMany({
        select: {
            slug: true
        }
    })
    const paths = paramsOfNovels.map(novel => {
        return { params: { slug: novel.slug } }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = ctx.params!.slug;

    const novel = await prisma.novel.findUnique({
        where: {
            slug: slug as string
        },
        include: {
            chapter: {
                orderBy: {
                    chapter: 'desc'
                }
            },
            genres: {
                include: {
                    genre: {
                        select: {
                            name: true,
                            slug: true
                        }
                    }
                }
            },
            origin: true
        }
    });

    return {
        props: {
            novel: JSON.parse(JSON.stringify(novel)),
        },
        revalidate: 60 * 60 * 2
    }
}



export default Novel;