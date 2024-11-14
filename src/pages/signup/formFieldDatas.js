export const FORM_BUTTONS = [
	{
		label: '회원 가입',
		colorType: 'primary',
		elementType: 'button',
		buttonType: 'submit',
	},
];

export const FORM_FIELDS = [
	{
		label: '프로필 사진',
		inputType: 'file',
		inputName: 'profileImage',
		inputValue: '',
		required: '',
		fileAccept: 'image/*',
	},
	{
		label: '이메일',
		inputType: 'email',
		inputName: 'email',
		inputValue: '',
		required: 'required',
	},
	{
		label: '비밀번호',
		inputType: 'password',
		inputName: 'password',
		inputValue: '',
		required: 'required',
	},
	{
		label: '비밀번호 확인',
		inputType: 'password',
		inputName: 'passwordConfirm',
		inputValue: '',
		required: 'required',
	},
	{
		label: '이름',
		inputType: 'text',
		inputName: 'username',
		inputValue: '',
		required: 'required',
	},
	{
		label: '휴대폰 번호',
		inputType: 'tel',
		inputName: 'phone',
		inputValue: '',
		required: 'required',
	},
	{
		label: '직무',
		inputType: 'text',
		inputName: 'job',
		inputValue: '',
		required: 'required',
	},
	{
		label: '소속',
		inputType: 'text',
		inputName: 'team',
		inputValue: '',
		required: 'required',
	},
	{
		label: '자기 소개',
		inputType: 'textarea',
		inputName: 'bio',
		inputValue: '',
		required: '',
	},
];
