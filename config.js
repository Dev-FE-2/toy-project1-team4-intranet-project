let baseURL;

if (process.env.NODE_ENV === 'production') {
	baseURL = process.env.PROD_URL; // 서버 환경에서 사용할 URL
} else {
	baseURL = 'http://localhost:3000'; // 로컬 환경에서 사용할 URL
}

const config = {
	baseURL,
};

export default config;
