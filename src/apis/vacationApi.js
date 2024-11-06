async function fetchVacationData() {
	const response = await fetch('http://localhost:5173/api/vacation');
	const vacationData = await response.json();

	return vacationData;
}

export { fetchVacationData };
