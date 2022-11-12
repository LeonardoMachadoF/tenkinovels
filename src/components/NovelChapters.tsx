import { numberFormatter } from "../services/frontServices/numberFormatter";
import { ChapterLabel } from "./ChapterLabel";

interface Props {
    chapters: {
        chapter: number;
        volume: number;
        title: string;
        created_at: Date;
        scan: string;
    }[]
}


export const NovelChapters = ({ chapters }: Props) => {
    return (
        <div className="mb-4">
            <h2 className="text-lg mb-2">Volume {numberFormatter(chapters[0].volume)}</h2>
            <section className="flex flex-col gap-2">
                {chapters.map((chapter, index) => {
                    return (
                        <ChapterLabel
                            chapter={chapter.chapter}
                            title={chapter.title}
                            created_at={chapter.created_at}
                            scan={chapter.scan}
                            key={index}
                        />
                    )
                })}
            </section>
        </div>
    )
}