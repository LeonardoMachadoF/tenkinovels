import type { NextPage } from 'next'
import { LastUpdateWithChapters } from '../src/components/LastUpdateWithChapters'
import { NovelLogo } from '../src/components/NovelLogo'
import { Template } from '../src/components/Template'
import { TitleNews } from '../src/components/TitleNews'

const Home: NextPage = () => {
    const numbersOfNovels = ['', '', '', '', '', '', '', '', ''];
    return (
        <Template>
            <main className='w-[94%] max-w-[94vw] m-auto'>
                <TitleNews title='Nossos Projetos' iconName='book' />
                <section className='mt-5 flex gap-5 max-w-full overflow-x-scroll pb-4'>
                    {numbersOfNovels.map((nv, index) => <NovelLogo key={index} />)}
                </section>

                <TitleNews title='Últimos Uploads' iconName='book' />
                <section className='mt-5 flex justify-between flex-wrap gap-8'>
                    {numbersOfNovels.map((nv, index) => <LastUpdateWithChapters key={index} />)}
                </section>
            </main>
        </Template>
    )

}

export default Home
