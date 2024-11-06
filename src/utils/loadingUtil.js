const addDelayForLoading = async (fetchData) => {
	const delay = new Promise((resolve) => setTimeout(resolve, 500));

	return Promise.all([fetchData, delay]).then((resolve) => resolve[0]);
};

export { addDelayForLoading };
