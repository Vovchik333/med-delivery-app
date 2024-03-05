const setClassAndAttributes = (element, className, attributes, innerElements) => {
    if (className) {
        const classNames = className.split(' ').filter(Boolean);
        element.classList.add(...classNames);
    }

    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    innerElements.forEach(innerElement => element.append(innerElement));

    return element;
}

const createElement = ({ tagName, className, attributes = {}, innerElements = [] }) => {
    const element = document.createElement(tagName);

    return setClassAndAttributes(element, className, attributes, innerElements);
};

const createElementNS = ({ tagName, className, attributes = {}, innerElements = [], namespace = '' }) => {
    const element = document.createElementNS(namespace, tagName);

    return setClassAndAttributes(element, className, attributes, innerElements);
};

export {
    createElement,
    createElementNS
}