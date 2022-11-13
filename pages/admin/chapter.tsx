import nookies from 'nookies';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React, { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../src/services/backServices/prisma'
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';
import { Template } from '../../src/components/Template';
import { HeadSrc } from '../../src/components/HeadSrc';
import axios from 'axios';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


interface Props {
    contentSlug: string;
    volume: number;
    chapter: number;
    userId: string;
    token: string;
    type: 'MANGA' | 'NOVEL';
}

const AdminChapter = ({ contentSlug, volume, chapter, userId, type, token }: Props) => {
    const [value, setValue] = useState('');
    const [volumeInput, setVolumeInput] = useState('');
    const [chapterInput, setChapterInput] = useState('');
    const [titleInput, setTitleInput] = useState('');

    // let newImage = value.replace('a href', 'img src').replace('>img</a>', '/>').replace('rel', 'alt').replace(`target="_blank"`, "class='m-auto' loading='eager'");
    // while (newImage.indexOf('a href') > -1) {
    //     newImage = newImage.replace('a href', 'img src').replace('>img</a>', '/>').replace('rel', 'alt').replace(`target="_blank"`, "class='m-auto' loading='lazy'");
    // }  
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!value || !Number(chapterInput) || !Number(volumeInput)) return;

        const data = {
            arrayOfPages: value,
            contentSlug,
            volume: Number(volumeInput),
            chapter: Number(chapterInput),
            userId,
            title: titleInput
        }

        try {
            let res = await axios.post('/api/chapter', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 201) {
                setValue('');
            }
        } catch (err: any) {
            alert(err.response.data.message)
        }



    }

    return (
        <Template currentPage='chapterAdmin' >
            <HeadSrc title='Novo Capítulo' />
            <div className='text-gray-900'>
                {type === 'MANGA' &&
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <label htmlFor="title" className='flex gap-2 items-center'>
                            <span className='w-20 text-gray-100'>Titulo</span>
                            <input
                                type="string"
                                id='title'
                                className='p-1 text-3xl'
                                value={titleInput}
                                onChange={e => setTitleInput(e.target.value)}
                            />
                        </label>
                        <label htmlFor="volume" className='flex gap-2 items-center'>
                            <span className='w-20 text-gray-100'>Volume</span>
                            <input
                                type="text"
                                id='volume'
                                className='p-1 text-3xl'
                                value={volumeInput}
                                onChange={e => setVolumeInput(e.target.value)}
                            />
                        </label>
                        <label htmlFor="capitulo" className='flex gap-2 items-center'>
                            <span className='w-20 text-gray-100'>Capitulo</span>
                            <input
                                type="text"
                                id='capitulo'
                                className='p-1 text-3xl'
                                value={chapterInput}
                                onChange={e => setChapterInput(e.target.value)}
                            />
                        </label>
                        <textarea
                            cols={30}
                            rows={10}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        >

                        </textarea>
                        <button
                            type="submit"
                            className='text-gray-100'
                        >
                            Enviar
                        </button>
                    </form>
                }
            </div>





















            {/* <div className=' text-gray-900'>
                <div className='w-[660px] max-w-[100vw] m-auto'>
                    <ReactQuill value={value} onChange={setValue} style={{ backgroundColor: '#eee', height: '300px', paddingBottom: '45px' }} />
                </div>
                <pre
                    dangerouslySetInnerHTML={{ __html: newImage }}
                    className='w-[1000px] max-w-[100vw] whitespace-pre-wrap text-gray-100'
                ></pre>
            </div> */}
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

    const content = await prisma.novel.findUnique({
        where: {
            slug: novelslug
        }
    })

    if (!content) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    return {
        props: {
            contentTitle: content.title,
            contentSlug: novelslug,
            volume,
            chapter,
            userId: user.id,
            type: content.type,
            token
        }
    }
}

export default AdminChapter
