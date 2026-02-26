
const generateBtn = document.getElementById('generate-btn');
const themeBtn = document.getElementById('theme-btn');
const numberElements = document.querySelectorAll('.number');

// Theme toggle logic
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeButton(currentTheme);

themeBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeButton(theme);
});

function updateThemeButton(theme) {
    themeBtn.textContent = theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

function displayNumbers(numbers) {
    numberElements.forEach((element, index) => {
        element.textContent = numbers[index];
        element.style.backgroundColor = getNumberColor(numbers[index]);
    });
}

function getNumberColor(number) {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    return colors[number % colors.length];
}

function generateAndDisplayNumbers() {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initial generation
generateAndDisplayNumbers();
