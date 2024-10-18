module.exports = {
	printWidth: 100, // 기본값 80
	tabWidth: 2, // 들여쓰기 간격
	useTabs: true, // 기본값 false
	semi: true, // 기본값 true - 코드가 끝날때 ; 기호가 필수
	singleQuote: true, // 큰 따옴표 대신 작은 따옴표 사용 여부
	trailingComma: 'all', // 모든 배열과 객체의 후행에 쉼표를 입력함
	/**
	 * array = [1, 2, 3,];
	 * object = { a: 1, b: 2, c: 3, }; // 후행 쉼표
	 * function hello(a, b,) {} //후행 쉼표
	 */
	bracketSpacing: true, // 객체의 양 끝 간격 사용 여부 { a: 1, b: 2, c: 3 }
	arrowParens: 'always', // 함수의 매개변수에 괄호 const hello = (message) => console.log(message);
	proseWrap: 'never', // 마크다운 포매팅 제외
	endOfLine: 'auto', // 개행문자 유지
};
