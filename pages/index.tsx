import type { NextPage } from 'next'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import { LastUpdateWithChapters } from '../src/components/LastUpdateWithChapters'
import { NovelLogo } from '../src/components/NovelLogo'
import { TitleNews } from '../src/components/TitleNews'

const Home: NextPage = () => {
    return (
        <div className='flex flex-col'>
            <Header />
            <main className='max-w-[1200px] m-auto flex-1'>

                <TitleNews title='Nossos Projetos' iconName='book' />
                <section className='mt-5 flex gap-5 max-w-[100vw] overflow-x-hidden'>
                    <NovelLogo />
                    <NovelLogo />
                    <NovelLogo />
                    <NovelLogo />
                    <NovelLogo />
                    <NovelLogo />
                </section>

                <TitleNews title='Últimos Uploads' iconName='book' />
                <section className='mt-5 flex justify-between flex-wrap gap-8'>
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                    <LastUpdateWithChapters />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Home
