const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); // 비밀번호 해시화를 위한 bcrypt
const app = express();

app.use(express.json());
app.use(express.static('images')); // 이미지 정적 파일 서빙
const upload = multer({ dest: 'images/' }); // 업로드할 경로 설정

let users = [];  // 회원 정보 저장용
let posts = [];  // 게시글 저장용

// 회원가입 API
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  
  if (existingUser) {
    return res.json({ success: false, message: '이미 존재하는 아이디입니다.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ success: true, message: '회원가입 완료' });
});

// 로그인 API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true, message: '로그인 성공', username });
  } else {
    res.json({ success: false, message: '로그인 실패' });
  }
});

// 게시물 작성 API
app.post('/api/posts', upload.single('image'), (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    username: req.body.username, // 로그인한 사용자 아이디
    image: req.file ? `/${req.file.filename}` : null, // 이미지 경로
  };
  posts.push(post);
  res.json({ success: true, message: '게시물 저장 완료' });
});

// 게시물 리스트 가져오기 API
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
