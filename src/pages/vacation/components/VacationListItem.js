import AvatarImg from '/public/avatar.svg';

export default class VacationListItem {
	constructor(parentEl) {
		this.parentEl = parentEl;
	}

	async fetchData() {
		const response = await fetch('http://localhost:5173/api/vacation');
		const data = await response.json();

		return data;
	}

	getTemplate(userRequestInfo) {
		console.log(userRequestInfo);

		const { image, username, title, createdDate, startDate, endDate } = userRequestInfo;
		const createdDateRow = new Date(createdDate);
		const month = Intl.DateTimeFormat('ko-KR', { month: 'numeric' }).format(createdDateRow);
		const day = Intl.DateTimeFormat('ko-KR', { day: 'numeric' }).format(createdDateRow);
		const weekday = Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(createdDateRow);

		return `<li class="vacation__main-item">
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
            </li>`;
	}

	getVacationList(responseData) {
		const templateList = responseData.map((userRequestInfo) => this.getTemplate(userRequestInfo));
		return templateList.join('');
	}

	async render() {
		const responseData = await this.fetchData();
		console.log('responseData: ', responseData);
		this.parentEl.innerHTML = this.getVacationList(responseData);
	}
}
