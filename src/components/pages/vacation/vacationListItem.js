import { fetchVacationData, fetchUserData } from '../../../apis';
import { addDelayForLoading } from '../../../utils/loadingUtil';
import { Loading, NoData, Error503 } from '../../common';
import VacationHistoryModal from './vacationHistoryModal';
import AvatarImg from '/public/avatar.svg';

export default class VacationListItem {
	#listParentEl;
	#modalParentEl;

	constructor(listParentEl, modalParentEl, updateCount) {
		this.#listParentEl = listParentEl;
		this.#modalParentEl = modalParentEl;
		this.updateCount = updateCount;
		this.states = {
			isMyVacation: false,
			filterType: '전체',
			pageNumber: 1,
			pageSize: 10,
		};
	}

	setState(newStates) {
		this.states = { ...this.states, ...newStates };
		this.render();
	}

	async #filterMyData() {
		const fetchedDatas = await Promise.all([fetchVacationData(), fetchUserData()]);
		const [vacationData, userData] = fetchedDatas;

		const filteredDataByMy = vacationData.filter(
			(vacationData) => vacationData.userId === userData.userId,
		);

		return filteredDataByMy;
	}

	#paginate(data) {
		const start = (this.states.pageNumber - 1) * this.states.pageSize;
		const end = start + this.states.pageSize;

		const pagedData = data.slice(start, end);

		return pagedData;
	}

	async #filterTypeData() {
		const loading = new Loading(this.#listParentEl);
		loading.render();

		try {
			const data = this.states.isMyVacation
				? await addDelayForLoading(this.#filterMyData())
				: await addDelayForLoading(fetchVacationData());

			const filteredDataByType =
				this.states.filterType === '전체'
					? data
					: data.filter((vacationData) => vacationData.requestType === this.states.filterType);

			const totalCount = filteredDataByType.length;

			this.updateCount(totalCount);

			return this.#paginate(filteredDataByType);
		} catch (error) {
			console.error(`Data fetch Error: ${error}`);

			return;
		} finally {
			loading.remove();
		}
	}

	#getTemplate(userRequestData) {
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

	#getVacationList(filteredData) {
		if (!filteredData) {
			return new Error503(this.#listParentEl).render();
		}

		if (filteredData.length === 0) {
			return new NoData().render();
		}

		const templateList = filteredData.map((data) => this.#getTemplate(data));

		return templateList.join('');
	}

	async showHistoryModal(event) {
		const modalWrapper = document.querySelector('#modalWrapper');
		const liEl = event.target.closest('li');
		const liKey = liEl.getAttribute('data-key');

		const vacationDatas = await fetchVacationData();
		const foundData = vacationDatas.filter((data) => data.requestId === liKey);

		new VacationHistoryModal(modalWrapper, foundData).render();
		const historyModal = modalWrapper.querySelector('#historyModal');
		historyModal.classList.add('active');
	}

	async render() {
		const filteredData = await this.#filterTypeData();
		this.#listParentEl.innerHTML = this.#getVacationList(filteredData);
		this.#listParentEl.addEventListener('click', (event) => {
			this.showHistoryModal(event);
		});
	}
}
