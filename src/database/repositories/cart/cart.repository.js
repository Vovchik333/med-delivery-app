import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithItems() {
        return this.model.find({}).populate({
            path: 'items',
            populate: {
              path: 'item'
            }
          }).exec();
    }

    getByIdWithItems(id) {
        return this.model.findById(id).populate({
            path: 'items',
            populate: {
              path: 'item'
            }
          }).exec();
    }

    addItem(id, payload) {
        return this.model.findByIdAndUpdate(
            id, 
            { 
                $push: { 
                    items: payload._id
                },
                $set: {
                    updatedAt: new Date()
                }
            }
        ).exec();
    }
}

export { 
    CartRepository 
};




// addItem(id, payload) {
//     return this.model.findByIdAndUpdate(
//         id, 
//         { 
//             $push: { 
//                 items: payload._id
//             },
//             $inc: { totalSum: payload.quantity * payload.item.price },
//             $set: {
//                 updatedAt: new Date()
//             }
//         }
//     ).exec();
// }