const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 회원가입 API
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    // 사용자 등록 로직 구현 (예: 데이터베이스에 저장)
    // 성공 시
    res.json({ success: true });
    // 실패 시
    // res.status(400).json({ success: false, message: 'Error message' });
});

// 로그인 API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // 사용자 인증 로직 구현
    // 성공 시
    res.json({ success: true });
    // 실패 시
    // res.status(401).json({ success: false, message: 'Error message' });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
