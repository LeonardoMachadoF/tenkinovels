import axios from "axios";
import { useRouter } from "next/router"
import { memo, useContext, useEffect, useLayoutEffect, useState } from "react";
import nookies from 'nookies';
import { Icon } from "./Icons/Icon"
import Link from "next/link";
import { AuthContext } from "../context/authContext/AuthContext";
import { CurrentPageProps } from "../types/FrontTypes/CurrentPageProps";
import { NovelPageNovelTypes } from "../types/FrontTypes/NovelPageNovelTypes";

interface Props {
    currentPage: CurrentPageProps;
    novel?: {
        chapter: number | null;
        volume: number | null;
    };
}

const Header = ({ currentPage, novel }: Props) => {
    const router = useRouter();
    let { username, role } = useContext(AuthContext);

    const adminsOptions = {
        home: <Link href='/admin/novel' className="sm:hidden">Nova Novel</Link>,
        novel: <Link href={`/admin/chapter?novelslug=${router.asPath.split('novel/')[1]}`} className="sm:hidden">Novo Capítulo</Link>,
    }

    if (username && role === 'ADMIN' && novel && novel.chapter && novel.volume) {
        const query = `/admin/chapter?novelslug=${router.asPath.split('novel/')[1]}&volume=${novel.volume < 10 ? `0${novel.volume}` : novel.volume}&chapter=${(novel.chapter + 1) < 10 ? `0${novel.chapter + 1}` : novel.chapter + 1}`
        adminsOptions.novel = <Link href={query} className="sm:hidden">Novo Capítulo</Link>
    }

    return (
        <header className="h-15 bg-gray-900 px-2">
            <nav className="max-w-[1120px] h-15 m-auto flex items-center justify-between">
                <div className="flex items-center sm:hidden cursor-pointer" onClick={() => router.push('/')}>
                    <Icon name="home" width={22} alt='Icone de uma casinha ao simbolizando a home do site' />
                    <div className="text-xl ml-5 sm:hidden">Home</div>
                </div>
                <div className="flex text-xl gap-2 m-auto cursor-pointer absolute left-[50%] translate-x-[-50%]" onClick={() => router.push('/')}>
                    <span className="text-yellow-700">天気</span>
                    <p>TenkiNovels</p>
                </div>

                <div>
                    {username && role === 'ADMIN' && (currentPage === 'home' || currentPage === 'novel') &&
                        adminsOptions[currentPage]
                    }
                </div>
            </nav>
        </header>
    )
};

export default memo(Header);