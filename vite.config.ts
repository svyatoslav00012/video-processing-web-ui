import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import https from 'http'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '127.0.0.1',
        proxy: {
            '/api/v1/file/upload': {
                target: 'http://127.0.0.1:4000/',
                changeOrigin: true,
                secure: false,
            },
            '/api': {
                target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})
