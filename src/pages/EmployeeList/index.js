import './style.css';
import employeesData from '../../../server/data/employees';
import { url } from '../../router/url';
const ITEMS_PER_PAGE = 10;

export default class EmployeeList {
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
                    <tr class="employee-row" userid="${employee.userId}">
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
                        <td>
							<span class="arrow">
								<svg height="16px" width="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
								<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256" />
								</svg>
							</span>
						</td>
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

	updatePage(newPage) {
		if (newPage < 1 || newPage > this.totalPages) return;
		this.currentPage = newPage;
		this.updateEmployeeList();
		this.updatePaginationButtons();

		const tableContainer = document.querySelector('.table-container');
		if (tableContainer) {
			tableContainer.scrollTop = 0;
		}
	}

	updateEmployeeList() {
		const employeeListElement = document.querySelector('#employee-list');
		if (employeeListElement) {
			employeeListElement.innerHTML = this.employeeRows;
			this.addEmployeeRowEventListeners();
		}
	}

	updatePaginationButtons() {
		const paginationElement = document.querySelector('.pagination');
		if (paginationElement) {
			paginationElement.innerHTML = `
                <a href="#" class="prev-page">«</a>
                ${this.paginationButtons}
                <a href="#" class="next-page">»</a>
            `;
			this.addPaginationEventListeners();
		}
	}
	addEmployeeRowEventListeners() {
		const employeeRows = document.querySelectorAll('.employee-row');
		employeeRows.forEach((row) => {
			row.removeEventListener('click', this.onEmployeeRowClick);
			row.addEventListener('click', this.onEmployeeRowClick);
		});
	}

	onEmployeeRowClick(event) {
		const employeeId = event.currentTarget.getAttribute('userid');
		window.location.href = `/admin/employees/${employeeId}`;
	}

	addPaginationEventListeners() {
		const pageButtons = document.querySelectorAll('.page-number');
		const prevButton = document.querySelector('.prev-page');
		const nextButton = document.querySelector('.next-page');

		pageButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				const page = parseInt(event.target.getAttribute('data-page'), 10);
				if (!isNaN(page)) {
					this.updatePage(page);
				}
			});
		});

		if (prevButton) {
			prevButton.addEventListener('click', (event) => {
				event.preventDefault();
				this.updatePage(this.currentPage - 1);
			});
		}

		if (nextButton) {
			nextButton.addEventListener('click', (event) => {
				event.preventDefault();
				this.updatePage(this.currentPage + 1);
			});
		}
	}

	render() {
		setTimeout(() => {
			this.updateEmployeeList();
			this.updatePaginationButtons();

			const registerButton = document.querySelector('.register-btn');
			if (registerButton) {
				registerButton.addEventListener('click', (event) => {
					event.preventDefault();
					window.location.href = url.employeeAdd;
				});
			}
			const employeeRows = document.querySelectorAll('.employee-row');
			employeeRows.forEach((row) => {
				row.addEventListener('click', () => {
					const employeeId = row.getAttribute('userid');
					window.location.href = `/admin/employees/${employeeId}`;
				});
			});
		}, 0);

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
            </section>
        `;
	}
}
