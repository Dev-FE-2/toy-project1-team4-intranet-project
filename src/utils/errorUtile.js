import { Error503 } from '../components/common/error';

export const errorHendler = (formInstance, formContainerEl, error) => {
	const { errorCode, errorMessage } = error;

	if (errorCode >= 500) {
		const element = formContainerEl;
		new Error503(element).render();
	}

	formInstance.setError({ errorMessage });
};
