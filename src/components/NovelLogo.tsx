import { Novel } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import novelTmp from '../../tmp/noveltmp.webp'
import { getCloudflareUrl } from "../services/frontServices/getCloudflareUrl"

interface Props {
    data: Novel
}

export const NovelLogo = ({ data }: Props) => {
    return (
        <article className="max-w-[182px] min-w-[182px] md:w-32 md:min-w-[120px]">
            <div className="bg-black h-64 rounded-2xl md:max-h-44">
                <Link href={`/novel/${data.slug}`}>
                    <Image
                        src={getCloudflareUrl(data.image_url)}
                        alt='Capa de nossos projetos'
                        className="rounded-2xl h-full"
                        width={182}
                        height={260}
                        priority
                    />
                </Link>
            </div>
            <h1 className="px-2 mt-1 text-lg md:text-sm">
                <Link href={`/novel/${data.slug}`}>{data.title}</Link>
            </h1>
        </article>
    )
}