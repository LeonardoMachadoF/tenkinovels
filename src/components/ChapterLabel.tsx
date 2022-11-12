import { numberFormatter } from "../services/frontServices/numberFormatter";
import { getTimePast } from "../services/frontServices/timeUtils";

interface Props {
    chapter: number;
    title: string;
    created_at: Date;
    scan: string;
}
export const ChapterLabel = ({ chapter, title, created_at, scan }: Props) => {
    return (
        <article className="flex justify-between">
            <div>
                <h1>{`Cap.${numberFormatter(chapter)} - ${title[0].toUpperCase() + title.substring(1)}`}</h1>
                <span>{scan}</span>
            </div>
            <span>
                {getTimePast(created_at)}
            </span>
        </article>
    )
}