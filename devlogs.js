const articles = document.getElementById('articles');

async function doFetch() {
    articles.innerHTML = `
    <div class="spinner-border" role="status"></div>`;

    const f = await fetch('/devlogs/indexer.json');
    const indexer = await f.json();

    indexer.reverse();
    articles.innerHTML = '';
    for (const arti of indexer) {
        const title = arti.title;
        const description = arti.description;
        const author = arti.author;
        const product = arti.product;
        const file = arti.file;

        const construct = `<li>
            <h4><u><b>${title}</b> - by <i>${author}</i></u></h4>
            <p>${description}</p>
            About the product(s): <i>${product}</i><br>
            <a class="btn btn-primary" href="/devlogs/${file}">View this article</a>
            <br>
        </li>`;

        articles.innerHTML += construct;
    }
}

doFetch();