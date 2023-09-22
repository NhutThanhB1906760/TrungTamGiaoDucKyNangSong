const knex = require('knex')(require('../database/dbConnect'));

const AccountNotification = {
    create: async (payload) => {
        return await knex('account_notification')
            .insert({ title: payload.title,link:payload.link,status:payload.status,account_id:payload.account_id})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('account_notification').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('account_notification').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('account_notification')
        //     .select('account_notification.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'account_notification.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('account_notification_promotionGroups','account_notification.id_account_notification','account_notification_promotionGroups.account_notification_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','account_notification_promotionGroups.promotionGroups_id')
        //     .where('id_account_notification',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('account_notification')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('account_notification').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('account_notification')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = AccountNotification