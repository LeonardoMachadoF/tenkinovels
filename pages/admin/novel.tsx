import { Genre, Origin } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { HeadSrc } from '../../src/components/HeadSrc';
import { Template } from '../../src/components/Template';
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';
import prisma from '../../src/services/backServices/prisma'

interface Props {
    origins: Origin[],
    genres: Genre[],
    userId: string;
    token: string;
}

const AdminNovel = ({ origins, genres, userId, token }: Props) => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [author, setAuthor] = useState('');
    const [origin, setOrigin] = useState('');
    const [genresInput, setGenresInput] = useState<string[]>([]);
    const inputRef = useRef<any>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !sinopse || !author || !origin || !genresInput) {
            return;
        }

        const data = new FormData;
        data.append('title', title);
        data.append('genres', genresInput.join(';'));
        data.append('sinopse', sinopse);
        data.append('origin_slug', origin);
        data.append('author', author);
        data.append('image', inputRef.current.files[0]);

        try {
            let attempt = await axios.post('/api/novel', data, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (attempt.status === 201) {
                router.push(`/novel/${attempt.data.novel.slug}`)
            } else {
                console.log('Erro na requisição')
            }
        } catch (err) {
            console.log('Erro na requisição')
        }

    }

    const handleGenresChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (genresInput.indexOf(e.target.value) > -1) {
            setGenresInput(state => state.filter(genre => genre !== e.target.value))
        } else {
            setGenresInput((state) => [...state, e.target.value])
        }
    }

    return (
        <Template currentPage='novelAdmin'>
            <HeadSrc title='Nova Novel' />
            <form className='mt-10 flex flex-col gap-4' onSubmit={handleSubmit}>
                <label htmlFor="title" className='flex flex-col'>
                    <span className='w-[100px]'>Título</span>
                    <input id='title' className='text-gray-900 pl-1' type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label htmlFor="sinopse" className='flex flex-col'>
                    <span className='w-20'>Sinopse</span>
                    <input id='sinopse' className='text-gray-900 pl-1' type="text" value={sinopse} onChange={e => setSinopse(e.target.value)} />
                </label>
                <label htmlFor="author" className='flex flex-col'>
                    <span className='w-20'>Autor</span>
                    <input id='author' className='text-gray-900 pl-1' type="text" value={author} onChange={e => setAuthor(e.target.value)} />
                </label>

                <label htmlFor="origin" className='flex flex-col'>
                    <select name="" id="" onChange={e => setOrigin(e.target.value)} className='text-gray-900 pl-1' required>
                        <option value=""></option>
                        {origins.map(o => {
                            return (
                                <option key={o.id} value={o.slug}>{o.name}</option>
                            )
                        })}
                    </select>
                </label>

                <label htmlFor="genres" className='flex flex-col' >
                    <div className='text-gray-900 pl-1'  >
                        {genres.map(genre => {
                            return (
                                <label htmlFor={genre.slug} className='text-gray-100 gap-2 px-4' key={genre.id}>
                                    <input value={genre.slug} onChange={handleGenresChange} type="checkbox" id={genre.slug} /> {genre.name}
                                </label>
                            )
                        })}
                    </div>
                </label>

                <label htmlFor="logo" className='flex flex-col'>
                    <span className='w-20'>Capa</span>
                    <input id='logo' className='text-gray-100' type="file" ref={inputRef} />
                </label>
                <button type="submit" className='mt-2 border rounded hover:bg-slate-100 hover:text-gray-900 transition-all'>Enviar</button>
            </form>
        </Template>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { authToken: token } = nookies.get(ctx);

    const data = await handleAuthentication(token);
    if (data.error || data.user.role !== 'ADMIN') {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    const origins = await prisma.origin.findMany({})
    const genres = await prisma.genre.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    return {
        props: {
            origins,
            userId: data.user.id,
            genres,
            token
        }
    }
}

export default AdminNovel
