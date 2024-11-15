import { IconHome, IconProfile, IconTimetable, IconNotice, IconEmployee } from '../../icon';

const PAGE_DATA = [
	{
		pageName: 'home',
		icon: new IconHome().render(),
	},
	{
		pageName: 'profile',
		icon: new IconProfile().render(),
	},
	{
		pageName: 'vacation',
		icon: new IconTimetable().render(),
	},
	{
		pageName: 'notice',
		icon: new IconNotice().render(),
	},
	{
		pageName: 'employeeList',
		icon: new IconEmployee().render(),
	},
];

export { PAGE_DATA };
