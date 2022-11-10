import Image from "next/image"
import Link from "next/link"
import novelTmp from '../../tmp/noveltmp.webp'

export const NovelLogo = () => {
    return (
        <article className="min-w-[182px] md:min-w-[120px]">
            <div className="bg-black h-64 rounded-2xl md:max-h-44">
                <Link href='/novel/slug'>
                    <Image src={novelTmp} alt='Capa de nossos projetos' className="rounded-2xl h-full" />
                </Link>
            </div>
            <h1 className="px-2 mt-1 text-lg md:text-sm">
                <Link href={'/novel/slug'}>Random Title</Link>
            </h1>
        </article>
    )
}