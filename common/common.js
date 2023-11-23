
class EguMainElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        fetch(`/common/templates/egu-main.html`)
            .then(res => res.text())
            .then(text => {
                this.outerHTML = text.replace('$inner', this.innerHTML)
            });
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
                    .replace('$img-src', this.attributes.getNamedItem('img-src')?.textContent ?? 'null')
                    .replace('$inner', this.innerHTML);
            })
            .then(() => {
                // TECHNICALLY for n elements, this runs O(n^2) times but it's fast enough
                // that I dont care.
                document.querySelectorAll(".egu-card").forEach(el => {
                    const href = el.attributes.getNamedItem('href')?.textContent;
                    if (href) {
                        el.addEventListener('click', () => window.location = href)
                    }
                });
            })
    }
}

customElements.define('egu-card', EguPersonCardElement);