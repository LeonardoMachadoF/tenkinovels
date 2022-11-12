import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { FormEvent, useState } from "react";
import { Template } from '../../src/components/Template';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (username && password) {
            try {
                let res = await axios.post('/api/auth', {
                    username, password
                });
                if (res.data && res.data.token) {
                    const token = res.data.token;
                    nookies.set(null, 'authToken', token, {
                        maxAge: 60 * 60 * 24, //1 day
                        path: '/'
                    })
                    router.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <Template currentPage='login'>
            <div className='flex flex-col text-gray-900'>
                <form onSubmit={handleLogin} className="flex flex-col w-40 m-2 gap-2">
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="text-white font-bold">Enviar</button>
                </form>
            </div>
        </Template>
    );
}

export default Login
