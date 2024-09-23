// 클라이언트 측 JavaScript (app.js)

// 회원가입 처리
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        } else {
            const result = await response.json();
            // 성공 처리
            alert('회원가입 성공!');
            window.location.href = 'login.html'; // 로그인 페이지로 리디렉션
        }
    } catch (error) {
        console.error('Error:', error);
        alert('예기치 않은 오류가 발생했습니다.');
    }
});

// 로그인 처리
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        } else {
            const result = await response.json();
            // 성공 처리
            alert('로그인 성공!');
            window.location.href = 'home.html'; // 홈 페이지로 리디렉션
        }
    } catch (error) {
        console.error('Error:', error);
        alert('예기치 않은 오류가 발생했습니다.');
    }
});
