import { NextApiHandler } from "next";
import prisma from '../../src/services/backServices/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        let { username, password } = req.body;

        if (!username.trim() || !password.trim())
            return res.json({ message: 'Dados insuficientes!' })

        let user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario e/ou senha incorretos!' })
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({ message: 'Usuario e/ou senha incorretos!' })
        }

        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: 60 * 60 * 24, //1 day
        });

        return res.json({ token })
    }

    return res.status(404).json({});
}

export default handler;