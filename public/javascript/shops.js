import { createHeartIcon } from "./helpers/create-svg-elements.js";
import { createElement } from "./helpers/dom-api.helper.js";
import { load } from "./helpers/http-api.helper.js";

const allShopsDiv = document.getElementById('all-shops');
const allMedicinesDiv = document.getElementById('all-medicines');
const selectedShopElem = document.getElementById('selected-shop');

const createMedicineContainer = (medicine) => {
    const { name, price } = medicine;

    const medImg = createElement({
        tagName: 'img',
        className: 'medicine-image',
        attributes: {
            src: `../images/${name}.png`
        }
    });

    const svgHeart = createHeartIcon();
    const heartWrapper = createElement({
        tagName: 'div',
        className: 'heart-wrapper',
        innerElements: [svgHeart]
    });

    const addToCartBtn = createElement({
        tagName: 'button',
        className: 'to-cart-btn',
        innerElements: ['add to cart']
    });

    const medInfoDiv = createElement({
        tagName: 'div',
        className: 'medicine-info',
        innerElements: [
            createElement({
                tagName: 'p',
                className: '',
                innerElements: [name]
            }),
            createElement({
                tagName: 'p',
                className: '',
                innerElements: [`$${price}`]
            })
        ]
    });

    const medInfoWrapper = createElement({
        tagName: 'div',
        className: 'medicine-info-wrapper',
        innerElements: [medInfoDiv, addToCartBtn]
    });

    const medicineDiv = createElement({
        tagName: 'div',
        className: 'medicine-container',
        innerElements: [heartWrapper, medImg, medInfoWrapper]
    });

    return medicineDiv
}

const setMedicines = (loadedShop) => {
    allMedicinesDiv.innerHTML = '';

    loadedShop.medicines.forEach(medicine => {
        allMedicinesDiv.appendChild(createMedicineContainer(medicine));
    });
}

const firstSetup = async () => {
    const loadedShops = await load('http://localhost:8080/shops/all');
    allShopsDiv.innerHTML = '';

    loadedShops.forEach(shop => {
        const shopElem = createElement({
            tagName: 'div',
            className: 'shop-container',
            innerElements: [shop.name]
        });

        shopElem.addEventListener('click', async () => {
            const loadedShop = await load(`http://localhost:8080/shops/${shop._id}`);
            setMedicines(loadedShop);
            selectedShopElem.innerText = loadedShop.name;
        });

        allShopsDiv.appendChild(shopElem);
    });

    setMedicines(loadedShops[0]);
    selectedShopElem.innerText = loadedShops[0].name;
};

firstSetup();