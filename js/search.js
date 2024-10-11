
document.addEventListener("DOMContentLoaded", function() {
    var idx = lunr(function () {
        this.field('title');
        this.field('body');
        this.ref('id');

        document.querySelectorAll('section').forEach(function(sec, index) {
            this.add({
                id: index,
                title: sec.dataset.title,
                body: sec.innerText
            });
        }.bind(this));
    });

    document.getElementById("search-box").addEventListener("keyup", function() {
        var query = this.value;
        var results = idx.search(query);
        var resultsEl = document.getElementById("results");
        resultsEl.innerHTML = "";
        results.forEach(function(result) {
            var sec = document.querySelectorAll('section')[result.ref];
            var li = document.createElement("li");
            li.innerHTML = `<a href="${sec.dataset.url}">${sec.dataset.title}</a>`;
            resultsEl.appendChild(li);
        });
    });
});
