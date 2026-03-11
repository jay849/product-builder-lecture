const dinnerMenus = [
    { 
        ko: { name: "비빔밥", desc: "각종 나물과 고추장의 환상적인 조화!" },
        en: { name: "Bibimbap", desc: "Fantastic harmony of various vegetables and red pepper paste!" },
        icon: "🍱"
    },
    { 
        ko: { name: "김치찌개", desc: "한국인의 소울푸드, 깊은 맛의 김치찌개" },
        en: { name: "Kimchi Stew", desc: "Korean soul food, deep-flavored Kimchi-jjigae" },
        icon: "🥘"
    },
    { 
        ko: { name: "된장찌개", desc: "구수한 된장과 보들보들한 두부의 만남" },
        en: { name: "Soybean Paste Stew", desc: "Savory soybean paste with soft tofu" },
        icon: "🍲"
    },
    { 
        ko: { name: "불고기", desc: "달콤 짭조름한 양념이 밴 부드러운 소고기" },
        en: { name: "Bulgogi", desc: "Tender beef marinated in sweet and savory sauce" },
        icon: "🥩"
    },
    { 
        ko: { name: "삼겹살", desc: "지글지글 구워진 삼겹살에 쌈 한 입!" },
        en: { name: "Pork Belly", desc: "Sizzling grilled pork belly with lettuce wrap!" },
        icon: "🥓"
    },
    { 
        ko: { name: "제육볶음", desc: "매콤달콤한 양념으로 볶아낸 돼지고기" },
        en: { name: "Spicy Stir-fried Pork", desc: "Pork stir-fried with spicy and sweet sauce" },
        icon: "🍛"
    },
    { 
        ko: { name: "떡볶이", desc: "매콤한 양념과 쫄깃한 떡의 국민 간식/식사" },
        en: { name: "Tteokbokki", desc: "Popular spicy rice cakes with a chewy texture" },
        icon: "🍢"
    },
    { 
        ko: { name: "돈가스", desc: "바삭한 튀김옷과 두툼한 고기의 정석" },
        en: { name: "Pork Cutlet", desc: "Classic crispy breaded pork cutlet" },
        icon: "🍱"
    },
    { 
        ko: { name: "스시", desc: "신선한 해산물과 밥의 정교한 만남" },
        en: { name: "Sushi", desc: "Delicate combination of fresh seafood and rice" },
        icon: "🍣"
    },
    { 
        ko: { name: "라멘", desc: "진한 국물과 쫄깃한 면발의 일본식 라면" },
        en: { name: "Ramen", desc: "Japanese noodles with rich broth and chewy noodles" },
        icon: "🍜"
    },
    { 
        ko: { name: "짜장면", desc: "달콤한 춘장 소스에 비벼 먹는 중식의 기본" },
        en: { name: "Jajangmyeon", desc: "Noodles in sweet black bean sauce" },
        icon: "🍝"
    },
    { 
        ko: { name: "짬뽕", desc: "얼큰하고 시원한 국물의 해물 짬뽕" },
        en: { name: "Jjamppong", desc: "Spicy seafood noodle soup" },
        icon: "🍜"
    },
    { 
        ko: { name: "스테이크", desc: "풍부한 육즙과 깊은 풍미의 스테이크" },
        en: { name: "Steak", desc: "Juicy steak with rich flavor" },
        icon: "🥩"
    },
    { 
        ko: { name: "파스타", desc: "취향에 맞는 소스로 즐기는 이탈리안 면 요리" },
        en: { name: "Pasta", desc: "Italian noodle dish with your favorite sauce" },
        icon: "🍝"
    },
    { 
        ko: { name: "피자", desc: "고소한 치즈와 풍성한 토핑의 완벽한 조화" },
        en: { name: "Pizza", desc: "Perfect harmony of savory cheese and rich toppings" },
        icon: "🍕"
    },
    { 
        ko: { name: "치킨", desc: "오늘 저녁은 치맥 어떠세요? 겉바속촉 치킨" },
        en: { name: "Fried Chicken", desc: "How about chicken and beer tonight? Crispy outside, juicy inside" },
        icon: "🍗"
    },
    { 
        ko: { name: "햄버거", desc: "한 입 가득 베어 물고 싶은 든든한 수제 버거" },
        en: { name: "Hamburger", desc: "Hearty handmade burger you'll want to take a big bite of" },
        icon: "🍔"
    },
    { 
        ko: { name: "쌀국수", desc: "담백하고 시원한 국물의 베트남식 쌀국수" },
        en: { name: "Pho", desc: "Vietnamese noodle soup with clean and refreshing broth" },
        icon: "🍲"
    },
    { 
        ko: { name: "타코", desc: "다양한 재료를 또띠아에 싸 먹는 멕시코 요리" },
        en: { name: "Tacos", desc: "Mexican dish with various ingredients wrapped in tortillas" },
        icon: "🌮"
    },
    { 
        ko: { name: "샌드위치", desc: "간편하면서도 영양 가득한 샌드위치" },
        en: { name: "Sandwich", desc: "Simple yet nutritious sandwich" },
        icon: "🥪"
    }
];

