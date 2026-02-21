document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const numbersDisplay = document.getElementById('numbers-display');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀️';
    }

    // Theme toggle functionality
    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        themeToggleButton.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    generateButton.addEventListener('click', () => {
        generateLottoNumbers();
    });

    function generateLottoNumbers() {
        numbersDisplay.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.className = 'number-ball';
                ball.textContent = number;
                ball.style.backgroundColor = getBallColor(number);
                numbersDisplay.appendChild(ball);
            }, index * 200); // Stagger the appearance of the balls
        });
    }

    function getBallColor(number) {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa';     // Gray
        return '#b0d840';     // Green
    }
});
