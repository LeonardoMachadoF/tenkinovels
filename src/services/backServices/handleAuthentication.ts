import jwt from 'jsonwebtoken'
import prisma from './prisma'

export const handleAuthentication = async (token: string) => {
    let verifyAuthentication: any = undefined;

    try {
        verifyAuthentication = jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (err) {
        console.log(err)
    }

    if (!verifyAuthentication || !verifyAuthentication.username) {
        return { error: { message: 'Invalid token' } }
    }

    const user = await prisma.user.findUnique({
        where: {
            username: verifyAuthentication.username
        }
    });

    if (!user || user.role !== 'ADMIN') {
        return { error: { message: 'Invalid token' } }
    }

    return {
        user
    }
}