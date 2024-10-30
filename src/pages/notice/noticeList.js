const noticeData = [
	{
		notice_id: 1,
		index: 0,
		title: '신제품 출시: 유기농 스낵 시리즈',
		content:
			'저희는 100% 유기농 재료로 만든 새로운 유기농 스낵 시리즈를 출시하게 되어 기쁩니다. 지금 모든 매장에서 만나보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 2,
		index: 1,
		title: '연말 세일: 최대 30% 할인',
		content:
			'연말 세일이 시작되었습니다! 10월 20일부터 11월 5일까지 모든 제품 최대 30% 할인 혜택을 누리세요. 온라인 또는 매장에서 확인해보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 3,
		index: 2,
		title: '제품 리콜 공지',
		content:
			'포장 결함으로 인해 X123번 배치의 아몬드 우유를 리콜합니다. 해당 배치를 구매하신 분은 가까운 매장에 방문하셔서 전액 환불받으시기 바랍니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 4,
		index: 3,
		title: '시티 센터 매장 오픈',
		content:
			'시티 센터 몰에 새로운 매장이 오픈하게 되어 매우 기쁩니다. 11월 10일 오픈 이벤트에 참여하시고, 특별 할인과 무료 샘플을 받아가세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 5,
		index: 4,
		title: '지역 농부들과의 새로운 파트너십',
		content:
			'지역 농부들과의 새로운 파트너십을 발표하게 되어 기쁩니다. 이를 통해 신선하고 지속 가능한 농산물을 고객님들께 제공할 수 있게 되었습니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 6,
		index: 5,
		title: '비건 디저트 라인 출시',
		content:
			'새로운 비건 디저트 라인에서는 케이크, 쿠키, 아이스크림 등 식물성 재료로 만든 유제품 대체 상품을 제공합니다. 12월 1일부터 모든 매장에서 만나보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 7,
		index: 6,
		title: '연말 휴무 시간 변경 안내',
		content:
			'연말 기간 동안 매장 운영 시간이 변경됩니다. 방문 전 홈페이지에서 변경된 일정을 확인해 주세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 8,
		index: 7,
		title: '2024년 지속 가능성 보고서 발표',
		content:
			'2024년 지속 가능성 보고서에서는 폐기물 감소, 에너지 효율성 증가, 윤리적 공급망 관리에 대한 노력을 강조하고 있습니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 9,
		index: 8,
		title: '채용 공고: 저희 팀에 합류하세요',
		content:
			'저희는 다양한 직무에서 새로운 인재를 채용하고 있습니다. 매장 및 본사에서 흥미로운 커리어 기회를 확인하세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 10,
		index: 9,
		title: '고객 설문 조사: 소중한 의견을 들려주세요',
		content:
			'고객 만족 설문 조사에 참여하시고 저희가 더 나은 서비스를 제공할 수 있도록 도와주세요. 참여하신 모든 분들께는 할인 쿠폰을 드립니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 11,
		index: 10,
		title: '특별 행사: 셰프와의 만남',
		content:
			'저희의 수석 셰프가 새로운 레시피를 시연하는 특별 행사에 초대합니다. 한정된 자리이므로 지금 바로 등록하세요!',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 12,
		index: 11,
		title: '유기농 제품 라인 확장',
		content:
			'새로운 유제품 대체 및 글루텐 프리 옵션을 포함하여 유기농 제품 라인을 확장했습니다. 가까운 매장에서 새로운 상품을 만나보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 13,
		index: 12,
		title: '푸드 뱅크와의 협력',
		content:
			'저희는 지역 푸드 뱅크와의 협력을 통해 잉여 식품을 기부하고, 지역 사회의 어려운 이웃들을 지원하게 되어 자랑스럽습니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 14,
		index: 13,
		title: '가격 조정 공지',
		content:
			'원가 상승으로 인해 2025년 1월부터 일부 제품의 가격이 조정될 예정입니다. 고객님의 이해와 지속적인 성원에 감사드립니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 15,
		index: 14,
		title: '온라인 주문 시스템 업데이트',
		content:
			'저희 온라인 주문 시스템에 새로운 기능이 추가되었습니다. 예약 배송 및 주문 맞춤화 기능을 지금 웹사이트에서 이용해보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 16,
		index: 15,
		title: '10월의 직원: 2024년 10월',
		content:
			'2024년 10월의 직원으로 선정된 사라 리 씨에게 축하를 전합니다. 그녀의 헌신과 노력은 우리 모두에게 영감을 줍니다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 17,
		index: 16,
		title: '새로운 글루텐 프리 제품',
		content:
			'새로운 글루텐 프리 제품으로 빵, 파스타, 스낵이 출시되었습니다. 가까운 매장에서 이 제품들을 만나보세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 18,
		index: 17,
		title: '새로운 멤버십 프로그램 출시',
		content:
			'새로운 멤버십 프로그램을 통해 독점 할인과 프로모션의 조기 접근 혜택을 제공합니다. 지금 가입하고 포인트 적립을 시작하세요.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 19,
		index: 18,
		title: '커뮤니티 클린업 이벤트',
		content:
			'11월 15일에 커뮤니티 클린업 이벤트에 참여하세요. 함께 모여 우리의 이웃을 깨끗하고 푸르게 가꿔봅시다.',
		image_url: 'https://picsum.photos/600/800',
	},
	{
		notice_id: 20,
		index: 19,
		title: 'COVID-19 안전 수칙 업데이트',
		content:
			'고객님과 직원들의 건강과 안전을 위해 COVID-19 안전 수칙을 업데이트했습니다. 자세한 사항은 홈페이지에서 확인해 주세요.',
		image_url: 'https://picsum.photos/600/800',
	},
];

export default noticeData;
