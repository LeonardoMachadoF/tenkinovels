import Head from "next/head";

interface Props {
    title: string;
}

export const HeadSrc = ({ title }: Props) => {
    return (
        <Head>
            <title>{`${title} - TenkiNovels`}</title>
        </Head>
    )
}