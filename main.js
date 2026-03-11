// 테마 전환 로직 (모든 페이지 공통)
const themeBtn = document.getElementById('theme-btn');

function updateThemeUI(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '☀️'; 
    } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.textContent = '🌙'; 
    }
}

const savedTheme = localStorage.getItem('theme');
const initialIsDark = savedTheme === 'dark';
updateThemeUI(initialIsDark);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        updateThemeUI(isDarkNow);
    });
}

// 메뉴 추천 데이터 (index.html 전용)
const dinnerMenus = [
    { ko: { name: "비빔밥", desc: "각종 나물과 고추장의 환상적인 조화!" }, icon: "🍱" },
    { ko: { name: "김치찌개", desc: "한국인의 소울푸드, 깊은 맛의 김치찌개" }, icon: "🥘" },
    { ko: { name: "된장찌개", desc: "구수한 된장과 보들보들한 두부의 만남" }, icon: "🍲" },
    { ko: { name: "불고기", desc: "달콤 짭조름한 양념이 밴 부드러운 소고기" }, icon: "🥩" },
    { ko: { name: "삼겹살", desc: "지글지글 구워진 삼겹살에 쌈 한 입!" }, icon: "🥓" },
    { ko: { name: "제육볶음", desc: "매콤달콤한 양념으로 볶아낸 돼지고기" }, icon: "🍛" },
    { ko: { name: "떡볶이", desc: "매콤한 양념과 쫄깃한 떡의 국민 음식" }, icon: "🍢" },
    { ko: { name: "돈가스", desc: "바삭한 튀김옷과 두툼한 고기의 정석" }, icon: "🍱" },
    { ko: { name: "스시", desc: "신선한 해산물과 밥의 정교한 만남" }, icon: "🍣" },
    { ko: { name: "라멘", desc: "진한 국물과 쫄깃한 면발의 일본식 라면" }, icon: "🍜" },
    { ko: { name: "짜장면", desc: "달콤한 춘장 소스에 비벼 먹는 중식의 기본" }, icon: "🍝" },
    { ko: { name: "짬뽕", desc: "얼큰하고 시원한 국물의 해물 짬뽕" }, icon: "🍜" },
    { ko: { name: "스테이크", desc: "풍부한 육즙과 깊은 풍미의 스테이크" }, icon: "🥩" },
    { ko: { name: "파스타", desc: "취향에 맞는 소스로 즐기는 이탈리안 면 요리" }, icon: "🍝" },
    { ko: { name: "피자", desc: "고소한 치즈와 풍성한 토핑의 완벽한 조화" }, icon: "🍕" },
    { ko: { name: "치킨", desc: "오늘 저녁은 치맥 어떠세요? 겉바속촉 치킨" }, icon: "🍗" },
    { ko: { name: "햄버거", desc: "한 입 가득 베어 물고 싶은 든든한 수제 버거" }, icon: "🍔" },
    { ko: { name: "쌀국수", desc: "담백하고 시원한 국물의 베트남식 쌀국수" }, icon: "🍲" },
    { ko: { name: "타코", desc: "다양한 재료를 또띠아에 싸 먹는 멕시코 요리" }, icon: "🌮" },
    { ko: { name: "샌드위치", desc: "간편하면서도 영양 가득한 샌드위치" }, icon: "🥪" }
];

const recommendBtn = document.getElementById('recommend-btn');
if (recommendBtn) {
    const resultContainer = document.getElementById('result-container');
    const menuIcon = document.getElementById('menu-icon');
    const menuName = document.getElementById('menu-name');
    const menuDesc = document.getElementById('menu-desc');

    let isRolling = false;

    recommendBtn.addEventListener('click', () => {
        if (isRolling) return;
        isRolling = true;
        recommendBtn.disabled = true;
        recommendBtn.textContent = "추천 중...";

        let counter = 0;
        const rollInterval = setInterval(() => {
            const temp = dinnerMenus[Math.floor(Math.random() * dinnerMenus.length)];
            menuIcon.textContent = temp.icon;
            menuName.textContent = temp.ko.name;
            menuDesc.textContent = "무엇이 나올까요?";
            counter++;
            if (counter > 12) {
                clearInterval(rollInterval);
                const final = dinnerMenus[Math.floor(Math.random() * dinnerMenus.length)];
                menuIcon.textContent = final.icon;
                menuName.textContent = final.ko.name;
                menuDesc.textContent = final.ko.desc;
                recommendBtn.textContent = "다시 추천받기";
                recommendBtn.disabled = false;
                isRolling = false;
            }
        }, 80);
    });
}
