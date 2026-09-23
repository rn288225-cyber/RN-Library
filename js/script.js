const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const bookCards = document.querySelectorAll(".book-card");

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
