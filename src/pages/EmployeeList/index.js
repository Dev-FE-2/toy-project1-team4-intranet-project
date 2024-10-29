import './style.css';
import employeesData from '../../../server/data/employees';

const ITEMS_PER_PAGE = 15;

class EmployeeList {
	constructor(currentPage = 1) {
		this.currentPage = currentPage;
		this.itemsPerPage = ITEMS_PER_PAGE;
	}

	get currentEmployees() {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		return employeesData.slice(startIndex, endIndex);
	}

	get employeeRows() {
		return this.currentEmployees
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
	}

	get totalPages() {
		return Math.ceil(employeesData.length / this.itemsPerPage);
	}

	get paginationButtons() {
		return Array.from(
			{ length: this.totalPages },
			(_, index) => `
				<span class="page-number ${index + 1 === this.currentPage ? 'active' : ''}" data-page="${index + 1}">
					${index + 1}
				</span>
			`,
		).join('');
	}

	render() {
		return `
         <section class="contents">
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
							${this.employeeRows}
						</tbody>
					</table>
					
					<div class="pagination">
						<a href="#" class="prev-page">«</a>
						${this.paginationButtons}
						<a href="#" class="next-page">»</a>
					</div>
				</div>
			</div>
            </section>`;
	}
}

export default EmployeeList;
