const knex = require('knex')(require('../database/dbConnect'));

const Assessment = {
    create: async (payload) => {
        return await knex('assessment')
            .insert({ rate: payload.rate,content:payload.content,class_id:payload.class_id,subcribers_id:payload.subcribers_id})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('assessment').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('assessment').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('assessment')
        //     .select('assessment.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'assessment.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('assessment_promotionGroups','assessment.id_assessment','assessment_promotionGroups.assessment_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','assessment_promotionGroups.promotionGroups_id')
        //     .where('id_assessment',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('assessment')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('assessment').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('assessment')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Assessment