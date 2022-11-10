import { IconTypes } from "../types/IconTypes";
import { Icon } from "./Icons/Icon"

interface Props {
    title: string;
    iconName: IconTypes;
}

export const TitleNews = ({ title, iconName }: Props) => {
    return (
        <div className="w-full h-15 flex items-center justify-between bg-gray-900 px-6 mt-12 rounded-xl md:mt-8">
            <div className="flex items-center">
                <Icon name={iconName} width={34} alt='Icone de livro' />
                <h1 className="ml-4 text-xl">
                    {title}
                </h1>
            </div>
            <div className="ml-4 text-xl">
                <span className="sm:hidden">Ver Todos</span>
                <span className="hidden sm:block">
                    <Icon name="carretDown" width={24} alt='mostrar mais' />
                </span>
                <span></span>
            </div>
        </div>
    )
}