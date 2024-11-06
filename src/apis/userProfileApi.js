async function fetchUserData() {
	const response = await fetch('http://localhost:5173/api/user');
	const userData = await response.json();

	return userData;
}

export { fetchUserData };
