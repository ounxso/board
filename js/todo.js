const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos() {
  // 저장 기능 함수
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // string 형태로 toDos라는 array에 집어넣고 싶기 때문에 JSOn.stringify()라는 객체 사용
}

function deleteToDo(event) {
  const li = event.target.parentElement; // button의 부모는 li
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement('li'); // 변수의 이름을 li로 안해도 된다. 다른거로 해도 상관 없다.
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', deleteToDo);

  button.style.backgroundColor = 'transparent';
  button.style.border = 'none';

  li.style.border = '2px solid #5a5a58'; // 테두리 색과 두께
  li.style.borderRadius = '5px'; // 모서리 둥글게
  li.style.padding = '10px'; // 여백 추가
  li.style.margin = '5px 30px'; // 항목 간 간격(위아래, 좌우)
  li.style.display = 'flex'; // 버튼과 텍스트를 가로로 배치
  li.style.justifyContent = 'space-between'; // 버튼 오른쪽으로 배치
  li.appendChild(span); // span을 li 내부에 넣는다.
  li.appendChild(button);
  toDoList.appendChild(li); // html의 ul 태그 안에 li를 속하게 한다.
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value; // input의 현재 value를 새로운 변수에 복사
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos(); // 기능 구현
}

/*
<함수 paintToDo(newTodo)를 함수 handleTodoSubmit()에 추가>
텍스트를 기입하고 submit 할 때마다 원하던 기능들을 실행시키기 위해 만든 함수이다.
paintTodo(newTodo)를 함수 handleTodoSubmit()에 추가한다.

기존 함수 handleTodoSubmit()가 텍스트 상자 안의 텍스트를 초기화하는 기능까지만
했다면, paintToDo(newTodo); 추가 후에는 제출한 텍스트를 매번 html의 ul 안에서
li 태그와 그 안에 속하는 span 태그를 만들고 span에 텍스트로 남겨 웹 화면에서
보일 수 있는 것 까지 되게 한다.
*/

// local storage에서 "TODOS_KEY"라는 키로 저장된 할 일 목록을 가져오는 작업
toDoForm.addEventListener('submit', handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);
// local storage에서 "TODOS_KEY"에 해당하는 값을 가져와 savedToDos 변수에 저장한다.

if (savedToDos !== null) {
  // 만약 savedToDos가 null이 아니면 (즉, 저장된 값이 존재하면) 밑의 코드 실행한다.
  const parsedToDos = JSON.parse(savedToDos); // 가져온 문자열을 JSON 형태로 변환하여 parsedToDos 변수에 저장한다.
  toDos = parsedToDos; // 변환된 할 일 목록을 toDos 변수에 할당한다.
  parsedToDos.forEach(paintToDo); // parsedToDos 배열의 각 요소에 대해 paintToDo 함수를 호출하여 할 일 목록을 화면에 그린다.
}
