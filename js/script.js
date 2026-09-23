const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const query = searchInput.value.trim();

    if (query === "") {
        alert("Please enter a book name.");
        return;
    }

    alert("Searching for: " + query);
});
