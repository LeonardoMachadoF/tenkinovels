import { useRouter } from "next/router"
import { memo } from "react";
import { Icon } from "./Icons/Icon"

const Header = () => {
    const router = useRouter();

    return (
        <header className="h-15 bg-gray-900 px-2">
            <nav className="max-w-[1120px] h-15 m-auto flex items-center justify-between">
                <div className="flex items-center sm:hidden cursor-pointer" onClick={() => router.push('/')}>
                    <Icon name="home" width={24} alt='Icone de uma casinha ao simbolizando a home do site' />
                    <div className="text-xl ml-5 sm:hidden">Home</div>
                </div>
                <div className="flex text-xl gap-2 translate-x-[-50%] md:translate-x-[0%] m-auto cursor-pointer" onClick={() => router.push('/')}>
                    <span className="text-yellow-700">天気</span>
                    <p>TenkiNovels</p>
                </div>
                <div></div>
            </nav>
        </header>
    )
};

export default memo(Header);