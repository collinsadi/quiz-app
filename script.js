const questions = [

    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false}
        ]
    },
    {

        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "sahara", correct: false},
            { text: "Anatarctica", correct: true}
        ]



    },
    {

        question: "Which is the smallest Continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false}
        ]



    },
    {

        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false}
        ]



    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const NextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    NextButton.style.display ="none";

    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrrect = selectedBtn.dataset.correct === "true";

    if(isCorrrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    NextButton.style.display = "block";

}

function showScore(){
    resetState();

    questionElement.innerHTML = `you Scored ${score} out of ${questions.length}!`;
    NextButton.innerHTML = "Start Quiz Again";
    NextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

NextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

window.addEventListener("load",_=>{
    //showQuestion()

    startQuiz();
})