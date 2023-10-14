const knex = require('knex')(require('../database/dbConnect'));

const Personnel = {
    create: async (payload) => {
        return await knex('personnel')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('personnel').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('personnel').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('personnel')
        //     .select('personnel.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'personnel.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('personnel_promotionGroups','personnel.id_personnel','personnel_promotionGroups.personnel_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','personnel_promotionGroups.promotionGroups_id')
        //     .where('id_personnel',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('personnel')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('personnel').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('personnel')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Personnel