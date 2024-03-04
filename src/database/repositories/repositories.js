import { medicineModel } from "../models/medicine/medicine.model.js";
import { shopModel } from "../models/shop/shop.model.js";
import { MedicineRepository } from "./medicine/medicine.repository.js";
import { ShopRepository } from "./shop/shop.repository.js";

const medicineRepository = new MedicineRepository(medicineModel);
const shopRepository = new ShopRepository(shopModel);

export {
    medicineRepository,
    shopRepository
}