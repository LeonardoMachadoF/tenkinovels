import Image from 'next/image';
import Home from './Home.svg';
import Book from './Book.svg';
import Twitter from './Twitter.svg';
import Instagram from './Instagram.svg';
import Discord from './Discord.svg';
import CarretDown from './CarretDown.svg';
import { IconTypes } from '../../types/FrontTypes/IconTypes';

interface Props {
    name: IconTypes;
    width: number;
    alt: string;
}

export const Icon = ({ name, width, alt }: Props) => {
    const icons: any = {
        home: Home,
        book: Book,
        instagram: Instagram,
        twitter: Twitter,
        discord: Discord,
        carretDown: CarretDown
    }

    return (
        <Image src={icons[name]} width={width} alt={alt} priority />
    )
}