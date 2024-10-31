const noticeData = [
	{
		notice_id: 120,
		title: '연말 워크숍 일정 공지',
		content:
			'EVEN의 2024년 연말 워크숍 일정이 확정되었습니다. 모든 직원은 워크숍에 참석해 주시기 바라며, 팀워크를 강화하고 다양한 아이디어를 나누는 기회로 삼아 주세요. 자세한 일정은 사내 게시판에서 확인하실 수 있습니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-10-01',
		last_modified_date: '2024-10-02',
		writer: '박지현',
	},
	{
		notice_id: 119,
		title: '신규 복지 혜택 안내',
		content:
			'EVEN은 직원 복지 강화를 위해 새로운 혜택을 제공합니다. 모든 직원은 사내 포털에서 복지 혜택 관련 안내를 확인하시고, 필요한 혜택을 신청해 주시기 바랍니다. 이번 복지 혜택은 여러분의 업무 만족도와 생활의 질을 높이기 위해 마련되었습니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-09-20',
		last_modified_date: '2024-09-21',
		writer: '김지수',
	},
	{
		notice_id: 118,
		title: '가을 맞이 사내 이벤트 공지',
		content:
			'다가오는 가을, EVEN에서는 사내 이벤트를 진행합니다. 이번 이벤트는 직원들 간의 소통과 단합을 목표로 다양한 프로그램이 준비되어 있습니다. 모든 직원의 많은 참여 부탁드립니다. 세부 내용은 사내 게시판에서 확인 가능합니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-09-01',
		last_modified_date: '2024-09-02',
		writer: '오은지',
	},
	{
		notice_id: 117,
		title: '신입사원 환영 행사 안내',
		content:
			'신입사원을 환영하는 자리를 마련하였습니다. EVEN 가족이 된 신입사원들이 빠르게 적응할 수 있도록 모두가 함께하는 시간을 가져주시기 바랍니다. 자세한 일정은 인사팀에서 별도로 안내드리겠습니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-08-20',
		last_modified_date: '2024-08-21',
		writer: '이민호',
	},
	{
		notice_id: 116,
		title: '보안 강화 정책 안내',
		content:
			'회사 보안 강화를 위해 새로운 보안 정책을 도입했습니다. 모든 직원은 정책을 숙지하시고, 업무 시 보안 절차를 철저히 준수해 주시기 바랍니다. 회사의 정보 보호를 위해 함께 노력해 주세요.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-08-01',
		last_modified_date: '2024-08-02',
		writer: '최유진',
	},
	{
		notice_id: 115,
		title: '사내 환경 보호 캠페인 공지',
		content:
			'EVEN에서는 환경 보호를 위한 사내 캠페인을 시작합니다. 모든 직원이 함께 동참하여 일상 속에서 환경을 생각하는 습관을 길러 주세요. 사내 게시판에서 캠페인 관련 안내를 확인해 주시기 바랍니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-07-25',
		last_modified_date: '2024-07-26',
		writer: '한지훈',
	},
	{
		notice_id: 114,
		title: '여름철 근무 시간 조정 안내',
		content:
			'여름철 무더위를 고려하여 근무 시간을 조정합니다. 모든 직원은 변경된 근무 시간표를 확인하시고, 불편함 없이 근무를 이어갈 수 있도록 협조해 주시기 바랍니다. 자세한 내용은 사내 포털에서 확인하세요.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-07-10',
		last_modified_date: '2024-07-11',
		writer: '이수영',
	},
	{
		notice_id: 113,
		title: '사내 복장 규정 변경 안내',
		content:
			'보다 쾌적한 근무 환경을 위해 사내 복장 규정이 변경되었습니다. 모든 직원은 새로운 규정을 숙지하시고, 근무 시 적절한 복장을 착용해 주시기 바랍니다. 새로운 규정은 8월부터 적용됩니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-06-30',
		last_modified_date: '2024-07-01',
		writer: '정하나',
	},
	{
		notice_id: 112,
		title: '사내 시설 정기 점검 안내',
		content:
			'EVEN 사내 시설의 정기 점검이 예정되어 있습니다. 점검 기간 동안 일부 시설의 사용이 제한될 수 있으니, 직원 여러분의 양해 부탁드립니다. 점검 관련 문의는 관리팀으로 연락해 주세요.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-06-15',
		last_modified_date: '2024-06-16',
		writer: '김성훈',
	},
	{
		notice_id: 111,
		title: '정기 휴가 신청 안내',
		content:
			'2024년 정기 휴가 신청이 시작되었습니다. 모든 직원은 사내 포털에서 휴가 신청 절차를 확인하시고, 기한 내에 신청해 주시기 바랍니다. 휴가 일정은 부서장과 사전에 협의해 주시기 바랍니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-06-01',
		last_modified_date: '2024-06-02',
		writer: '김나연',
	},
	{
		notice_id: 110,
		title: '임직원 대상 건강검진 안내',
		content:
			'모든 임직원을 대상으로 정기 건강검진을 실시합니다. 건강검진은 사내 복지의 일환으로 제공되며, 모든 직원은 필수로 참여해 주시기 바랍니다. 자세한 일정 및 준비 사항은 인사팀에서 안내드리겠습니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-05-25',
		last_modified_date: '2024-05-26',
		writer: '이정민',
	},
	{
		notice_id: 109,
		title: '신제품 아이디어 공모전 안내',
		content:
			'EVEN에서 신제품 아이디어 공모전을 개최합니다. 모든 직원이 창의적인 아이디어를 제출할 수 있는 기회이며, 우수 아이디어에는 특별한 혜택이 제공됩니다. 많은 관심과 참여 부탁드립니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-05-10',
		last_modified_date: '2024-05-11',
		writer: '조하늘',
	},
	{
		notice_id: 108,
		title: '상반기 성과 보고회 공지',
		content:
			'2024년 상반기 성과를 공유하고, 하반기 목표를 논의하기 위한 성과 보고회가 개최됩니다. 모든 직원은 참석하여 EVEN의 비전과 목표에 함께해 주세요. 세부 일정은 추가 공지 예정입니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-04-30',
		last_modified_date: '2024-05-01',
		writer: '홍승우',
	},
	{
		notice_id: 107,
		title: '사내 교육 프로그램 확대 안내',
		content:
			'EVEN에서는 직원 역량 강화를 위해 사내 교육 프로그램을 확대합니다. 다양한 분야의 교육을 통해 직원들이 성장할 수 있는 기회를 제공합니다. 교육 일정 및 신청 방법은 인사팀에서 안내드리겠습니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-04-10',
		last_modified_date: '2024-04-11',
		writer: '이하늘',
	},
	{
		notice_id: 106,
		title: '사내 동호회 모집 안내',
		content:
			'직원들의 다양한 취미와 관심사를 지원하기 위해 사내 동호회를 모집합니다. 모든 직원은 관심 있는 동호회에 가입하여 즐거운 시간을 보내시기 바랍니다. 신청 방법 및 세부 사항은 사내 포털에서 확인해 주세요.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2024-03-30',
		last_modified_date: '2024-03-31',
		writer: '한지우',
	},
	{
		notice_id: 105,
		title: 'EVEN 신제품 출시 공지',
		content:
			'건강을 중시하는 소비자들을 위해 EVEN에서 새롭게 선보이는 식물성 단백질 스낵 라인을 출시합니다. 이번 제품은 뛰어난 맛과 영양을 제공하며, 직원 여러분들을 위한 시식회가 다음 주에 예정되어 있습니다. EVEN의 최신 혁신을 가장 먼저 경험할 기회를 놓치지 마세요!',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2023-10-20',
		last_modified_date: '2023-10-22',
		writer: '김준호',
	},
	{
		notice_id: 104,
		title: '직장 내 안전 정책 업데이트 안내',
		content:
			'안전한 근무 환경을 유지하기 위해 EVEN은 직장 내 안전 정책을 강화하였습니다. 모든 직원은 새로운 안전 규정을 숙지하시고, 준수해 주시기 바랍니다. 이번 정책 업데이트는 여러분의 건강과 안전을 최우선으로 생각하는 EVEN의 약속입니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2023-09-15',
		last_modified_date: '2023-09-16',
		writer: '이수민',
	},
	{
		notice_id: 103,
		title: '2024년 하반기 직원 교육 일정 공지',
		content:
			'2023년 하반기 직무 교육 일정이 확정되었습니다. 모든 직원은 필수 교육과 선택 교육에 참여해 주시기 바라며, 교육을 통해 역량 강화를 목표로 하는 EVEN의 비전에 함께해 주세요. 자세한 일정 및 교육 내용은 사내 인트라넷에서 확인 가능합니다.',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2023-08-10',
		last_modified_date: '2023-08-12',
		writer: '박혜진',
	},
	{
		notice_id: 102,
		title: '여름 휴가 일정 공지',
		content:
			'EVEN은 여름 휴가 시즌을 맞아 직원들의 충분한 휴식을 보장하기 위해 각 부서별 휴가 일정을 공지합니다. 모든 직원들은 휴가 일정을 확인하고, 부서장과 협의하여 계획을 수립해 주시기 바랍니다. 편안하고 즐거운 휴가 보내시길 바랍니다!',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2023-07-05',
		last_modified_date: '2023-07-06',
		writer: '최민재',
	},
	{
		notice_id: 101,
		title: '2024년 상반기 목표 달성 축하',
		content:
			'모든 직원들의 노력 덕분에 2023년 상반기 목표를 성공적으로 달성할 수 있었습니다. EVEN은 여러분의 헌신에 감사드리며, 하반기에도 더욱 도약할 수 있도록 최선을 다하겠습니다. 앞으로도 함께 만들어갈 EVEN의 성장을 기대해 주세요!',
		image_url: 'https://picsum.photos/600/800',
		created_date: '2023-06-30',
		last_modified_date: '2023-07-01',
		writer: '정다은',
	},
];

export default noticeData;
