import path from 'path';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/

// MDX must run before @vitejs/plugin-react-swc. Without enforce: 'pre',
// react-swc receives raw .mdx source and fails to parse it as JSX,
// throwing a syntax error on the first line of every MDX file.
const mdxPlugin = { enforce: 'pre' as const, ...mdx({ remarkPlugins: [remarkGfm] }) };

export default defineConfig({
	plugins: [mdxPlugin, react(), tailwindcss(), vercel()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
