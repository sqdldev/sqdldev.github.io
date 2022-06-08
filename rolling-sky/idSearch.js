var currentIndex, searchInput = document.getElementById("search"),
    maxIndex = searchInput.dataset.maxIndex;

function search() {
    if ("" != searchInput.value) {
        let e = window.location.href;
        currentIndex = searchInput.value, e = e.split("#")[0], e = e.concat("#" + currentIndex), window.location.href = e, searchInput.value = ""
    }
}