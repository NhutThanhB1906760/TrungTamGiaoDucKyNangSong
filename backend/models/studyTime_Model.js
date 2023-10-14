const knex = require('knex')(require('../database/dbConnect'));

const StudyTime = {
    create: async (payload) => {
        return await knex('study_time')
            .insert({ thu: payload.thu,startTime:payload.startTime,endTime:payload.endTime})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('study_time').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('study_time').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('study_time')
        //     .select('study_time.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'study_time.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('class_promotionGroups','study_time.id_class','class_promotionGroups.class_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','class_promotionGroups.promotionGroups_id')
        //     .where('id_class',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('study_time')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('study_time').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('study_time')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = StudyTime 