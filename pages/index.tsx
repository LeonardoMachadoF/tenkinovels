import { Novel } from '@prisma/client'
import type { GetStaticProps } from 'next'
import { LastUpdateWithChapters } from '../src/components/LastUpdateWithChapters'
import { NovelLogo } from '../src/components/NovelLogo'
import { Template } from '../src/components/Template'
import { TitleNews } from '../src/components/TitleNews'
import prisma from '../src/services/backServices/prisma'


interface Props {
    novels: Novel[];
}

const Home = ({ novels }: Props) => {
    const numbersOfNovels = ['', '', '', '', '', '', '', '', ''];

    return (
        <Template currentPage='home'>
            <main className='w-[94%] max-w-[94vw] m-auto'>
                <TitleNews title='Nossos Projetos' iconName='book' />
                <section className='mt-5 flex gap-5 max-w-full overflow-x-scroll pb-4'>
                    {novels.map(novel => <NovelLogo data={novel} key={novel.id} />)}
                </section>

                <TitleNews title='Últimos Uploads' iconName='book' />
                <section className='mt-5 flex justify-between flex-wrap gap-8'>
                    {numbersOfNovels.map((nv, index) => <LastUpdateWithChapters key={index} />)}
                </section>
            </main>
        </Template>
    )

}

export const getStaticProps: GetStaticProps = async () => {
    const novels = await prisma.novel.findMany({
        orderBy: {
            created_at: 'desc'
        },
        take: 12
    })

    return {
        props: {
            novels: JSON.parse(JSON.stringify(novels)),
        },
        revalidate: 60 * 60
    }
}

export default Home
