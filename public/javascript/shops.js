import { ApiPath } from "./common/enums/api-path.enum.js";
import { createHeartIcon } from "./helpers/create-svg-elements.js";
import { createElement } from "./helpers/dom-api.helper.js";
import { load } from "./helpers/http-api.helper.js";

const allShopsDiv = document.getElementById('all-shops');
const allMedicinesDiv = document.getElementById('all-medicines');
const selectedShopElem = document.getElementById('selected-shop');
const sortByPriceCheckbox = document.getElementById('sort-by-price');

let sortByPriceCheckboxState = false;

const setMedicines = (loadedShop) => {
    allMedicinesDiv.innerHTML = '';
    
    const firstPart = loadedShop.medicines.filter(medicine => medicine.isFavorite === true);
    const secondPart = loadedShop.medicines.filter(medicine => medicine.isFavorite === false);

    [...firstPart, ...secondPart].forEach(medicine => {
        allMedicinesDiv.appendChild(createMedicineContainer(medicine));
    });
}

sortByPriceCheckbox.addEventListener('change', async () => {
    sortByPriceCheckboxState = !sortByPriceCheckboxState;
    const shopId = `/${selectedShop._id}`;
    let loadedShop;

    if (sortByPriceCheckboxState) {
        loadedShop = await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.SHOPS}${shopId}?sortByPrice=true`);
    } else {
        loadedShop = await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.SHOPS}${shopId}`);
    }
    
    setMedicines(loadedShop);
});

let selectedShop = null;

const createMedicineContainer = (medicine) => {
    const { name, price, isFavorite } = medicine;

    const medImg = createElement({
        tagName: 'img',
        className: 'medicine-image',
        attributes: {
            src: `../images/${name}.png`
        }
    });

    const svgHeart = createHeartIcon(isFavorite ? 'red' : '#ff000078');
    const heartWrapper = createElement({
        tagName: 'div',
        className: 'heart-wrapper',
        innerElements: [svgHeart]
    });

    svgHeart.addEventListener('click', async () => {
        const medicineId = `/${medicine._id}`;
        await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.MEDICINES}${medicineId}`, {
            method: 'PUT',
            payload: JSON.stringify({
                isFavorite: !isFavorite
            })
        });

        const shopId = `/${selectedShop._id}`;
        const loadedShop = await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.SHOPS}${shopId}`);
        setMedicines(loadedShop);
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

const firstSetup = async () => {
    const loadedShops = await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.SHOPS}`);
    allShopsDiv.innerHTML = '';

    loadedShops.forEach(shop => {
        const shopElem = createElement({
            tagName: 'div',
            className: 'shop-container',
            innerElements: [shop.name]
        });

        shopElem.addEventListener('click', async () => {
            const id = `/${shop._id}`;
            const loadedShop = await load(`${ApiPath.ROOT}${ApiPath.API}${ApiPath.SHOPS}${id}`);

            setMedicines(loadedShop);
            selectedShopElem.innerText = loadedShop.name;
            selectedShop = loadedShop;
        });

        allShopsDiv.appendChild(shopElem);
    });

    setMedicines(loadedShops[0]);
    selectedShopElem.innerText = loadedShops[0].name;
    selectedShop = loadedShops[0];
};

firstSetup();