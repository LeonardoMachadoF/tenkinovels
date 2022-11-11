import Image from "next/image";
import { Template } from "../../src/components/Template"
import { NovelChapters } from "../../src/components/NovelChapters";
import { GetStaticPaths, GetStaticProps } from "next";
import prisma from '../../src/services/backServices/prisma';
import { NovelPageNovelTypes } from "../../src/types/FrontTypes/NovelPageNovelTypes";
import { getCloudflareUrl } from "../../src/services/frontServices/getCloudflareUrl";
import { getNovelStatus, StatusType } from "../../src/services/frontServices/getNovelStatus";
import Link from "next/link";

interface Props {
    novel: NovelPageNovelTypes
}

const Novel = ({ novel }: Props) => {
    return (
        <Template currentPage='novel' novel={{ chapter: novel.chapter[0]?.chapter || null, volume: novel.chapter[0]?.volume || null }}>
            <div className="w-[94%] max-w-[94vw] m-auto">
                <main className="mt-14">
                    <div className="flex gap-4 md:flex-col md:items-center md:text-center">
                        <div className="min-w-fit">
                            <h1 className="text-3xl mb-1">{novel.title}</h1>
                            <Image
                                src={getCloudflareUrl(novel.image_url)}
                                width={180}
                                height={242}
                                alt='Capa da novel'
                                priority
                            />
                        </div>
                        <div className="">
                            <div className="text-xl pt-8 md:text-lg">
                                <p>Status: {getNovelStatus(novel.status as StatusType)}</p>
                                <p>Último lançamento: há 2 dias</p>
                                <p>Autor: {novel.author}</p>
                            </div>
                            <div className="flex py-2 gap-4 items-center text-white flex-wrap text-xl md:text-lg md:items-center md:justify-center">
                                {novel.genres.map((genre) => {
                                    return (
                                        <Link
                                            className="bg-yellow-700 my-2 px-3 py-[2px] rounded-lg md:px-2 md:py-[1px]"
                                            href={`/genres/${genre.genre.slug}`}
                                            key={genre.id}
                                        >
                                            {genre.genre.name}
                                        </Link>
                                    )
                                })}
                            </div>
                            <div className="h-[102px] overflow-y-scroll md:overflow-y-visible md:h-fit">
                                {novel.sinopse}
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
        }
    }
}



export default Novel;