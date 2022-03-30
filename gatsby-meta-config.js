module.exports = {
  title: `Hwajin's Dev Blog`,
  description: `Hwajin's Dev Blog`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://github.com/HwajinLee3114/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      src: `https://utteranc.es/client.js`,
      repo: `HwajinLee3114/hwajin-comment`,
      'issue-term': `pathname`,
      theme: `github-light`,
      crossorigin: `anonymous`,
      async: true,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `이화진`,
    bio: {
      role: `개발자`,
      description: ['꾸준히 발전해 나가는', '능동적으로 일하는', '이로운 것을 만드는'],
      thumbnail: 'hwajin.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/HwajinLee3114`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `jamong@kakao.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.05 ~',
        activity: '퓨쳐솔루션 | Web FullStack Developer',
        links: {
          post: '',
        },
      },
      {
        date: '2021.02 ~ 2021.04',
        activity: '아크데이타 | C++ SW Developer (인턴)',
        links: {
          post: '',
        },
      },
      {
        date: '2020.07 ~ 2021.01',
        activity: '디지털 컨버전스 기반 Java 개발자 양성 과정 수료 / 예담직업전문학교',
        links: {
          post: '',
        },
      },
      {
        date: '2018.11 ~ 2020.01',
        activity: '에이투텍 | Web Backend Developer',
        links: {
          post: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '운동 기록 관리 웹앱',
        description:
          '다양한 운동에 대한 기록 후 캘린더를 통해 나의 운동 기록을 확인할 수 있고, 차트로 체력 정보 변화를 효과적으로 확인할 수 있습니다. 그리고 운동 별 커뮤니티를 통해 여러 사용자들과 소통하며 많은 정보 를 얻을 수 있습니다. 또한 설문조사를 진행할 경우 입력한 정보를 기반으로 운동을 추천받을 수 있습 니다. 다양한 종목들 중에서 운동하고자 하는 종목을 북마크 하여 별도로 조회할 수 있습니다.',
        techStack: ['Spring', 'Java', 'Git', 'React', 'Javascript', 'MySQL', 'Jenkins'],
      },
      {
        title: '스포츠 레슨 관리 앱(코치용)',
        description:
          '다양한 스포츠의 레슨과 레슨을 수강하는 회원을 관리하는 앱을 개발하였습니다. 편리한 레슨 관리와 개인 또는 팀 코치들의 시설 및 개개인의 정보 관리에 용이합니다. 회원들이 수강 한 레슨을 캘린더를 통해 효과적으로 일정 관리를 할 수 있고 레슨 종료 후 코멘트 작성도 가능합니다. 그리고 차트를 이용해 한눈에 월별, 주별 매출을 조회할 수 있어 매출 분석에 효과적으로 구현되었습니다.',
        techStack: ['Spring', 'Java', 'Git', 'JSP', 'MySQL'],
      },
      {
        title: '분양정보를 확인할 수 있는 웹앱',
        description:
          '전국 분양정보를 게시판 형태 및 지도에 마커로 확인할 수 있고, 구직 정보를 확인 해 간편하게 이력서 및 서류 제출을 할 수 있습니다. 그리고 현장 별 정보를 입력하여 견적서를 조회할 수 있고 현장 직급 별 수수료를 계산할 수 있는 웹앱을 개발하였습니다.',
        techStack: ['Spring', 'Java', 'Git', 'JSP', 'MySQL'],
      },
      {
        title: 'VR 계열사 관리 사이트',
        description:
          '사용자 사이트에서 이용할 수 있는 VR 및 영상 콘텐츠 및 서비스 제공 계열사를 관리하는 사 이트 유지보수 및 2차 기능 개발을 진행하였습니다. 콘텐츠, 검색 키워드, 앱 버전 관리 페이지를 맡아 서 구현하였고 서버 배포 및 개발 문서를 작성하였습니다.',
        techStack: ['Spring', 'Java', '전자정부프레임워크', 'JSP', 'PostgreSQL'],
      },
    ],
  },
};
