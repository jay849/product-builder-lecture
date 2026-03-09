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

// Theme toggle logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌓';
    }
    localStorage.setItem('theme', theme);
});

let isRolling = false;

recommendBtn.addEventListener('click', () => {
    if (isRolling) return;

    isRolling = true;
    recommendBtn.textContent = "추천 중...";
    recommendBtn.disabled = true;

    let counter = 0;
    const rollInterval = setInterval(() => {
        const tempIndex = Math.floor(Math.random() * dinnerMenus.length);
        const tempMenu = dinnerMenus[tempIndex];
        
        menuIcon.textContent = tempMenu.icon;
        menuName.textContent = tempMenu.name;
        menuDesc.textContent = "어디 보자... 무엇이 좋을까요?";
        
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

    recommendBtn.textContent = "다시 추천받기!";
    recommendBtn.disabled = false;
    isRolling = false;
}
