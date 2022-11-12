import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { Template } from '../../src/components/Template';
import { handleAuthentication } from '../../src/services/backServices/handleAuthentication';

const AdminNovel = () => {
    return (
        <Template currentPage='novelAdmin'>
            <div></div>
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

    return {
        props: {}
    }
}

export default AdminNovel
