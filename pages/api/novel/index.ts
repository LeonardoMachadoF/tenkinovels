import nc from 'next-connect';
import { NextApiResponse } from "next";
import jsonwebtoken from 'jsonwebtoken';
import { upload } from '../../../src/config/multer';
import prisma from '../../../src/services/backServices/prisma';
import { storageApi } from '../../../src/services/backServices/storageApi';
import { NextApiRequestWithFile } from '../../../src/types/BackTypes/ExtendedRequestWithFile';

export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.single('image'))


handler.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    let verifyAuthentication: any = undefined;

    try {
        verifyAuthentication = jsonwebtoken.verify(token as string, process.env.JWT_SECRET as string)
    } catch (err) {
        console.log(err)
    }

    if (!verifyAuthentication || !verifyAuthentication.username) {
        return res.status(404).json({ message: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
        where: {
            username: verifyAuthentication.username
        }
    });

    if (!user || user.role !== 'ADMIN') {
        return res.status(404).json({ message: 'Unauthorized' })
    }

    let { title, genres, sinopse, author, user_id, origin_slug } = req.body;

    let slug = title.split(' ').join('-').toLowerCase().split('?').join('');
    let credentials = await storageApi.getCredentials();
    let { url } = await storageApi.uploadNovelImage(credentials, req.file, slug);

    let novel = await prisma.novel.create({
        data: {
            title,
            sinopse,
            slug,
            author,
            image_url: url,

            user: {
                connect: {
                    id: user_id
                }
            },

            origin: {
                connectOrCreate: {
                    where: {
                        slug: origin_slug
                    },
                    create: {
                        name: origin_slug[0].toUpperCase() + origin_slug.substring(1),
                        slug: origin_slug
                    }
                }
            }
        }
    }).catch(err => console.log(err))

    if (!novel) {
        return res.status(404).json({ message: 'Ocorreu um erro na criação da novel' })
    }

    genres.split(';').map(async (genre: string) => {
        let connect = await prisma.genre.findFirst({ where: { slug: genre } });
        if (connect) {
            await prisma.genresOnNovels.create({
                data: {
                    novel_id: novel!.id as string,
                    genre_id: connect.id,
                }
            })
        } else {
            let newGenre = await prisma.genre.create({
                data: {
                    name: genre[0].toUpperCase() + genre.substring(1),
                    slug: genre
                }
            })
            await prisma.genresOnNovels.create({
                data: {
                    novel_id: novel!.id,
                    genre_id: newGenre.id
                }
            })
        }
    })


    return res.status(201).json({ novel });
})

export default handler;