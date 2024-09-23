document.addEventListener("DOMContentLoaded", function() {
  loadPosts();
});

// 게시글 로드
function loadPosts() {
  fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = '';
      posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" alt="게시물 이미지" style="max-width: 100%;">` : ''}
          <p>작성자: ${post.username}</p>
        `;
        postList.appendChild(li);
      });
    });
}

// 글 작성 폼 열기
function openPostForm() {
  document.getElementById('post-form').style.display = 'block';
}

// 글 작성 폼 닫기
function closePostForm() {
  document.getElementById('post-form').style.display = 'none';
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('image').value = '';
}

// 게시물 작성
function submitPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').files[0];
  const username = document.getElementById('login-username').value; // 로그인한 사용자 이름 가져오기

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('username', username); // 사용자 이름 추가
  if (image) {
    formData.append('image', image);
  }

  fetch('/api/posts', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('게시물이 업로드되었습니다.');
      closePostForm();
      loadPosts();
    } else {
      alert('게시물 업로드 실패');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// 로그아웃 처리
function logout() {
  alert('로그아웃되었습니다.');
  document.getElementById('signup-link').style.display = 'block';
  document.getElementById('login-link').style.display = 'block';
  document.getElementById('logout-button').style.display = 'none';
}

// 로그인 성공 후 UI 업데이트
function updateAuthUI(username) {
  document.getElementById('signup-link').style.display = 'none';
  document.getElementById('login-link').style.display = 'none';
  document.getElementById('logout-button').style.display = 'block';
}

// 로그인 기능
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('로그인 성공');
      updateAuthUI(data.username);  // 로그인 성공 시 UI 업데이트
      window.location.href = 'home.html';  // 홈 페이지로 이동
    } else {
      alert('로그인 실패');
    }
  });
}
