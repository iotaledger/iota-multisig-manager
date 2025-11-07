import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), vercel()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
