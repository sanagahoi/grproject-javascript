function Question(questionText, questionNo) {

    this.questionText = questionText;
    this.questionNo = questionNo;
}

const quiz1 = new Question("Javascript is an ______ Language", 1);
const quiz2 = new Question("Which of the following are closures in Javascript?", 2);
const quiz3 = new Question("Which of the following is not a Javascript framework?", 3);
const quiz4 = new Question("How to stop an interval timer in Javascript?", 4);
const quiz5 = new Question("How do we write a comment in javascript?", 5);

function Answer(answerText) {
    this.answerText = answerText
}

function QuestionAnswerPair(questionObj, multipleOptionsObj, correctAnswerObj) {

    this.questionObj = questionObj;
    this.multipleOptionsObj = multipleOptionsObj;
    this.correctAnswerObj = correctAnswerObj;

    this.checkAnswer = function (userAnswerText) {

        if (correctAnswerObj.answerText === userAnswerText) {
            //ans. is right
            return true;
        } else {
            return false;
        }
    }
}

const qaPair1 = new QuestionAnswerPair(quiz1,
    [new Answer("Object-oriented"), new Answer("object-based"), new Answer("procedural"), new Answer("conditional")],
    new Answer("Object-oriented"));

const qaPair2 = new QuestionAnswerPair(quiz2,
    [new Answer("variables"), new Answer("functions"), new Answer("objects"), new Answer("All of these")],
    new Answer("All of these"));

const qaPair3 = new QuestionAnswerPair(quiz3,
    [new Answer("Node"), new Answer("Vue"), new Answer("React"), new Answer("Cassandra")],
    new Answer("Cassandra"));

const qaPair4 = new QuestionAnswerPair(quiz4,
    [new Answer("clearInterval"), new Answer("clearTimer"), new Answer("intervalOver"),new Answer("timeOver")],
     new Answer("clearInterval"));

const qaPair5 = new QuestionAnswerPair(quiz5,
    [new Answer("/* */"), new Answer("//"), new Answer("#"), new Answer("$ $")], 
    new Answer("//"));


function QuestionProgressBar(pageIndex, totalNoOfQuestions) {

    this.pageIndex = pageIndex;
    this.totalNoOfQuestions = totalNoOfQuestions;

    this.getProgressText = function () {

        const progressText = `Question ${pageIndex + 1} of ${totalNoOfQuestions}`;
        return progressText;
    }
}

function ResultPage(score, markPercentage) {

    this.score = score;
    this.markPercentage = markPercentage;

    this.getContent = function () {

        const content = `Your score : ${score}. Mark percentage is ${markPercentage} %`;
        return content;
    }

    this.display = function () {

        const content = this.getContent();

        const htmlFragment =`<h1>Result<h1> <h3 id='score'>${content}</h3>`;
        const quizElement = document.getElementById("quiz");
        quizElement.innerHTML = htmlFragment;
    }
}

function QuizPage(pageIndex, qaPair, qaPairArray) {

    this.pageIndex = pageIndex;
    this.qaPair = qaPair;
    this.qaPairArray = qaPairArray;

    this.display = function () {

        // Update the question
        const questionElement = document.getElementById("question");
        questionElement.innerHTML =qaPair.questionObj.questionText;

        // Update all the answer choices
        for (let i = 0; i < qaPair.multipleOptionsObj.length; i++) {

            const answerObj = qaPair.multipleOptionsObj[i];

            const choiceID = "choice" + i;

            const answerChoiceElement = document.getElementById(choiceID);
            answerChoiceElement.innerHTML = answerObj.answerText;
        }

        // Update question progress bar

        const progressElement = document.getElementById("progress");

        const progressBarObj = new QuestionProgressBar(this.pageIndex, qaPairArray.length);
        progressElement.innerHTML = progressBarObj.getProgressText();
    }
}

function QuizApplication(qaPairArray) {

    this.qaPairArray = qaPairArray;
    this.score = 0;
    this.pageIndex = 0;

    this.start = function () {

        this.registerListeners();
        this.displayQuizPage();
    }

    this.registerListeners = function () {

        const currentQuizAppObject = this;

        const buttonsCount = qaPairArray[this.pageIndex].multipleOptionsObj.length;

        for (let i = 0; i< buttonsCount; i++) {

            const buttonId = `btn${i}`;
            const buttonElement = document.getElementById(buttonId);

            console.log("Invoked successfully...")

            this.associateEventListener(buttonElement, currentQuizAppObject);
        }
    }

    this.associateEventListener = function (buttonElement, currentQuizAppObject) {

        buttonElement.onclick = function (event) {
            
            currentQuizAppObject.handleUserAnswerSelection(event);
        }
    }

    this.handleUserAnswerSelection = function (event) {

        // Get the user-response (answer)

        const target = event.currentTarget;
        const userAnswerText = target.children[0].innerText;

        // Check user-response is matching to the answer

        const qaPair = qaPairArray[this.pageIndex];

        const outcome = qaPair.checkAnswer(userAnswerText);
        if (outcome) {
            // Increment the score
            this.incrementScore();
        }
        
        this.nextPage();
    }

    this.getScore = function () {
        return this.score;
    }

    this.incrementScore = function () {
        this.score++;
    }

    this.getMarkPercentage = function () {
        //calculate %
        const percentage = this.getScore() * 100 / this.qaPairArray.length ;
        return percentage;
    }

    this.nextPage = function () {
        
        if (this.pageIndex == (this.qaPairArray.length - 1)) {

            //Result Page
            const resultPage = new ResultPage(this.getScore(), this.getMarkPercentage() );

            resultPage.display();
        } else {
            //quiz Page
            this.initPage();
        }
    }

    this.initPage = function () {

        this.pageIndex = this.pageIndex + 1;
        this.registerListeners();
        this.displayQuizPage();
    }

    this.displayQuizPage = function () {
        //Display Quiz Page
        const qaPair = this.qaPairArray[this.pageIndex];

        const quizPage = new QuizPage(this.pageIndex, qaPair, this.qaPairArray);

        quizPage.display();
    }
}

const quizApp = new QuizApplication(
    [qaPair1, qaPair2, qaPair3, qaPair4, qaPair5]
);
quizApp.start();