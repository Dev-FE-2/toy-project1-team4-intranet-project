import './style.css';
import employeesData from '../../../server/data/employees';
import { url } from '../../router/url';
import Pagination from '../../components/pages/employeeList/Pagination';
import SearchBar from '../../components/pages/employeeList/Search';

const ITEMS_PER_PAGE = 10;

export default class EmployeeList {
	constructor(currentPage = 1) {
		this.currentPage = currentPage;
		this.itemsPerPage = ITEMS_PER_PAGE;
		this.searchQuery = '';
		this.cachedFilteredEmployees = null;
		this.cachedCurrentEmployees = null;
		this.cachedTotalPages = null;
		this.pagination = new Pagination(this.totalPages, this.currentPage, this.updatePage.bind(this));
		this.searchBar = new SearchBar(this.handleSearch.bind(this));
	}

	get filteredEmployees() {
		if (this.cachedFilteredEmployees === null || this.searchQuery !== this.cachedSearchQuery) {
			this.cachedFilteredEmployees = this.searchQuery
				? employeesData.filter(
						(employee) => employee.username && employee.username.includes(this.searchQuery),
					)
				: employeesData;
			this.cachedSearchQuery = this.searchQuery;
			this.cachedTotalPages = null;
		}
		return this.cachedFilteredEmployees;
	}

	get currentEmployees() {
		if (this.cachedCurrentEmployees === null || this.currentPage !== this.cachedCurrentPage) {
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			this.cachedCurrentEmployees = this.filteredEmployees.slice(
				startIndex,
				startIndex + this.itemsPerPage,
			);
			this.cachedCurrentPage = this.currentPage;
		}
		return this.cachedCurrentEmployees;
	}

	get totalPages() {
		// 필터링된 직원 목록이 변경되면 페이지 수를 다시 계산
		if (this.cachedTotalPages === null) {
			this.cachedTotalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
		}
		return this.cachedTotalPages;
	}

	updatePage(newPage) {
		if (newPage < 1 || newPage > this.totalPages) return;
		this.currentPage = newPage;
		this.cachedCurrentEmployees = null; // 페이지가 변경되었으므로 현재 직원 목록 캐시 초기화
		this.renderEmployeeList();
		this.pagination.updateButtons(this.totalPages, this.currentPage);
	}

	handleSearch(query) {
		this.searchQuery = query;
		this.currentPage = 1;
		this.cachedFilteredEmployees = null;
		this.cachedCurrentEmployees = null;
		this.cachedTotalPages = null;
		this.renderEmployeeList();
		this.pagination.updateButtons(this.totalPages, this.currentPage);
	}

	renderEmployeeList() {
		const employeeListElement = document.querySelector('#employee-list');
		const noResultsMessage = document.querySelector('.no-results-message');

		if (this.currentEmployees.length > 0) {
			employeeListElement.innerHTML = this.currentEmployees
				.map((employee) => this.createEmployeeRow(employee))
				.join('');
			noResultsMessage.style.display = 'none';
			this.addEmployeeRowEventListeners();
		} else {
			employeeListElement.innerHTML = '';
			noResultsMessage.style.display = 'block';
		}
	}

	createEmployeeRow(employee) {
		return `
			<tr class="employee-row" userid="${employee.userId}">
				<td>
					<div class="row-details">
						<img src="/public/avatar.svg" alt="Employee Image">
						<span>${employee.username}</span>
					</div>
				</td>
				<td>${employee.job}</td>
				<td>${employee.team}</td>
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
		`;
	}

	addEmployeeRowEventListeners() {
		document.querySelectorAll('.employee-row').forEach((row) => {
			row.addEventListener('click', (event) => {
				const employeeId = event.currentTarget.getAttribute('userid');
				window.location.href = `/admin/employees/detail?userId=${employeeId}`;
			});
		});
	}

	render() {
		setTimeout(() => {
			this.renderEmployeeList();
			this.pagination.render('.pagination');
			this.searchBar.render('.search-container');

			const registerButton = document.querySelector('.register-btn');
			registerButton.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = url.employeeAdd;
			});
		}, 0);

		return `
            <section class="contents">
                <div class="container">
                    <h1 class="page-title">직원 구성원</h1>
                    <div class="header">
                        <h2 class="subtitle">총 <span class="blue-text">${employeesData.length}</span>명</h2>
                        <div class="search-container"></div>
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
                            <tbody id="employee-list"></tbody>
                        </table>
                        <div class="no-results-message" style="display: none; text-align: center; padding: 20px;">
                            검색 결과가 없습니다
                        </div>
                        <div class="pagination">
                            ${this.pagination.renderButtons(this.totalPages, this.currentPage)}
                        </div>
                    </div>
                </div>
            </section>
        `;
	}
}
