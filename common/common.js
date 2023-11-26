
class EguMainElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        fetch(`/common/templates/egu-main.html`)
            .then(res => res.text())
            .then(text => {
                this.outerHTML = text.replace('$inner', this.innerHTML)
            })
            .then(() => {
                if (!document.head.innerHTML.includes('egu-main.css')) {
                    document.head.innerHTML += `
                        <link rel="stylesheet" type="text/css" href="/common/templates/egu-main.css">
                    `;
                }
            })
    }
}

customElements.define('egu-main', EguMainElement);

class EguPersonCardElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        fetch(`/common/templates/egu-card.html`)
            .then(res => res.text())
            .then(text => {
                const href = this.attributes.getNamedItem('href')?.textContent;

                this.outerHTML = text
                    .replace('$href', href ? `href=${href}` : '')
                    .replace('$img-src', this.attributes.getNamedItem('img-src')?.textContent ?? '/members/gabes-father.jpg')
                    .replace('$inner', this.innerHTML);
            })
            .then(() => {
                // TECHNICALLY for n elements, this runs O(n^2) times but it's fast enough
                // that I dont care.
                document.querySelectorAll(".egu-card").forEach(el => {
                    const href = el.attributes.getNamedItem('href')?.textContent;
                    el.addEventListener('click', () => window.location = href ?? '/members/wip')
                });
            })
            .then(() => {
                if (!document.head.innerHTML.includes('egu-card.css')) {
                    document.head.innerHTML += `
                        <link rel="stylesheet" type="text/css" href="/common/templates/egu-card.css">
                    `;
                }
            })
    }
}

customElements.define('egu-card', EguPersonCardElement);