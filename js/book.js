const params = new URLSearchParams(window.location.search);
const book = params.get("book");

const bookTitle = document.getElementById("bookTitle");
const bookIntro = document.getElementById("bookIntro");
const chapterTitle = document.getElementById("chapterTitle");
const chapterText = document.getElementById("chapterText");
const codeExample = document.getElementById("codeExample");

const prevButton = document.getElementById("prevChapter");
const nextButton = document.getElementById("nextChapter");
const chapterProgress = document.getElementById("chapterProgress");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const completeButton = document.getElementById("completeChapter");
const completedCount = document.getElementById("completedCount");
const completedPercent = document.getElementById("completedPercent");





const books = {

    html: {
        title: "Learn HTML",
        intro: "Learn the basics of HTML and understand how web pages are created.",
        chapters: [
            {
                title: "Chapter 1: Introduction to HTML",
                text: "HTML stands for HyperText Markup Language. It is used to structure content on websites.",
                code: "<h1>Hello World</h1>\n<p>Welcome to RN Library!</p>"
            },
            {
                title: "Chapter 2: HTML Headings",
                text: "HTML provides six heading levels, from h1 to h6. The h1 heading is normally the most important.",
                code: "<h1>Main Heading</h1>\n<h2>Sub Heading</h2>\n<h3>Small Heading</h3>"
            },
            {
                title: "Chapter 3: HTML Paragraphs",
                text: "The p element is used to create paragraphs of text on a web page.",
                code: "<p>This is my first paragraph.</p>\n<p>This is another paragraph.</p>"
            }
        ]
    },

    css: {
        title: "Master CSS",
        intro: "Learn how CSS styles and designs beautiful responsive websites.",
        chapters: [
            {
                title: "Chapter 1: Introduction to CSS",
                text: "CSS stands for Cascading Style Sheets. It controls colors, layouts, spacing, fonts and the visual design of web pages.",
                code: "body {\n    background: #f5f7fa;\n    color: #172033;\n}"
            },
            {
                title: "Chapter 2: Colors and Backgrounds",
                text: "CSS allows you to change text colors and backgrounds using properties such as color and background.",
                code: "h1 {\n    color: blue;\n    background: white;\n}"
            },
            {
                title: "Chapter 3: CSS Box Model",
                text: "The CSS box model describes content, padding, border and margin around an element.",
                code: ".card {\n    padding: 20px;\n    margin: 10px;\n    border: 1px solid black;\n}"
            }
        ]
    },

    javascript: {
        title: "JavaScript Basics",
        intro: "Learn the basics of JavaScript and make websites interactive.",
        chapters: [
            {
                title: "Chapter 1: Introduction to JavaScript",
                text: "JavaScript is a programming language used to add interaction and dynamic behavior to websites.",
                code: 'const message = "Hello RN Library!";\nconsole.log(message);'
            },
            {
                title: "Chapter 2: Variables",
                text: "Variables are used to store information that a program can use later.",
                code: 'let name = "Rohit";\nlet age = 22;'
            },
            {
                title: "Chapter 3: Conditions",
                text: "Conditional statements allow JavaScript to make decisions based on different conditions.",
                code: 'if (age >= 18) {\n    console.log("Adult");\n}'
            }
        ]
    }

};

const chapterList = document.getElementById("chapterList");

const currentBook = books[book] || books.html;
let currentChapter = 0;
let completedChapters = [];

bookTitle.textContent = currentBook.title;
bookIntro.textContent = currentBook.intro;

currentBook.chapters.forEach(function (chapter, index) {
    const chapterButton = document.createElement("button");

    chapterButton.className = "chapter-item";
    chapterButton.textContent = chapter.title;

    chapterButton.addEventListener("click", function () {
        currentChapter = index;
        showChapter();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    chapterList.appendChild(chapterButton);
});



completeButton.addEventListener("click", function () {
    completedChapters[currentChapter] = !completedChapters[currentChapter];
    updateCompletedButton();
    updateOverallProgress();
});

function updateOverallProgress() {
    const completedTotal = completedChapters.filter(Boolean).length;
    const totalChapters = currentBook.chapters.length;
    const percent = Math.round((completedTotal / totalChapters) * 100);

    completedCount.textContent =
        completedTotal + " / " + totalChapters + " chapters completed";

    completedPercent.textContent = percent + "%";
}

function updateCompletedButton() {
    if (completedChapters[currentChapter]) {
        completeButton.classList.add("completed");
        completeButton.textContent = "✓ Completed";
    } else {
        completeButton.classList.remove("completed");
        completeButton.textContent = "✓ Mark as Completed";
    }
}

function showChapter() {
    updateOverallProgress();


    const chapter = currentBook.chapters[currentChapter];

    chapterTitle.textContent = chapter.title;
    chapterText.textContent = chapter.text;
    codeExample.textContent = chapter.code;
    updateCompletedButton();

    const chapterButtons = document.querySelectorAll(".chapter-item");

    chapterButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    if (chapterButtons[currentChapter]) {
        chapterButtons[currentChapter].classList.add("active");
    }

    const totalChapters = currentBook.chapters.length;
    const currentNumber = currentChapter + 1;
    const percent = Math.round((currentNumber / totalChapters) * 100);

    chapterProgress.textContent = "Chapter " + currentNumber + " of " + totalChapters;
    progressPercent.textContent = percent + "%";
    progressFill.style.width = percent + "%";

    prevButton.disabled = currentChapter === 0;
    nextButton.disabled = currentChapter === currentBook.chapters.length - 1;

    prevButton.style.opacity = currentChapter === 0 ? "0.5" : "1";
    nextButton.style.opacity =
        currentChapter === currentBook.chapters.length - 1 ? "0.5" : "1";
}

nextButton.addEventListener("click", function () {

    if (currentChapter < currentBook.chapters.length - 1) {
        currentChapter++;
        showChapter();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

});

prevButton.addEventListener("click", function () {

    if (currentChapter > 0) {
        currentChapter--;
        showChapter();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

});

showChapter();
