const knex = require('knex')(require('../database/dbConnect'));

const BillingInfomation = {
    create: async (payload) => {
        return await knex('billing_infomation')
            .insert({ payment_methods: payload.payment_methods,payment_amount:payload.payment_amount,personnel_id:payload.personnel_id,regInfor_id:payload.regInfor_id})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('billing_infomation').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('billing_infomation').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('billing_infomation')
        //     .select('billing_infomation.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'billing_infomation.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('billing_infomation_promotionGroups','billing_infomation.id_billing_infomation','billing_infomation_promotionGroups.billing_infomation_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','billing_infomation_promotionGroups.promotionGroups_id')
        //     .where('id_billing_infomation',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('billing_infomation')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('billing_infomation').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('billing_infomation')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = BillingInfomation