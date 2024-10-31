import AvatarImg from '/public/avatar.svg';

export default class VacationListItem {
	constructor(listParentEl, modalParentEl, isMyType, filterType) {
		this.listParentEl = listParentEl;
		this.modalParentEl = modalParentEl;
		this.isMyType = isMyType;
		this.filterType = filterType;
	}

	async fetchVacationData() {
		const response = await fetch('http://localhost:5173/api/vacation');
		const vacationData = await response.json();

		return vacationData;
	}

	async fetchUserData() {
		const response = await fetch('http://localhost:5173/api/user');
		const userData = await response.json();

		return userData;
	}

	async filterMyData() {
		const fetchedDatas = await Promise.all([this.fetchVacationData(), this.fetchUserData()]);
		const [vacationDatas, userData] = fetchedDatas;

		return vacationDatas.filter((vacationData) => vacationData.userId === userData.userId);
	}

	getTemplate(userRequestData) {
		const { requestId, image, username, title, createdDate, startDate, endDate } = userRequestData;
		const createdDateRow = new Date(createdDate);
		const month = Intl.DateTimeFormat('ko-KR', { month: 'numeric' }).format(createdDateRow);
		const day = Intl.DateTimeFormat('ko-KR', { day: 'numeric' }).format(createdDateRow);
		const weekday = Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(createdDateRow);

		return `<li data-key="${requestId}">
					<div class="vacation__main-item">
						<div class="vacation__main-item--profile">
							<img src="${image ?? AvatarImg}" alt="${username} 님의 프로필 사진">
						</div>
						<div class="vacation__main-item--date">
							<span class="day">${weekday}</span>
							<span class="date">${month} ${day}</span>
						</div>
						<div class="vacation__main-item--desc">
							<span>${title}</span>
						</div>
						<div class="vacation__main-item--during">
							<span class="during--start">${startDate}</span>
							<span> ~ </span>
							<span class="during--end">${endDate}</span>
						</div>
						<div class="vacation__main-item--author">
							<span>${username}</span>
						</div>
					</div>
           		 </li>`;
	}

	getVacationList(requestDataList) {
		const templateList = requestDataList.map((userRequestData) =>
			this.getTemplate(userRequestData),
		);

		return templateList.join('');
	}

	async render() {
		const data = this.isMyType ? await this.filterMyData() : await this.fetchVacationData();
		// console.log('this.listParentEl', this.listParentEl);
		// console.log('this.modalParentEl', this.modalParentEl);
		// console.log('this.isMyType', this.isMyType);
		// console.log('this.filterType', this.filterType);
		this.listParentEl.innerHTML = this.getVacationList(data);
	}
}
