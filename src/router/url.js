export const url = {
	home: '/',
	login: '/login',
	userProfile: (userId) => `/profile/${userId}`,
	vacation: `/vacation`,
	notice: `/notice`,
	noticeDetail: (noticeId) => `/notice/${noticeId}`,
	employeeList: `/admin/employees`,
	employeeDetail: (employeeId) => `/admin/employees/${employeeId}`,
	employeeAdd: `/admin/employees/add`,
};

export const urlPattern = {
	userProfile: /^\/profile\/(\w+)$/,
	noticeDetail: /^\/notice\/(\w+)$/,
	employeeDetail: /^\/admin\/employees\/(\w+)$/,
};