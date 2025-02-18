//----------------------------------------- Hero -----------------------------------------
const typingAnimationElement = document.getElementById('typing-animation');

// Create an array of typing text
const typingTexts = [
'Shikhar Kumar.  ',
'a Software Developer.  ',
];

// Create a function to display the typing animation for a given text
function playTypingAnimation(text) {
// Loop through each character and add it to the element
for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
    typingAnimationElement.textContent += text[i];
    }, i * 100); // Increase the delay to slow down the typing animation
}

// Once the animation is complete, reset the text and start over
setTimeout(() => {
    typingAnimationElement.textContent = '';
    playTypingAnimation(typingTexts[(typingTexts.indexOf(text) + 1) % typingTexts.length]);
}, text.length * 200);
}

// Start the typing animation loop
playTypingAnimation(typingTexts[0]);


//----------------------------------------- Work Experience -----------------------------------------
// Makes Work Show Details Button Responsive
document.querySelector('.work-btn').addEventListener("click", function() {
    if (this.textContent.trim() === "Show Details") {
        this.textContent = "Hide Details";
        this.classList.add('btn-danger');
    } else if (this.textContent.trim() === "Hide Details") {
        this.textContent = "Show Details";
        this.classList.remove('btn-danger');
    }
});

//----------------------------------------- Education -----------------------------------------
// Makes Courses Button Responsive
let course_btn = document.querySelectorAll('.uni-course-btn');
course_btn.forEach(function(button) {
    button.addEventListener("click", function() {
        if (this.textContent.trim() === "Show Courses") {
            this.textContent = "Hide Courses";
            this.classList.add('btn-danger');
        } else if (this.textContent.trim() === "Hide Courses") {
            this.textContent = "Show Courses";
            this.classList.remove('btn-danger');
        }
    });
});

