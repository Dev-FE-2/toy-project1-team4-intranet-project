export const url = {
	home: '/',
	login: '/login',
	signup: '/signup',
	profile: (userId) => `/profile/${userId}`,
	vacation: `/vacation`,
	notice: `/notice`,
	noticeDetail: (noticeId) => `/notice/${noticeId}`,
	employeeList: `/admin/employees`,
	employeeDetail: (employeeId) => `/admin/employees/${employeeId}`,
	employeeAdd: `/admin/employees/add`,
	sample: (id) => `/sample/${id}`,
};

export const urlPattern = {
	profile: /^\/profile\/(\w+)$/,
	noticeDetail: /^\/notice\/(\w+)$/,
	employeeDetail: /^\/admin\/employees\/(\w+)$/,
	sample: /^\/sample\/(\w+)$/,
};

export const urlLabel = {
	home: '마이페이지',
	login: '로그인',
	signup: '회원가입',
	profile: '프로필',
	vacation: '근태 신청',
	notice: '공지사항',
	noticeDetail: '',
	employeeList: '직원 구성원',
	employeeDetail: '직원 정보 수정',
	employeeAdd: `직원 등록`,
};
