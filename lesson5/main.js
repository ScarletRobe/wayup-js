/* modal */

const scoreScreen = document.querySelector('.quiz-over-modal'),
      btnTryAgain = document.getElementById('btn-try-again')

const options = document.querySelectorAll('.option') // Массив всех вариантов ответов

/* Variables for question numbers */

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions'),
      numberOfAllQuestions2  = document.getElementById('number-of-all-questions-2'),
      numberOfCorrectAnswers = document.getElementById('correct-answer');

const btnNext = document.getElementById('btn-next'); // Кнопка "Next"

const question = document.getElementById('question') // Сам вопрос

const answersTracker = document.getElementById('answers-tracker')

const questions = [
    {
        question: 'Результат умножения 3 на 8',
        options: [
            '25',
            '21',
            '24',
            '27'
        ],
        rightAnswer: 3
    },
    {
        question: 'Результат умножения 4 на 8',
        options: [
            '32',
            '28',
            '24',
            '36'
        ],
        rightAnswer: 1
    },
    {
        question: 'Результат умножения 5 на 8',
        options: [
            '20',
            '25',
            '40',
            '45'
        ],
        rightAnswer: 3
    },
    {
        question: 'Результат умножения 6 на 8',
        options: [
            '46',
            '48',
            '54',
            '40'
        ],
        rightAnswer: 2
    }, 
    {
        question: 'Результат умножения 7 на 8',
        options: [
            '49',
            '56',
            '63',
            '42'
        ],
        rightAnswer: 2
    }, 
    {
        question: 'Результат умножения 8 на 8',
        options: [
            '64',
            '65',
            '63',
            '61'
        ],
        rightAnswer: 1
    }
];

let indexOfQuestion,
    indexOfQuestionOrder = 0;

let totalScore = 0;

let completedAnswers = [];


numberOfAllQuestions.innerHTML = questions.length;
numberOfAllQuestions2.innerHTML = questions.length;



function checkForTheLastQuestion () {
    if (completedAnswers.length == questions.length){
        quizOver ();
        return false;
    } else {
        return true;
    }
}

function createRandomQuestionNumber () {
        // получить случайное число от (min-0.5) до (max+0.5)
        const max = questions.length - 1;
        const min = 0;
        let randomNumber = Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
        
        if ((completedAnswers.length > 0)) {
            for (let i = 0; i < completedAnswers.length; i++) {
                if (randomNumber == completedAnswers[i]) {
                    createRandomQuestionNumber();
                    return;
                }
            }
            indexOfQuestion = randomNumber;
        } else if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
        }
        completedAnswers.push(indexOfQuestion);
        loadQuiz();
}

function createAnswerTracker () {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

function loadQuiz () {
    indexOfQuestionOrder++;
    numberOfQuestion.innerHTML = indexOfQuestionOrder;
    question.innerHTML = questions[indexOfQuestion].question;
    let i = 0;
    options.forEach(option => {
            option.innerHTML = questions[indexOfQuestion].options[i];
            i++;
    })
}

function refreshQuiz () {
    options.forEach(option => {
        option.classList.remove('disabled', 'correct', 'wrong')
    })
}

function checkAnswer (id) {
    options.forEach(option => {
        option.classList.add('disabled')
    })
    if ((questions[indexOfQuestion].rightAnswer - 1) == id){
        options[id].classList.add('correct');
        updateAnswerTracker('correct');
        totalScore++;
    } else {
        options[id].classList.add('wrong');
        options[(questions[indexOfQuestion].rightAnswer - 1)].classList.add('correct');
        updateAnswerTracker('wrong');
    }
    
}

function updateAnswerTracker (status) {
    answersTracker.children[indexOfQuestionOrder - 1].classList.add(status)
}

function checkForNoAnswer () {
    if (!options[0].classList.contains('disabled')) {
        alert('Выберите один из вариантов ответа')
    }
    else {
        return true;
    }
}

function quizOver () {
    btnNext.classList.add('disabled');
    scoreScreen.classList.add('active');
    numberOfCorrectAnswers.innerHTML = totalScore;
    btnTryAgain.addEventListener('click', () => {
        window.location.reload();
    })
}


options.forEach(option => {
    option.addEventListener('click', event => {
        checkAnswer(event.target.dataset.id)
    })
})

btnNext.addEventListener('click', () => {
    if(checkForNoAnswer()) {
        if (checkForTheLastQuestion()) {
            refreshQuiz();
            createRandomQuestionNumber ();
        }
    }   
})

window.addEventListener('load', () => {
    createAnswerTracker ();
    createRandomQuestionNumber ();
})
