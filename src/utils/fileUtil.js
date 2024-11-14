import defaultImage from '/public/avatar.svg';

const previewUploadImage = (fileEl, previewEl) => {
	const [file] = fileEl.files;

	if (file) {
		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			console.log(event.target.result);

			previewEl.src = event.target.result;
		};

		fileReader.readAsDataURL(file);
	} else {
		previewEl.src = defaultImage;
	}
};

const observeFileListener = (previewSelector, fileSelector) => {
	const previewEl = document.querySelector(previewSelector);
	const fileEl = document.querySelector(fileSelector);
	fileEl.accept = 'image/*';
	fileEl.addEventListener('change', (event) => {
		console.log('click', event); // 동작하지 않는다. change 이벤트 감지가 되지 않는 이슈 확인
		previewUploadImage(fileEl, previewEl);
	});

	fileEl.addEventListener('click', (event) => {
		console.log('click', event); // 잘 동작한다.
	});
};

export { observeFileListener, previewUploadImage };
