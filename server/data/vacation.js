const vacationData = [
	{
		requestId: 'request-1',
		requestType: '연차',
		userId: 'g-dragon123',
		username: '이브이',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '🏝️ 즐거운 휴가를 신청해 보겠습니다~ 😆',
		body: '꿈에 지드래곤이 나왔습니다. 용 꿈 입니다. 좋은 징조가 느껴집니다. 휴가 신청합니다!!! 🐉',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-2',
		requestType: '연차',
		userId: 'sad123456',
		username: '김브이',
		job: '보조',
		team: '요리연구소',
		image: null,
		title: '부모님 생신 떄문에 연차 요청드립니다.',
		body: '고향에 내려가야 합니다.',
		createdDate: '2024-10-11',
		startDate: '2024-10-14',
		endDate: '2024-10-14',
	},
	{
		requestId: 'request-3',
		requestType: '조퇴',
		userId: 'sasdasf456',
		username: '이브이',
		job: '서빙',
		team: '요리연구소',
		image: null,
		title: '병원에 가봐야할거 같아서 조퇴 신청 합니다.',
		body: '식은땀이 나고 열이 펄펄 납니다.',
		createdDate: '2024-09-25',
		startDate: '2024-09-25',
		endDate: '2024-09-25',
	},
	{
		requestId: 'request-4',
		requestType: '조퇴',
		userId: 'dsfsgfdsf001',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '조퇴하고 싶은 날이 가끔 있습니다.',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-5',
		requestType: '반차',
		userId: 'dsfsgfdsf002',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '법원에 가야해서 반차 신청합니다.',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-6',
		requestType: '반차',
		userId: 'dsfsgfdsf003',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-7',
		requestType: '연차',
		userId: 'dsfsgfdsf004',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-8',
		requestType: '기타',
		userId: 'dsfsgfdsf005',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '기타 예시가 뭐가 있을까요?',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-9',
		requestType: '조퇴',
		userId: 'dsfsgfdsf006',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-10',
		requestType: '기타',
		userId: 'dsfsgfdsf007',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-11',
		requestType: '반차',
		userId: 'dsfsgfdsf008',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-12',
		requestType: '연차',
		userId: 'dsfsgfdsf009',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-13',
		requestType: '연차',
		userId: 'dsfsgfdsf010',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-14',
		requestType: '연차',
		userId: 'dsfsgfdsf011',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-15',
		requestType: '연차',
		userId: 'dsfsgfdsf012',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-16',
		requestType: '연차',
		userId: 'dsfsgfdsf013',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
	{
		requestId: 'request-17',
		requestType: '연차',
		userId: 'dsfsgfdsf014',
		username: '홍길동',
		job: '셰프',
		team: '요리연구소',
		image: null,
		title: '제목',
		body: '내용',
		createdDate: '2024-09-25',
		startDate: '2024-10-30',
		endDate: '2024-10-31',
	},
];

export default vacationData;
