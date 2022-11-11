import { Chapter, GenresOnNovels, Novel, Origin } from "@prisma/client";

export type NovelPageNovelTypes = (Novel & {
    origin: Origin;
    chapter: Chapter[];
    genres: (GenresOnNovels & {
        genre: {
            slug: string;
            name: string;
        };
    })[];
})