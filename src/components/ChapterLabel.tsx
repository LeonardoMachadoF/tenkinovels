import Link from "next/link";
import { numberFormatter } from "../services/frontServices/numberFormatter";
import { getTimePast } from "../services/frontServices/timeUtils";

interface Props {
    chapter: number;
    title: string;
    created_at: Date;
    scan: string;
    type: 'NOVEL' | 'MANGA';
    slug: string;
}
export const ChapterLabel = ({ chapter, title, created_at, scan, type, slug }: Props) => {
    return (
        <article className="flex justify-between">
            <div>
                <div>
                    {title &&
                        <Link href={`/${type.toLowerCase()}/chapter/${slug}`}>
                            Cap.{numberFormatter(chapter)} - Capítulo {title[0].toUpperCase() + title.substring(1)}
                        </Link>
                    }
                    {!title &&
                        <Link href={`/${type.toLowerCase()}/chapter/${slug}`}>
                            Cap.{numberFormatter(chapter)} - Capítulo {numberFormatter(chapter)}
                        </Link>
                    }
                </div>
                <span>{scan ? scan : 'Unknown Scan'}</span>
            </div>
            <span>
                {getTimePast(created_at)}
            </span>
        </article>
    )
}