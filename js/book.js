const params = new URLSearchParams(window.location.search);
const book = params.get("book");

const bookTitle = document.getElementById("bookTitle");
const bookIntro = document.getElementById("bookIntro");
const chapterTitle = document.getElementById("chapterTitle");
const chapterText = document.getElementById("chapterText");
const codeExample = document.getElementById("codeExample");

if (book === "css") {

    bookTitle.textContent = "Master CSS";

    bookIntro.textContent =
        "Learn how CSS styles and designs beautiful responsive websites.";

    chapterTitle.textContent = "Chapter 1: Introduction to CSS";

    chapterText.textContent =
        "CSS stands for Cascading Style Sheets. It controls colors, layouts, spacing, fonts and the visual design of web pages.";

    codeExample.textContent =
        "body {\n    background: #f5f7fa;\n    color: #172033;\n}";

} else if (book === "javascript") {

    bookTitle.textContent = "JavaScript Basics";

    bookIntro.textContent =
        "Learn the basics of JavaScript and make websites interactive.";

    chapterTitle.textContent = "Chapter 1: Introduction to JavaScript";

    chapterText.textContent =
        "JavaScript is a programming language used to add interaction and dynamic behavior to websites.";

    codeExample.textContent =
        'const message = "Hello RN Library!";\nconsole.log(message);';

} else {

    bookTitle.textContent = "Learn HTML";

    bookIntro.textContent =
        "Learn the basics of HTML and understand how web pages are created.";

    chapterTitle.textContent = "Chapter 1: Introduction to HTML";

    chapterText.textContent =
        "HTML stands for HyperText Markup Language. It is used to structure content on websites.";

    codeExample.textContent =
        "<h1>Hello World</h1>\n<p>Welcome to RN Library!</p>";
}
