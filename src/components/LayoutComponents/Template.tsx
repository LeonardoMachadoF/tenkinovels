import { CurrentPageProps } from "../../types/FrontTypes/CurrentPageProps";
import { NovelPageNovelTypes } from "../../types/FrontTypes/NovelPageNovelTypes";
import { Footer } from "./Footer"
import Header from "./Header"

interface Props {
    children: React.ReactNode;
    currentPage: CurrentPageProps;
    novel?: {
        chapter: number | null;
        volume: number | null;
    }
}

export const Template = ({ children, currentPage, novel }: Props) => {
    return (
        <div className='flex flex-col'>
            <Header currentPage={currentPage} novel={novel} />

            <div className='min-h-[100vh] max-w-[1200px] m-auto flex-1'>
                {children}
            </div>

            <Footer />
        </div>

    )
}