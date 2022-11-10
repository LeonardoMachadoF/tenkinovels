import { Icon } from "./Icons/Icon"

export const Header = () => {
    return (
        <header className="h-15 bg-gray-900 px-2">
            <div className="max-w-[1200px] h-15 m-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Icon name="home" width={26} alt='Icone de uma casinha ao simbolizando a home do site' />
                    <div className="text-xl ml-5">Home</div>
                </div>
                <div className="flex text-xl gap-2 translate-x-[-50%]">
                    <span className="text-yellow-700">天気</span>
                    <p>TenkiNovels</p>
                </div>
                <div></div>
            </div>
        </header>
    )
}