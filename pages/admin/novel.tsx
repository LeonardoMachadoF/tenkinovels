import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';

const AdminNovel = () => {
    return (
        <div className='flex flex-col text-gray-900'>

        </div>
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

    return {
        props: {}
    }
}

export default AdminNovel
