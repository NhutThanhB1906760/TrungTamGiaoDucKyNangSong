const knex = require('knex')(require('../database/dbConnect'));

const Subcribers = {
    create: async (payload) => {
        return await knex('subscribers')
            .insert({ name: payload.name, birthday: payload.birthday, sex: payload.sex, phone: payload.phone, address: payload.address, email: payload.email })
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('subscribers').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('subscribers').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('subcribers')
        //     .select('subcribers.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'subcribers.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('class_promotionGroups','subcribers.id_class','class_promotionGroups.class_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','class_promotionGroups.promotionGroups_id')
        //     .where('id_class',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('subscribers')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('subscribers').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('subscribers')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Subcribers