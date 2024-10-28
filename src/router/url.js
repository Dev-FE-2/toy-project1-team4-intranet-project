export const url = {
	home: '/',
	login: '/login',
	employeeList: `/admin/employees`,
	employeeDetail: (userId) => `/admin/employee/${userId}`,
	employeeAdd: `/admin/employee/add`,
	userProfile: (userId) => `/user/${userId}`,
	vacation: `/vacation`,
	notice: `/notice`,
	noticeDetail: (noticeId) => `/notice/${noticeId}`,
};
