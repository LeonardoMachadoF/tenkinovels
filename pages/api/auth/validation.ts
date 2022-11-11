import { NextApiHandler } from "next";
import prisma from '../../../src/services/backServices/prisma';
import jwt from 'jsonwebtoken';


const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const { authToken } = req.body;

        try {
            const verify: any = jwt.verify(authToken, process.env.JWT_SECRET as string);

            const user = await prisma.user.findUnique({
                where: {
                    username: verify.username
                }
            })
            if (!user) return res.status(404).json({ message: 'Token de usuario inexistente' });

            return res.status(200).json({ username: user.username, role: user.role })
        } catch (err) { console.log(err) }

        return res.status(404).json({ message: 'Token inválido' })
    }
    return res.status(404).json({})
}

export default handler;