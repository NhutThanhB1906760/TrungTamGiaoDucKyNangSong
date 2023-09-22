const knex = require('knex')(require('../database/dbConnect'));

const ClassStudyTime = {
    create: async (payload) => {
        return await knex('class_studytime')
            .insert({ class_id: payload.class_id,studyTime_id:payload.studyTime_id})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('class_studytime').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('class_studytime').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('class_studytime')
        //     .select('class_studytime.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'class_studytime.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('class_promotionGroups','class_studytime.id_class','class_promotionGroups.class_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','class_promotionGroups.promotionGroups_id')
        //     .where('id_class',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('class_studytime')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('class_studytime').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('class_studytime')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = ClassStudyTime