import axios from "axios";
import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react";
import nookies from 'nookies';
import { Icon } from "./Icons/Icon"
import Link from "next/link";

interface User {
    username: string;
    role: 'ADMIN' | 'UPLOAD' | 'USER';
}

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>();

    const handleAuthentication = async (authToken: string) => {
        try {
            const validation = await axios.post('/api/auth/validation', {
                authToken
            });
            const { username, role } = validation.data;
            setUser({ username, role })
        } catch (err) { }
    }

    useEffect(() => {
        const { authToken } = nookies.get(null)
        if (authToken) {
            handleAuthentication(authToken);
        }
    }, [])

    return (
        <header className="h-15 bg-gray-900 px-2">
            <nav className="max-w-[1120px] h-15 m-auto flex items-center justify-between">
                <div className="flex items-center sm:hidden cursor-pointer" onClick={() => router.push('/')}>
                    <Icon name="home" width={24} alt='Icone de uma casinha ao simbolizando a home do site' />
                    <div className="text-xl ml-5 sm:hidden">Home</div>
                </div>
                <div className="flex text-xl gap-2 m-auto cursor-pointer absolute left-[50%] translate-x-[-50%]" onClick={() => router.push('/')}>
                    <span className="text-yellow-700">天気</span>
                    <p>TenkiNovels</p>
                </div>

                <div>
                    {user && user.role === 'ADMIN' &&
                        <Link href='/admin/novel' className="sm:hidden">Criar nova Novel</Link>
                    }
                </div>
            </nav>
        </header>
    )
};

export default memo(Header);