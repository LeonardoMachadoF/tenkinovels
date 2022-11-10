import { Footer } from "./Footer"
import Header from "./Header"

interface Props {
    children: React.ReactNode;
}

export const Template = ({ children }: Props) => {
    return (
        <div className='flex flex-col'>
            <Header />

            <div className='min-h-[100vh] max-w-[1200px] m-auto flex-1'>
                {children}
            </div>

            <Footer />
        </div>

    )
}