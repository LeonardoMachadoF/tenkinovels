/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['https://files.tenkimangas.com.br', 'files.tenkimangas.com.br', 'lh3.googleusercontent.com'],
    }
}


module.exports = nextConfig
