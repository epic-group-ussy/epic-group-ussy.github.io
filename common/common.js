
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
                this.outerHTML = text
                    .replace('$href', this.attributes.getNamedItem('href')?.textContent ?? 'null')
                    .replace('$img-src', this.attributes.getNamedItem('img-src')?.textContent ?? 'null')
                    .replace('$inner', this.innerHTML)
            })
            .then(() => {
                // TECHNICALLY for n elements, this runs O(n^2) times but it's fast enough
                // that I dont care.
                document.querySelectorAll(".egu-card").forEach(el => {
                    if (el.attributes.getNamedItem('href').textContent !== 'null') {
                        el.addEventListener('click', () => {
                            window.location = el.attributes.getNamedItem('href').textContent;
                        })
                    }
                });
            })
    }
}

customElements.define('egu-card', EguPersonCardElement);