const knex = require('knex')(require('../database/dbConnect'));

const Position = {
    create: async (payload) => {
        return await knex('position')
            .insert({ name: payload.name})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('position').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('position').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('position')
        //     .select('position.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'position.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('position_promotionGroups','position.id_position','position_promotionGroups.position_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','position_promotionGroups.promotionGroups_id')
        //     .where('id_position',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('position')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('position').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('position')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Position