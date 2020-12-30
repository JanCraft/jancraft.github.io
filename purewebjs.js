if (document.doctype.name != "purewebjs") {
    throw new Error("Document doctype must be 'purewebjs'");
}

const css = document.createElement('link');
{
    css.rel = "stylesheet";
    css.href = "/purewebjs.css";
    document.body.appendChild(css);
}

// Utility functions
{
    /**
     * @param {HTMLElement} e
     * @param {string} new_tag
     * @returns {HTMLElement}
     */
    window.ChangeTag = (e, new_tag) => {
        const d = document.createElement(new_tag);
        d.innerHTML = e.innerHTML;
        for (let i = 0; i < e.attributes.length; i++) {
            d.attributes.setNamedItem(e.attributes[i].cloneNode());
        }
        d.className = "tag-" + e.tagName.toLowerCase() + " " + e.className;
        e.parentNode.replaceChild(d, e);
        return d;
    };
}

const applications = document.getElementsByTagName('application');
if (applications.length != 1)
    throw new Error("There needs to be exactly 1 application per project");
const application = ChangeTag(applications[0], "div");

const runtimes = application.getElementsByTagName("runtime");
if (runtimes.length != 1)
    throw new Error("There needs to be exactly 1 runtime per application");
const runtime = runtimes[0];
{
    const js = runtime.getElementsByTagName('javascript');
    for (let i = 0; i < js.length; i++) {
        fetch(js[i].attributes.src.value).then((response) => {
            response.text().then((txt) => {
                eval(txt);
            });
        });
    }
}

const favicons = application.getElementsByTagName("favicon");
if (favicons.length != 1)
    throw new Error("There needs to be exactly 1 favicon per application");
const favicon = favicons[0];
{
    const ficon = document.createElement('link');
    ficon.rel = "shortcut icon";
    ficon.href = favicon.attributes.src.value;
    document.head.appendChild(ficon);

}

const __containers = application.getElementsByTagName('container');
{
    const containers = [];
    while (__containers.length > 0) {
        let render = false;
        if (__containers[0].attributes.render.value == 'always') {
            render = true;
        } else {
            let parts = __containers[0].attributes.render.value.split(' ');
            if (parts[0] == 'pageview') {
                if (parts[1] == location.pathname)
                    render = true;
            } else if (parts[0] == 'delayed') {
                render = true;
                __containers[0].style.display = 'none';
                const delayID = 'x-delayed-' + Date.now();
                __containers[0].classList.add(delayID);
                setTimeout(() => {
                    document.getElementsByClassName(delayID)[0].style.display = 'block';
                    document.getElementsByClassName(delayID)[0].classList.remove(delayID);
                }, parseFloat(parts[1]) * 1000);
            } else {
                throw new Error(`Invalid contianer render mode '${parts[0]}'`);
            }
        }
    
        if (render) {
            containers.push(ChangeTag(__containers[0], "div"));
        } else {
            __containers[0].remove();
        }
    }
}

const scripts = document.getElementsByTagName('script');
{
    while (scripts.length > 0) {
        scripts[0].remove();
    }
}