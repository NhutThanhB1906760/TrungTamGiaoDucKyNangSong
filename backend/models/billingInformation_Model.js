const knex = require('knex')(require('../database/dbConnect'));

const BillingInfomation = {
    create: async (payload) => {
        return await knex('billing_information')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('billing_information').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('billing_information').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('billing_information')
        //     .select('billing_information.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'billing_information.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('billing_information_promotionGroups','billing_information.id_billing_information','billing_information_promotionGroups.billing_information_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','billing_information_promotionGroups.promotionGroups_id')
        //     .where('id_billing_information',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('billing_information')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('billing_information').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('billing_information')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = BillingInfomation