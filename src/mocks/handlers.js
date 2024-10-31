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
];
