document.addEventListener("DOMContentLoaded", () => {
var play = document.querySelector(".play_button");

    play.addEventListener("click", () => {
        console.log("Play button clicked.");
        window.location.href = "./quiz.html";
    });

});