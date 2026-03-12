// ============ DOM Elements ============
const startScreen = document.getElementById("start-screen"); // container for start screen
const questionScreen = document.getElementById("question-screen"); // container for question screen
const passScreen = document.getElementById("pass-screen"); // container for pass screen
const matchScreen = document.getElementById("match-screen"); // container for match screen
const noMatchScreen = document.getElementById("no-match-screen"); // container for no match screen
const resultsScreen = document.getElementById("results-screen"); // container for match screen

const player1 = document.getElementById("player-1");   // input field for Player1
const player2 = document.getElementById("player-2");   // input field for Player2
const errorText = document.getElementById("error-text");

const startGameBtn = document.getElementById("start-game-btn"); //button Start game

const turnTag = document.getElementById("turn-tag"); //tag with Player's name
const questionNumber= document.getElementById("question-number"); // shows "Question X of 10"
const questionText = document.getElementById("question-text"); // displays the current question
const option1 = document.getElementById("option1"); //option 1 for answer
const option2 = document.getElementById("option2"); //option 2 for answer

const passToText = document.getElementById("pass-to-text"); //text for pass screen
const readyBtn = document.getElementById("ready-btn"); //button Ready on pass screen

const matchScreenText = document.getElementById("match-screen-text"); // shows the matched answer
const player1NoMatch = document.getElementById("player-1-no-match"); // Player 1 name on no-match screen
const player2NoMatch = document.getElementById("player-2-no-match"); // Player 2 name on no-match screen
const player1Answer = document.getElementById("player-1-answer"); // Player 1's answer on no-match screen
const player2Answer = document.getElementById("player-2-answer"); // Player 2's answer on no-match screen
const matchNextQuestionBtn = document.getElementById("match-next-question-btn"); // Next button on match screen
const noMatchNextQuestionBtn = document.getElementById("no-match-next-question-btn"); // Next button on no-match screen

const resultsContainer = document.getElementById("results-container"); // container for results (gets color class)
const resultEmoji = document.getElementById("result-emoji"); // emoji based on score
const resultPercent = document.getElementById("result-percent"); // shows score as percentage
const resultText = document.getElementById("result-text"); // message based on score
const resultDescription = document.getElementById("result-desrciption"); // "You matched on X out of 10"
const playAgainBtn = document.getElementById("play-again-btn"); // button to restart the game


// ============ Questions ============

let currentQuestion = 0; // index of the current question (0-9)

const questions = [
    {
        question: "What motivates you more?",
        option1: "Stability and security",
        option2: "Adventure and risk"
    },
    {
        question: "Which superpower would you choose?",
        option1: "Teleportation",
        option2: "Reading minds"
    },
    {
        question: "Which is worse?",
        option1: "Being misunderstood",
        option2: "Being ignored"
    },
    {
        question: "Which would you rather risk?",
        option1: "Losing comfort",
        option2: "Missing opportunity"
    },
    {
        question: "What would you rather master?",
        option1: "Controlling your thoughts",
        option2: "Influencing other people's thoughts"
    },
    {
        question: "Would you rather be extremely lucky or extremely smart?",
        option1: "Extremely lucky",
        option2: "Extremely smart"
    },
    {
        question: "Would you rather live in the past or in the future?",
        option1: "The past",
        option2: "The future"
    },
    {
        question: "Would you rather be able to speak all languages fluently or talk to animals?",
        option1: "All languages",
        option2: "Talk to animals"
    },
    {
        question: "Would you rather live in a world without music or a world without movies?",
        option1: "No music",
        option2: "No movies"
    },
        {
        question: "Would you rather have dinner with a famous historical figure or a future version of yourself?",
        option1: "Historical figure",
        option2: "Future self"
    }
];

// ============ Variables ============
    let player1Name; // stores Player 1's name from input
    let player2Name; // stores Player 2's name from input
    let currentPlayer = 1; // tracks whose turn it is (1 or 2)

    let player1Answers = []; // stores all of Player 1's answers
    let player2Answers = []; // stores all of Player 2's answers

    let score = 0; // counts how many answers matched



