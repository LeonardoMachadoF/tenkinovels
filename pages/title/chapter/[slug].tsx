import { Chapter, Page } from "@prisma/client";
import { GetServerSideProps, GetStaticPaths } from "next";
import { Template } from "../../../src/components/LayoutComponents/Template";
import prisma from '../../../src/services/backServices/prisma'
import Novel from "../[slug]";

interface Props {
    chapter: (Chapter & {
        pages: Page[];
    })
}

const MangaReader = ({ chapter }: Props) => {
    console.log(chapter)
    return (
        <Template currentPage="chapter">
            <div>
                {!chapter.content && chapter.pages.map((page, index) => {
                    return (
                        <div key={page.id} className="w-[1000px] m-auto min-h-[300px] flex justify-center">
                            <img
                                src={page.url}
                                alt=""
                                loading={index < 2 ? 'eager' : 'lazy'}
                                height='fit'
                            />
                        </div>
                    )
                })}

                {chapter.content &&
                    <div className="mt-10">
                        <pre
                            dangerouslySetInnerHTML={{ __html: chapter.content }}
                            className='w-[980px] max-w-[100vw] whitespace-pre-wrap text-gray-100'
                        ></pre>
                    </div>
                }
            </div>
        </Template >
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paramsOfNovelsChapters = await prisma.chapter.findMany({});

    const paths = paramsOfNovelsChapters.map(chapter => {
        return { params: { slug: chapter.slug } }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
    const data: any = ctx.params;

    const chapter = await prisma.chapter.findFirst({
        where: {
            slug: data.slug
        },
        include: {
            pages: {
                orderBy: {
                    number_page: 'asc'
                }
            }
        },
    })

    return {
        props: {
            chapter: JSON.parse(JSON.stringify(chapter))
        }
    }
}

export default MangaReader;