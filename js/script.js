const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const bookCards = document.querySelectorAll(".book-card");

if (searchBtn) {
    searchBtn.addEventListener("click", function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("Please enter a book name.");
            return;
        }

        let found = false;

        bookCards.forEach(function (card) {
            const bookText = card.textContent.toLowerCase();

            if (bookText.includes(query)) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found) {
            alert("No book found for: " + query);
        }
    });
}

const readButtons = document.querySelectorAll(".read-btn");

readButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const book = button.getAttribute("data-book");

        window.location.href = "book.html?book=" + book;
    });
});

const continueReading = document.getElementById("continueReading");

if (continueReading) {
    const savedBooks = [
        { key: "html", name: "HTML" },
        { key: "css", name: "CSS" },
        { key: "javascript", name: "JavaScript" }
    ];

    let foundBook = false;
    let cards = "";

    savedBooks.forEach(function (item) {
        const lastChapter = localStorage.getItem(
            "rnLibrary_" + item.key + "_lastChapter"
        );

        if (lastChapter !== null) {
            const chapterNumber = parseInt(lastChapter) + 1;

            cards += `
                <div class="continue-card">
                    <div class="continue-info">
                        <h3>${item.name}</h3>
                        <p>Continue from Chapter ${chapterNumber}</p>
                    </div>

                    <button class="continue-btn"
                        onclick="window.location.href='book.html?book=${item.key}&chapter=${lastChapter}'">
                        Continue Reading →
                    </button>
                </div>
            `;

            foundBook = true;
        }
    });

    if (foundBook) {
        continueReading.innerHTML = cards;
    } else {
        continueReading.innerHTML = `
            <p>Start reading a book to see your progress here.</p>
        `;
    }
}
