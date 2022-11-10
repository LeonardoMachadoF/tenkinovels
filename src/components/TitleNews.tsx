import { IconTypes } from "../types/IconTypes";
import { Icon } from "./Icons/Icon"

interface Props {
    title: string;
    iconName: IconTypes;
}

export const TitleNews = ({ title, iconName }: Props) => {
    return (
        <div className="w-full h-15 flex items-center justify-between bg-gray-900 px-6 mt-12 rounded-xl">
            <div className="flex items-center">
                <Icon name={iconName} width={40} alt='Icone de livro' />
                <h1 className="ml-4 text-xl">
                    {title}
                </h1>
            </div>
            <div className="ml-4 text-xl">
                Ver Todos
            </div>
        </div>
    )
}