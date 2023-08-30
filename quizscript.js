//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 20;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is the effect of the &lt;b&gt; tag?",
        options: ["It converts the text within it to bold font", "It is used to write black-colored font", "It is used to change the font size", "None of the above"],
        correct: "It converts the text within it to bold font",
    },
    {
        id: "1",
        question: "Who is the father of HTML?",
        options: ["Rasmus Lerdorf", "Tim Berners-Lee", "Brendan Eich", "Sergey Brin"],
        correct: "Tim Berners-Lee",
    },
    {
        id: "2",
        question: "HTML stands for ___?",
        options: ["Hyper Text Markup Language", "Hyper Text Machine Language", "Hyper Text Marking Language", "High Text Marking Language"],
        correct: "Hyper Text Markup Language",
    },
    {
        id: "3",
        question: "Which is used to read an HTML page and render it?",
        options: ["Websites", "A host", "A router", "Web Browser"],
        correct: "Web Browser",
    },
    {
        id: "4",
        question: "How many sizes of headers are available in HTML by default?",
        options: ["3", "5", "6", "2"],
        correct: "6",
    },
    {
        id: "5",
        question: "What is the smallest header in HTML by default?",
        options: ["h1", "h5", "h6", "h3"],
        correct: "h6",
    }, {
        id: "6",
        question: "What are the types of lists available in HTML?",
        options: ["Ordered, Unordered Lists", "Bulleted, Numbered Lists", "Named, Unnamed Lists", "None of the above"],
        correct: "Ordered, Unordered Lists",
    },
    {
        id: "7",
        question: "How to create an ordered list in HTML?",
        options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;href&gt;", "&ltb&gt;"],
        correct: "<ol>",
    },
    {
        id: "8",
        question: "HTML files are saved by default with the extension?",
        options: [".ht", ".txt", "None of the above", ".html"],
        correct: ".html",
    },
    {
        id: "9",
        question: "We enclose HTML tags within?",
        options: ["{ }", "< >", "! !", "None of the above"],
        correct: "<>",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 20;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 20;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};