// ============ Start screen ============
function startGame () {
    player1Name = player1.value.trim();
    player2Name = player2.value.trim();

    if (player1Name === "" || player2Name === "") {
        errorText.classList.remove("hidden");
    } else {
        startScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");

        turnTag.textContent = player1Name + "'s" + " turn";
        questionNumber.textContent = "Question " + (currentQuestion + 1) + " of 10";
        questionText.textContent = questions[currentQuestion].question;
        option1.textContent = questions[currentQuestion].option1;
        option2.textContent = questions[currentQuestion].option2;

    }
}

startGameBtn.addEventListener("click", startGame);   // listens for clicks on Start button


// ============ Question screen ============
function chooseAnswer (event) {
    let clickedOption = event.target.textContent;

    if (currentPlayer === 1) {
        player1Answers.push(clickedOption);
        passToText.textContent = "Pass to " + player2Name;
        questionScreen.classList.add("hidden");
        passScreen.classList.remove("hidden");
    } else {
        player2Answers.push(clickedOption);
        questionScreen.classList.add("hidden");
        
        if (player1Answers[currentQuestion] === player2Answers[currentQuestion]){
            score = score + 1;
            matchScreenText.textContent = player1Answers[currentQuestion];
            matchScreen.classList.remove("hidden");
        } else {
            player1NoMatch.textContent = player1Name;
            player2NoMatch.textContent = player2Name;
            player1Answer.textContent = player1Answers[currentQuestion];
            player2Answer.textContent = player2Answers[currentQuestion];
            noMatchScreen.classList.remove("hidden");
        }
    }
}

option1.addEventListener("click", chooseAnswer);   // listens for clicks on Option1 button
option2.addEventListener("click", chooseAnswer);   // listens for clicks on Option2 button

// ============ Pass screen ============
function changePlayer () {
    passScreen.classList.add ("hidden");
    questionScreen.classList.remove("hidden");

    if (currentPlayer === 1) {
        turnTag.textContent = player2Name + "'s" + " turn";
        currentPlayer = 2;
    } else {
        turnTag.textContent = player1Name + "'s" + " turn";
        currentPlayer = 1;
    }

}
 
readyBtn.addEventListener("click", changePlayer);

// ============ Match/No match screen ============
function changeQuestion () {
    matchScreen.classList.add("hidden");
    noMatchScreen.classList.add("hidden");

    currentQuestion = currentQuestion + 1;

    if (currentQuestion < 10) {
        questionScreen.classList.remove("hidden");

        currentPlayer = 1;
        turnTag.textContent = player1Name + "'s turn";

        questionText.textContent = questions[currentQuestion].question;
        option1.textContent = questions[currentQuestion].option1;
        option2.textContent = questions[currentQuestion].option2;
        questionNumber.textContent = "Question " + (currentQuestion + 1) + " of 10";
    } else {
        resultsScreen.classList.remove("hidden");
        let scorePercent = score * 10;
        let scoreDescription = "You matched on " + score + " out of 10 questions";

        if (score < 6) {
            resultsContainer.classList.add("low");
            resultEmoji.textContent = "🤷";
            resultPercent.textContent = scorePercent + "%";
            resultText.textContent = "Opposites attract?";
            resultDescription.textContent = scoreDescription;

        } else if (score >= 6 && score < 8) {
            resultsContainer.classList.add("medium");
            resultEmoji.textContent = "☺️";
            resultPercent.textContent = scorePercent + "%";
            resultText.textContent = "Pretty good!";
            resultDescription.textContent = scoreDescription;
        } else {
            resultsContainer.classList.add("high");
            resultEmoji.textContent = "💕";
            resultPercent.textContent = scorePercent + "%";
            resultText.textContent = "Soulmates!";
            resultDescription.textContent = scoreDescription;
        }
    }
}

matchNextQuestionBtn.addEventListener("click", changeQuestion);
noMatchNextQuestionBtn.addEventListener("click", changeQuestion);

// ============ Play again ============
function playAgain () {
    currentQuestion = 0;
    player1.value = "";
    player2.value = "";
    player1Name = "";
    player2Name = "";
    currentPlayer = 1;
    player1Answers = [];
    player2Answers = [];
    score = 0;

    resultsContainer.classList.remove("low", "medium", "high");

    resultsScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

}


playAgainBtn.addEventListener("click", playAgain);