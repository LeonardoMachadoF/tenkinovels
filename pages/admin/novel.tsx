import { Genre, Origin } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { HeadSrc } from '../../src/components/LayoutComponents/HeadSrc';
import { Template } from '../../src/components/LayoutComponents/Template';
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
    const [typeInput, setTypeInput] = useState<'MANGA' | 'NOVEL'>('MANGA');
    const inputRef = useRef<any>(null);
    const [loading, setLoading] = useState(false)
    const [genresState, setGenresState] = useState(genres);
    const [newGenre, setNewGenre] = useState('');

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
        data.append('type', typeInput)


        try {
            setLoading(true)
            let attempt = await axios.post('/api/novel', data, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (attempt.status === 201) {
                router.push(`/title/${attempt.data.novel.slug}`)
            } else {
                console.log('Erro na requisição')
            }
        } catch (err) {
            console.log('Erro na requisição')
        } finally {
            setLoading(false)
        }

    }

    const handleGenresChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (genresInput.indexOf(e.target.value) > -1) {
            setGenresInput(state => state.filter(genre => genre !== e.target.value))
        } else {
            setGenresInput((state) => [...state, e.target.value])
        }
    }

    const handleAddGenre = (e: FormEvent) => {
        e.preventDefault()
        console.log(genresState[0])
        setGenresState((state) => [...state, { id: 'falseid' + new Date(), name: newGenre, slug: newGenre.split(' ').join('-').toLowerCase() }])
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
                    Origem
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
                        {genresState.map(genre => {
                            return (
                                <label htmlFor={genre.slug} className='text-gray-100 gap-2 px-4' key={genre.id}>
                                    <input
                                        value={genre.slug}
                                        onChange={handleGenresChange}
                                        type="checkbox" id={genre.slug}
                                    />
                                    {genre.name}
                                </label>
                            )
                        })}

                    </div>
                </label>

                <div className='flex flex-row justify-between'>
                    <label htmlFor="logo" className='flex flex-col'>
                        <span className='w-20'>Capa</span>
                        <input id='logo' className='text-gray-100' type="file" ref={inputRef} />
                    </label>

                    <label htmlFor="type" className='flex flex-col'>
                        <span className='w-20'>Tipo</span>
                        <select className='text-gray-900 h-10 w-20' onChange={e => setTypeInput(e.target.value as 'MANGA' | 'NOVEL')}>
                            <option value="MANGA">Manga</option>
                            <option value="NOVEL">Novel</option>
                        </select>
                    </label>
                </div>


                <button disabled={loading} type="submit" className='mt-2 border rounded hover:bg-slate-100 hover:text-gray-900 transition-all'>Enviar</button>
            </form>
            <div className='flex flex-col mt-4 text-gray-100'>
                Adicionar novo Gênero:
                <input
                    type="text"
                    value={newGenre}
                    onChange={e => setNewGenre(e.target.value)}
                    className='text-gray-900'
                />
                <button
                    onClick={handleAddGenre}
                >
                    Add
                </button>
            </div>
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
