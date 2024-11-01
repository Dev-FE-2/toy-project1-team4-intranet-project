import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	ssr: {
		noExternal: ['msw'],
	},
});
