const knex = require('knex')(require('../database/dbConnect'));

const MediumScore = {
    create: async (payload) => {
        return await knex('medium_score')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async ( payload) => {
        return await knex('medium_score').where({ class_id: payload.class_id,subscribers_id:payload.subscribers_id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('medium_score').where(payload)
            .select("*").orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('medium_score')
        //     .select('medium_score.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'medium_score.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('class_promotionGroups','medium_score.id_class','class_promotionGroups.class_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','class_promotionGroups.promotionGroups_id')
        //     .where('id_class',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('medium_score')
            .select('*').orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('medium_score').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('medium_score')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = MediumScore