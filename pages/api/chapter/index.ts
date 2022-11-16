import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../src/services/backServices/prisma';
import { handleAuthentication } from "../../../src/services/backServices/handleAuthentication";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const { user } = await handleAuthentication(token as string);

    if (!user || user.role !== 'ADMIN') {
        return res.status(404).json({ message: 'Unauthorized' })
    }

    const { chapter, volume, contentSlug, arrayOfPages, title, content } = req.body;
    const slug = `${contentSlug}-chapter-${Number(chapter) < 10 ? `0${chapter}` : chapter}`

    const chapterAlreadyExists = await prisma.chapter.findUnique({
        where: {
            slug
        }
    })

    if (chapterAlreadyExists) {
        return res.status(404).json({ message: `Capitulo com slug: ${slug} já existe!` })
    }

    console.log(req.body)

    const newChapter = await prisma.chapter.create({
        data: {
            chapter: parseFloat(chapter),
            slug,
            volume: parseInt(volume),
            title: title || '',
            content,
            user: {
                connect: {
                    id: user.id
                }
            },
            novel: {
                connect: {
                    slug: contentSlug
                }
            }
        }
    })

    if (!newChapter) {
        return res.status(404).json({ message: 'Ocorreu algum erro' })
    }

    if (arrayOfPages) {
        await Promise.all(JSON.parse(arrayOfPages).map(async (page: { imageUrl: string; page: number }) => {
            return await prisma.page.create({
                data: {
                    number_page: page.page,
                    url: page.imageUrl,
                    manga_chapter_id: newChapter.id
                }
            })
        }))
    }

    res.status(201).json({})
}

export default handler;