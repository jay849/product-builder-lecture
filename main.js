const dinnerMenus = [
    { name: "비빔밥", icon: "🍱", desc: "각종 나물과 고추장의 환상적인 조화!" },
    { name: "김치찌개", icon: "🥘", desc: "한국인의 소울푸드, 깊은 맛의 김치찌개" },
    { name: "된장찌개", icon: "🍲", desc: "구수한 된장과 보들보들한 두부의 만남" },
    { name: "불고기", icon: "🥩", desc: "달콤 짭조름한 양념이 밴 부드러운 소고기" },
    { name: "삼겹살", icon: "🥓", desc: "지글지글 구워진 삼겹살에 쌈 한 입!" },
    { name: "제육볶음", icon: "🍛", desc: "매콤달콤한 양념으로 볶아낸 돼지고기" },
    { name: "떡볶이", icon: "🍢", desc: "매콤한 양념과 쫄깃한 떡의 국민 간식/식사" },
    { name: "돈가스", icon: "🍱", desc: "바삭한 튀김옷과 두툼한 고기의 정석" },
    { name: "스시", icon: "🍣", desc: "신선한 해산물과 밥의 정교한 만남" },
    { name: "라멘", icon: "🍜", desc: "진한 국물과 쫄깃한 면발의 일본식 라면" },
    { name: "짜장면", icon: "🍝", desc: "달콤한 춘장 소스에 비벼 먹는 중식의 기본" },
    { name: "짬뽕", icon: "🍜", desc: "얼큰하고 시원한 국물의 해물 짬뽕" },
    { name: "스테이크", icon: "🥩", desc: "풍부한 육즙과 깊은 풍미의 스테이크" },
    { name: "파스타", icon: "🍝", desc: "취향에 맞는 소스로 즐기는 이탈리안 면 요리" },
    { name: "피자", icon: "🍕", desc: "고소한 치즈와 풍성한 토핑의 완벽한 조화" },
    { name: "치킨", icon: "🍗", desc: "오늘 저녁은 치맥 어떠세요? 겉바속촉 치킨" },
    { name: "햄버거", icon: "🍔", desc: "한 입 가득 베어 물고 싶은 든든한 수제 버거" },
    { name: "쌀국수", icon: "🍲", desc: "담백하고 시원한 국물의 베트남식 쌀국수" },
    { name: "타코", icon: "🌮", desc: "다양한 재료를 또띠아에 싸 먹는 멕시코 요리" },
    { name: "샌드위치", icon: "🥪", desc: "간편하면서도 영양 가득한 샌드위치" }
];

const recommendBtn = document.getElementById('recommend-btn');
const resultContainer = document.getElementById('result-container');
const menuIcon = document.getElementById('menu-icon');
const menuName = document.getElementById('menu-name');
const menuDesc = document.getElementById('menu-desc');
const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');

// Translation Dictionary
const i18n = {
    ko: {
        title: "🍴 오늘 뭐 먹지?",
        subtitle: "결정 장애를 위한 저녁 메뉴 추천 서비스",
        initialName: "메뉴를 추천해 드릴까요?",
        initialDesc: "버튼을 눌러 저녁 메뉴를 정해 보세요!",
        button: "오늘의 메뉴 추천받기!",
        rolling: "추천 중...",
        again: "다시 추천받기!",
        themeDark: "다크 모드",
        themeLight: "라이트 모드",
        lang: "English"
    },
    en: {
        title: "🍴 What to Eat Today?",
        subtitle: "Dinner recommendation for the indecisive",
        initialName: "Ready to get a recommendation?",
        initialDesc: "Press the button to decide your dinner!",
        button: "Get Today's Menu!",
        rolling: "Recommending...",
        again: "Get Another One!",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        lang: "한국어"
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.getElementById('main-title').textContent = i18n[lang].title;
    document.getElementById('main-subtitle').textContent = i18n[lang].subtitle;
    langBtn.textContent = i18n[lang].lang;
    
    // Only update result if not rolling and it's the initial state
    if (!isRolling && menuName.textContent === i18n[lang === 'ko' ? 'en' : 'ko'].initialName) {
        menuName.textContent = i18n[lang].initialName;
        menuDesc.textContent = i18n[lang].initialDesc;
    }
    
    if (!isRolling) {
        recommendBtn.textContent = (recommendBtn.textContent.includes('다시') || recommendBtn.textContent.includes('Another')) 
            ? i18n[lang].again 
            : i18n[lang].button;
    }

    // Update theme button text
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? i18n[lang].themeLight : i18n[lang].themeDark;
}

langBtn.addEventListener('click', () => {
    updateLanguage(currentLang === 'ko' ? 'en' : 'ko');
});

// Theme toggle logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    updateLanguage(currentLang); // Refresh text
});

// Initial load
updateLanguage(currentLang);

let isRolling = false;

recommendBtn.addEventListener('click', () => {
    if (isRolling) return;

    isRolling = true;
    recommendBtn.textContent = i18n[currentLang].rolling;
    recommendBtn.disabled = true;

    let counter = 0;
    const rollInterval = setInterval(() => {
        const tempIndex = Math.floor(Math.random() * dinnerMenus.length);
        const tempMenu = dinnerMenus[tempIndex];
        
        menuIcon.textContent = tempMenu.icon;
        menuName.textContent = tempMenu.name;
        menuDesc.textContent = currentLang === 'ko' ? "어디 보자... 무엇이 좋을까요?" : "Let's see... What would be good?";
        
        counter++;
        if (counter > 15) {
            clearInterval(rollInterval);
            finishSelection();
        }
    }, 80);
});

function finishSelection() {
    const finalIndex = Math.floor(Math.random() * dinnerMenus.length);
    const finalMenu = dinnerMenus[finalIndex];

    menuIcon.textContent = finalMenu.icon;
    menuName.textContent = finalMenu.name;
    menuDesc.textContent = finalMenu.desc;

    // Animation effects
    resultContainer.classList.add('active', 'pop-animation');
    
    // Reset after some time
    setTimeout(() => {
        resultContainer.classList.remove('pop-animation');
    }, 400);

    recommendBtn.textContent = i18n[currentLang].again;
    recommendBtn.disabled = false;
    isRolling = false;
}
