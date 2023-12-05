function appendStyleSheet(filePath) {
    if (document.head.innerHTML.includes(filePath)) return;
    document.head.innerHTML += `<link rel="stylesheet" type="text/css" href="${filePath}">`;
}

/**
 * Defines a custom HTML element.
 * 
 * @param {string} tag The tag of the custom element
 * @param {{[key: string]: string}} replacements Strings to replace
 */
function defineTemplate(tag, replacements = {}) {
    const path = `/common/templates/${tag}`;

    customElements.define(tag, class extends HTMLElement {
        connectedCallback() {
            appendStyleSheet(`${path}.css`);

            fetch(`${path}.html`)
                .then(res => res.text())
                .then(text => text.replace('$inner', this.innerHTML))
                .then(text => {
                    Object.entries(replacements).forEach(([key, backup]) => {
                        text = text.replace(`$${key}`, this.getAttribute(key) ?? backup)
                    })
                    return text;
                })
                .then(text => this.outerHTML = text)
        }
    });
}

defineTemplate('egu-main');

defineTemplate('egu-card', {
    href: '/members/wip',
    ['img-src']: '/members/gabes-father.jpg'
});

defineTemplate('egu-product', {
    href: '/shop/wip',
    ['img-src']: '/shop/Ε Γ Υ.jpg'
});
