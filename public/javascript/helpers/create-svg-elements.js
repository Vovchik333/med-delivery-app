import { createElementNS } from "./dom-api.helper.js";

const createHeartIcon = (fill) => {
    const pathElement = createElementNS({
        tagName: 'path',
        className: '',
        attributes: {
            'fill-rule': 'evenodd',
            d: 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z',
        },
        namespace: 'http://www.w3.org/2000/svg',
    });
    
    const svgHeart = createElementNS({
        tagName: 'svg',
        className: 'heart-icon',
        attributes: {
            stroke: 'red',
            fill,
            width: '50',
            height: '50',
            viewBox: '0 -2 18 22',
        },
        innerElements: [pathElement],
        namespace: 'http://www.w3.org/2000/svg',
    });

    return svgHeart;
};

export {
    createHeartIcon
}