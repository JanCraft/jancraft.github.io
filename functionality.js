const coll = document.getElementsByClassName("collapsible");
let i;

const namedCollapsibles = {};
for (i = 0; i < coll.length; i++) {
    namedCollapsibles[coll[i].dataset.name] = coll[i];

    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

const anch = document.getElementsByTagName('a');
for (const a of anch) {
    if (namedCollapsibles[a.getAttribute('href')]) {
        a.onclick = () => {
            namedCollapsibles[a.getAttribute('href')].click();
        };
    }
}