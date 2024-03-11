class AbstractRepository {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.find({}).exec();
    }

    getById(id) {
        return this.model.findById(id).exec();
    }

    create(payload) {
        return this.model.create(payload);
    }

    async updateById(id, payload) {
        payload.updatedAt = new Date();

        const options = {
            new: true
        }

        return await this.model.findByIdAndUpdate(id, { ...payload }, options).exec();
    }

    deleteById(id) {
        return this.model.deleteOne({ _id: id }).exec();
    }

    deleteAll() {
        return this.model.deleteMany({}).exec();
    }   
}

export {
    AbstractRepository
}