const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const logoutButton = document.querySelector('#logout-button');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault(); // 브라우저의 기본 동작을 막아주고, 그 동작은 페이지 새로고침
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username); // username 값을 username이라는 key와 함께 local storage에 저장
  paintGreetings(username);
}

function paintGreetings(username) {
  // paintGreeting의 함수는 비어있는 h1 요소 안에 `Hello ${username}` 이라는 텍스트 추가

  const smileImage = ['img/smile.png'];

  greeting.innerHTML = `<div style="margin-left: 20px; margin-top:50px">Hello, ${username} <img src="${smileImage}" style="width: 50px; height: auto; margin-left: 10px;"></div>`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.style.textAlign = 'center';
  greeting.style.lineHeight = '120px';
  greeting.style.height = '100px';
  logoutButton.classList.remove(HIDDEN_CLASSNAME);
}

function handleLogout() {
  localStorage.removeItem(USERNAME_KEY); // 로컬 스토리지에서 사용자 이름 삭제
  greeting.classList.add(HIDDEN_CLASSNAME); // 인사말 숨기기
  loginForm.classList.remove(HIDDEN_CLASSNAME); // 로그인 폼 표시
  logoutButton.classList.add(HIDDEN_CLASSNAME); // 로그아웃 버튼 숨기기
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  // show the greetings
  paintGreetings(savedUsername);
}

logoutButton.addEventListener('click', handleLogout);
