const createElement = (tagName, attributes) => {
    const el = document.createElement(tagName);
    attributes.forEach((attribute) => {
        el.setAttribute(attribute.name, attribute.value);
    });
    return el;
}
const createScript = (src, attrs) => {
    return createElement("script", [{'name': 'src', 'value': src}, ...attrs])
}
const head = document.head;
const scriptEl = createScript("http://localhost:3000/static/js/bundle.js", [{'name': 'defer', 'value': ''}]);
head.appendChild(scriptEl);

