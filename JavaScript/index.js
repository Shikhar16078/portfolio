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

