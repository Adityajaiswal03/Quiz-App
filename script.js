document.addEventListener("DOMContentLoaded", () => {
    var score = 0;
    var no_q=1;
    
    let questions = [
    {
        question: "Which HTML tag is used to define an inline style?",
        choice1: "<script>",
        choice2: "<css>",
        choice3: "<style>",
        choice4: "<span>",
        answer: 3,  // Correct answer: <style>
    },
    {
        question: "Which property is used to change the text color in CSS?",
        choice1: "text-color",
        choice2: "font-color",
        choice3: "text-style",
        choice4: "color",
        answer: 4,  // Correct answer: color
    },
    {
        question: "Which of the following is the correct way to comment in HTML?",
        choice1: "// Comment",
        choice2: "<!-- Comment -->",
        choice3: "/* Comment */",
        choice4: "<! Comment>",
        answer: 2,  // Correct answer: <!-- Comment -->
    },
    {
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        choice1: "<script href='app.js'>",
        choice2: "<script name='app.js'>",
        choice3: "<script src='app.js'>",
        choice4: "<script link='app.js'>",
        answer: 3,  // Correct answer: <script src='app.js'>
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function myFunction()",
        choice2: "function:myFunction()",
        choice3: "function = myFunction()",
        choice4: "function => myFunction()",
        answer: 1,  // Correct answer: function myFunction()
    },
    {
        question: "Which of the following is the correct syntax to display 'Hello World' in an alert box?",
        choice1: "msg('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "alert('Hello World');",
        choice4: "msgBox('Hello World');",
        answer: 3,  // Correct answer: alert('Hello World');
    },
    {
        question: "How do you add a comment in JavaScript?",
        choice1: "<!-- This is a comment -->",
        choice2: "// This is a comment",
        choice3: "' This is a comment",
        choice4: "/* This is a comment */",
        answer: 2,  // Correct answer: // This is a comment
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choice1: "var colors = (1:'red', 2:'green', 3:'blue')",
        choice2: "var colors = 'red', 'green', 'blue'",
        choice3: "var colors = ['red', 'green', 'blue']",
        choice4: "var colors = {1:'red', 2:'green', 3:'blue'}",
        answer: 3,  // Correct answer: var colors = ['red', 'green', 'blue']
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        choice1: "Math.round(7.25)",
        choice2: "Math.rnd(7.25)",
        choice3: "round(7.25)",
        choice4: "rnd(7.25)",
        answer: 1,  // Correct answer: Math.round(7.25)
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onchange",
        choice2: "onclick",
        choice3: "onmouseover",
        choice4: "onmouseclick",
        answer: 2,  // Correct answer: onclick
    },
];


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const valScore=document.querySelector(".score_val");
    const valQues = document.querySelector(".ques_val");
    const totalQues=questions.length;
    valQues.innerText = no_q + "/" + totalQues;
    function loadQuestion(questionIndex) {
        if (questions.length === questionIndex) {
            console.log("Ending Quiz= " + questionIndex);
            endQuiz();
            return;
        }

        var questionElement = document.querySelector(".quiz .question");
        var choiceElements = document.querySelectorAll(".choice");

        const q = questions[questionIndex];

        questionElement.innerHTML = q.question;

        choiceElements[0].innerText = q.choice1;
        choiceElements[1].innerText = q.choice2;
        choiceElements[2].innerText = q.choice3;
        choiceElements[3].innerText = q.choice4;

        let optionClicked = false; 

        choiceElements.forEach((choiceElement, index) => {
            let newChoiceElement = choiceElement.cloneNode(true);
            choiceElement.parentNode.replaceChild(
                newChoiceElement,
                choiceElement
            );

            function handleClick() {
                if (!optionClicked) {
                    optionClicked = true; 

                    if (q.answer === index + 1) {
                        newChoiceElement.parentElement.style.backgroundColor =
                            "green";
                        score++;
                        valScore.innerText = score * 10;
                    } else {
                        newChoiceElement.parentElement.style.backgroundColor =
                            "red";
                    }

                    setTimeout(() => {
                        newChoiceElement.parentElement.style.backgroundColor =
                            "white";
                        no_q++;
                        valQues.innerText = no_q + "/" + totalQues;
                        updateProgressBar(no_q, totalQues);
                        loadQuestion(questionIndex + 1);
                    }, 1000);
                }
            }

            newChoiceElement.parentElement.addEventListener("click",handleClick);

            function removeClickListener() {
                newChoiceElement.parentElement.removeEventListener("click",handleClick);
            }

            newChoiceElement.parentElement.addEventListener("click",removeClickListener);
        });
    }


    function updateProgressBar(currentIndex, totalQuestions) {
        const progressBarFill = document.querySelector(".progress-bar-fill");
        const progressPercentage = ((currentIndex) / totalQuestions) * 100;
        progressBarFill.style.width = progressPercentage + "%";
    }

    function endQuiz() {
        document.body.innerHTML = `
            <div class="game_ended">
                <u> The Game Has Ended</u>
            </div>
            <div class="end_game">
                <div class="score_div">
                    <div class="score_title">Score:</div>
                    <div class="score"></div>
                </div>
                <div class="button">
                    <button class="play_again">Play Again</button>
                </div>
                <div class="button">
                    <button class="home">Go home</button>
                </div>
            </div>`;

        const count = document.querySelector(".score");
        count.innerText = score*10;

        const again = document.querySelector(".play_again");
        const home = document.querySelector(".home");
        console.log("Quiz ended");
        console.log(again);

        again.addEventListener("click", () => {
            window.location.href = "./quiz.html";
        });

        home.addEventListener("click", () => {
            window.location.href = "./index.html";
        });
    }

    shuffleArray(questions);
    loadQuestion(0);
    updateProgressBar(no_q, totalQues);
});
