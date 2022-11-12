import nookies from 'nookies';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../src/services/backServices/prisma'
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';
import { Template } from '../../src/components/Template';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


interface Props {
    novelSlug: string;
    volume: number;
    chapter: number;
    userId: string;
}

const AdminChapter = ({ novelSlug, volume, chapter, userId }: Props) => {
    console.log({ novelSlug, volume, chapter, userId })
    const [value, setValue] = useState('');
    let newImage = value.replace('a href', 'img src').replace('>img</a>', '/>').replace('rel', 'alt').replace(`target="_blank"`, "class='m-auto' loading='eager'");
    while (newImage.indexOf('a href') > -1) {
        newImage = newImage.replace('a href', 'img src').replace('>img</a>', '/>').replace('rel', 'alt').replace(`target="_blank"`, "class='m-auto' loading='lazy'");
    }
    return (
        <Template currentPage='chapterAdmin'>
            <div className=' text-gray-900'>
                <div className='w-[660px] max-w-[100vw] m-auto'>
                    <ReactQuill value={value} onChange={setValue} style={{ backgroundColor: '#eee', height: '300px', paddingBottom: '45px' }} />
                </div>
                <pre
                    dangerouslySetInnerHTML={{ __html: newImage }}
                    className='w-[1000px] max-w-[100vw] whitespace-pre-wrap text-gray-100'
                ></pre>
            </div>
        </Template>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { authToken: token } = nookies.get(ctx)

    const data = await handleAuthentication(token);
    if (data.error || data.user.role !== 'ADMIN') {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    const user = data.user;

    let { novelslug, volume, chapter }: any = ctx.query;

    if (!volume) {
        volume = 1
    }
    if (!chapter) {
        chapter = 1
    }

    const novel = await prisma.novel.findUnique({
        where: {
            slug: novelslug
        }
    })

    if (!novel) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    return {
        props: {
            novelTitle: novel.title,
            novelSlug: novelslug,
            volume,
            chapter,
            userId: user.id,
        }
    }
}

export default AdminChapter
