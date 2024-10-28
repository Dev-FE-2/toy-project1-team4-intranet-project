import './style.css';
import employeesData from '../../../server/data/employees';

const ITEMS_PER_PAGE = 15;

export default function EmployeeList(currentPage = 1) {
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentEmployees = employeesData.slice(startIndex, endIndex);

	const employeeRows = currentEmployees
		.map(
			(employee) => `
        <tr class="employee-row">
            <td>
                <div class="row-details">
                    <img src="/public/avatar.svg" alt="Employee Image">
                    <span>${employee.name}</span>
                </div>
            </td>
            <td>${employee.job}</td>
            <td>${employee.org}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td><span class="arrow">></span></td>
        </tr>
    `,
		)
		.join('');

	const totalPages = Math.ceil(employeesData.length / ITEMS_PER_PAGE);
	const paginationButtons = Array.from(
		{ length: totalPages },
		(_, index) => `
        <span class="page-number ${index + 1 === currentPage ? 'active' : ''}" data-page="${index + 1}">
            ${index + 1}
        </span>
    `,
	).join('');

	return `
        <div class="container">
            <h1 class="page-title">직원 구성원</h1>
            <div class="header">
                <h2 class="subtitle">총 <span class="blue-text">${employeesData.length}</span>명</h2>
                <div class="search-container">
                    <input type="text" placeholder="이름을 검색하세요" class="search" />
                    <button class="register-btn">직원 등록</button>
                </div>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>직무</th>
                            <th>조직</th>
                            <th>이메일</th>
                            <th>연락처</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="employee-list">
                        ${employeeRows}
                    </tbody>
                </table>
                
                <div class="pagination">
                    <a href="#" class="prev-page">«</a>
                    ${paginationButtons}
                    <a href="#" class="next-page">»</a>
                </div>
            </div>
        </div>`;
}
