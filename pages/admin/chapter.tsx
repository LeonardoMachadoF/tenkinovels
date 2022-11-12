import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import jwt from 'jsonwebtoken'
import prisma from '../../src/services/backServices/prisma'
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';


interface Props {
    novelSlug: string;
    volume: number;
    chapter: number;
    userId: string;
}

const AdminChapter = ({ novelSlug, volume, chapter, userId }: Props) => {
    console.log({ novelSlug, volume, chapter, userId })
    return (
        <div className='flex flex-col text-gray-900'>

        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { authToken: token } = nookies.get(ctx)

    const data = await handleAuthentication(token);
    if (data.error || data.user.role !== 'ADMIN') {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    const user = data.user;

    let { novelslug, volume, chapter }: any = ctx.query;

    if (!volume) {
        volume = 1
    }
    if (!chapter) {
        chapter = 1
    }

    const novel = await prisma.novel.findUnique({
        where: {
            slug: novelslug
        }
    })

    if (!novel) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    return {
        props: {
            novelTitle: novel.title,
            novelSlug: novelslug,
            volume,
            chapter,
            userId: user.id,
        }
    }
}

export default AdminChapter
