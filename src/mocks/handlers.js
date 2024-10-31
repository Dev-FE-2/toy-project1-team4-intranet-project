import { http, HttpResponse } from 'msw';
import { userData, employeesData, vacationData, sampleData } from '../../server/data';

export const handlers = [
	http.get('http://localhost:5173/api/sample/:id', ({ params }) => {
		const { id } = params;
		const fiendedData = sampleData.find((data) => data.postId === id);

		if (fiendedData) {
			return HttpResponse.json(fiendedData, { status: 200 });
		} else {
			return HttpResponse.json({ error: 'Vacation not found' }, { status: 404 });
		}
	}),
	http.get('http://localhost:5173/api/user', () => {
		return HttpResponse.json(userData);
	}),
	http.get('http://localhost:5173/api/employee', () => {
		return HttpResponse.json(employeesData);
	}),
	http.get('http://localhost:5173/api/vacation', () => {
		return HttpResponse.json(vacationData);
	}),
	http.get('http://localhost:5173/api/employee/:id', ({ params }) => {
		const { id } = params;
		console.log('요청된 employee ID:', id);
		const employeeData = employeesData.find((employee) => employee.userId === id);

		if (employeeData) {
			return HttpResponse.json(employeeData, { status: 200 });
		} else {
			return HttpResponse.json({ error: 'Employee not found' }, { status: 404 });
		}
	}),
];
