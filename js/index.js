const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password' }
];

// Transition Times
const shakeTime = 100; // milliseconds
const switchTime = 200;

let position = 0;

const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// EVENTS
document.addEventListener('DOMContentLoaded', getQuestion);
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS
function getQuestion() {
  inputLabel.innerHTML = questions[position].question;
  inputField.type = questions[position].type || 'text';
  inputField.value = questions[position].answer || '';
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  position++;

  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    formComplete();
  }
}

function formComplete() {
  console.log(questions);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}, registered and we will send an email shortly`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
