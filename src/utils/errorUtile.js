import { Error503 } from '../components/common/error';

export const throwResponseError = async ({ response, defaultMessage }) => {
	const responseText = await response.text();
	const parsedResponse = JSON.parse(responseText);
	const error = new Error(defaultMessage);
	const message = `${error.message} ${parsedResponse.error}`;
	const newError = {
		errorCode: response.status,
		errorMessage: message,
	};

	throw newError;
};

export const errorHendler = (formInstance, formContainerEl, error) => {
	const { errorCode, errorMessage } = error;

	if (errorCode >= 500) {
		const element = formContainerEl;
		new Error503(element).render();
	}

	formInstance.setError({ errorMessage });
};
