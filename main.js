document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const numbersDisplay = document.getElementById('numbers-display');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    // SNS Share buttons
    const shareKakao = document.getElementById('share-kakao');
    const shareTwitter = document.getElementById('share-twitter');
    const shareFacebook = document.getElementById('share-facebook');
    const shareCopy = document.getElementById('share-copy');

    // Initialize Kakao SDK (Replace with your own JavaScript Key)
    if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init('870509a259972365446067b8482463e2'); // Example key, user should replace this
    }

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

    // SNS Share logic
    const siteUrl = window.location.href;
    const siteTitle = '오늘의 행운 로또 번호 생성기!';

    shareKakao.addEventListener('click', () => {
        if (window.Kakao) {
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: siteTitle,
                    description: '과연 이번 주 당첨 번호는? 지금 바로 번호를 생성해보세요!',
                    imageUrl: 'https://images.unsplash.com/photo-1596838132731-9a9972828b12?auto=format&fit=crop&q=80&w=1200',
                    link: {
                        mobileWebUrl: siteUrl,
                        webUrl: siteUrl,
                    },
                },
                buttons: [
                    {
                        title: '번호 생성하러 가기',
                        link: {
                            mobileWebUrl: siteUrl,
                            webUrl: siteUrl,
                        },
                    },
                ],
            });
        }
    });

    shareTwitter.addEventListener('click', () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(siteTitle)}&url=${encodeURIComponent(siteUrl)}`;
        window.open(url, '_blank');
    });

    shareFacebook.addEventListener('click', () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
        window.open(url, '_blank');
    });

    shareCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(siteUrl).then(() => {
            alert('링크가 복사되었습니다!');
        }).catch(err => {
            console.error('링크 복사 실패:', err);
        });
    });
});
