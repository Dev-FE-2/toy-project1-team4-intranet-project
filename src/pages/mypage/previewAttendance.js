export const createLiAttendanceList = (userId, vacationData, container) => {
	// vacationData에서 해당 userId에 맞는 데이터 가져옴
	const data = vacationData.filter((data) => data.userId == userId);
	// userId에서 최신 3개를 가져옴
	const previewData = data.slice(-3);

	// 데이터가 비어 있는 경우 공백 <li> 하나 추가
	if (data.length === 0) {
		container.innerHTML = `
          <li class="attendance-item">
              <div class="attendance-item__to-third">
                  <div class="attendance-img">
                      <img src="../../../public/avatar.svg" alt="Icon" />
                  </div>
                  <div class="date-time">
                      <div class="day"></div>
                      <div class="date"></div>
                  </div>
                  <div class="attendance-text"></div>
              </div>
              <div class="author"></div>
          </li>
      `;
		return;
	}

	// 데이터가 있을 때, 각각의 데이터를 <li> 요소로 추가 최대 3개
	previewData.forEach((item) => {
		const listItem = document.createElement('li');
		listItem.className = 'attendance-item';
		listItem.innerHTML = `
          <div class="attendance-item__to-third">
              <div class="attendance-img">
                  <img src="../../../public/avatar.svg" alt="Icon" />
              </div>
              <div class="date-time">
                  <div class="day">${new Date(item.startDate).toLocaleString('en-US', { weekday: 'long' })}</div>
                  <div class="date">${new Date(item.startDate).getDate()}</div>
              </div>
              <div class="attendance-text">${item.title}</div>
          </div>
          <div class="author">${item.username}</div>
      `;
		container.appendChild(listItem);
	});
};
