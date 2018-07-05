type ElementOptions = string | {
    id?: string,
    classList?: string,
    parent?: HTMLElement,
    innerHTML?: string
};

export function e(tag = 'div', options: ElementOptions = {}) {
    if (typeof tag !== 'string') {
        throw new Error('Tag must be a string');
    }

    const elem = document.createElement(tag);
    if (typeof options === 'string') {
        const selectors = options.split(' ');
        selectors.forEach(selector => {
            switch (selector[0]) {
                case '#':
                    elem.id = selector.slice(1);
                    break;
                case '.':
                    elem.classList.add(selector.slice(1));
                    break;
                default:
                    console.warn('Selector must start with "#" or "."');
                    break;
            }
        });
    } else {
        const { id, classList, parent, innerHTML } = options;
        if (id) {
            elem.id = id;
        }
        if (classList) {
            // Multiple classes should be space-separated
            elem.classList.add(...classList.split(' '));
        }
        if (parent) {
            parent.appendChild(elem);
        }
        if (innerHTML) {
            elem.innerHTML = innerHTML;
        }
    }

    return elem;
}