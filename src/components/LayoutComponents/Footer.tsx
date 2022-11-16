import { Icon } from "../Icons/Icon"

export const Footer = () => {
    return (
        <footer className="h-15 bg-gray-900 mt-10 px-2">
            <div className="max-w-[1200px] h-15 m-auto flex items-center gap-4">
                <Icon name="twitter" alt="twitter icone" width={30} />
                <Icon name="instagram" alt="twitter icone" width={30} />
                <Icon name="discord" alt="twitter icone" width={30} />
            </div>
        </footer>
    )
}