const recommendBtn = document.getElementById('recommend-btn');
const resultContainer = document.getElementById('result-container');
const menuIcon = document.getElementById('menu-icon');
const menuName = document.getElementById('menu-name');
const menuDesc = document.getElementById('menu-desc');
const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');

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
        lang: "English",
        contactTitle: "🤝 제휴 문의",
        labelEmail: "이메일 주소",
        placeholderEmail: "example@email.com",
        labelMessage: "문의 내용",
        placeholderMessage: "문의 내용을 입력해 주세요.",
        contactSubmit: "문의 보내기",
        footer: "&copy; 2026 저녁 메뉴 추천기",
        rollingDesc: "어디 보자... 무엇이 좋을까요?"
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
        lang: "한국어",
        contactTitle: "🤝 Contact Us",
        labelEmail: "Email Address",
        placeholderEmail: "example@email.com",
        labelMessage: "Message",
        placeholderMessage: "Enter your message here.",
        contactSubmit: "Send Message",
        footer: "&copy; 2026 Dinner Recommender",
        rollingDesc: "Let's see... What would be good?"
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';
let lastSelectedMenu = null;
let isRolling = false;

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.getElementById('main-title').textContent = i18n[lang].title;
    document.getElementById('main-subtitle').textContent = i18n[lang].subtitle;
    
    langBtn.textContent = i18n[lang].lang;
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? i18n[lang].themeLight : i18n[lang].themeDark;
    
    if (!isRolling) {
        if (lastSelectedMenu) {
            menuName.textContent = lastSelectedMenu[lang].name;
            menuDesc.textContent = lastSelectedMenu[lang].desc;
        } else {
            menuName.textContent = i18n[lang].initialName;
            menuDesc.textContent = i18n[lang].initialDesc;
        }
    }
    
    if (!isRolling) {
        recommendBtn.textContent = lastSelectedMenu ? i18n[lang].again : i18n[lang].button;
    } else {
        recommendBtn.textContent = i18n[lang].rolling;
    }

    document.getElementById('contact-title').textContent = i18n[lang].contactTitle;
    document.getElementById('label-email').textContent = i18n[lang].labelEmail;
    document.getElementById('email').placeholder = i18n[lang].placeholderEmail;
    document.getElementById('label-message').textContent = i18n[lang].labelMessage;
    document.getElementById('message').placeholder = i18n[lang].placeholderMessage;
    document.getElementById('contact-submit').textContent = i18n[lang].contactSubmit;

    document.getElementById('footer-text').innerHTML = i18n[lang].footer;
}

langBtn.addEventListener('click', () => {
    updateLanguage(currentLang === 'ko' ? 'en' : 'ko');
});

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
    updateLanguage(currentLang); 
});

updateLanguage(currentLang);

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
        menuName.textContent = tempMenu[currentLang].name;
        menuDesc.textContent = i18n[currentLang].rollingDesc;
        
        counter++;
        if (counter > 15) {
            clearInterval(rollInterval);
            finishSelection();
        }
    }, 80);
});

function finishSelection() {
    const finalIndex = Math.floor(Math.random() * dinnerMenus.length);
    lastSelectedMenu = dinnerMenus[finalIndex];

    menuIcon.textContent = lastSelectedMenu.icon;
    menuName.textContent = lastSelectedMenu[currentLang].name;
    menuDesc.textContent = lastSelectedMenu[currentLang].desc;

    resultContainer.classList.add('active', 'pop-animation');
    
    setTimeout(() => {
        resultContainer.classList.remove('pop-animation');
    }, 400);

    recommendBtn.textContent = i18n[currentLang].again;
    recommendBtn.disabled = false;
    isRolling = false;
}
