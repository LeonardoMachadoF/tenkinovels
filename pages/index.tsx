import type { NextPage } from 'next'
import { useLayoutEffect, useState } from 'react'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import { LastUpdateWithChapters } from '../src/components/LastUpdateWithChapters'
import { NovelLogo } from '../src/components/NovelLogo'
import { TitleNews } from '../src/components/TitleNews'

const Home: NextPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const numbersOfNovels = ['', '', '', '', '', '', '', '', ''];
    useLayoutEffect(() => {
        setIsMobile(window.innerWidth < 420)
    }, [])
    return (
        <div className='flex flex-col'>
            <Header />

            <div className='max-w-[1200px] m-auto flex-1'>

                <main className='w-[94%] m-auto'>
                    <TitleNews title='Nossos Projetos' iconName='book' />
                    <section className='mt-5 flex gap-5 max-w-[100vw] overflow-x-scroll pb-4'>
                        {numbersOfNovels.map(nv => <NovelLogo />)}
                    </section>

                    <TitleNews title='Últimos Uploads' iconName='book' />
                    <section className='mt-5 flex justify-between flex-wrap gap-8'>
                        {numbersOfNovels.map(nv => <LastUpdateWithChapters />)}
                    </section>
                </main>

            </div>

            <Footer />
        </div>
    )

}

export default Home
