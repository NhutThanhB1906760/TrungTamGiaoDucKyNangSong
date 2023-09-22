const knex = require('knex')(require('../database/dbConnect'));

const Courses = {
    create: async (payload) => {
        return await knex('courses')
            .insert({ name: payload.name,numberSession:payload.numberSession, content: payload.content, fee: payload.fee, title: payload.title, object: payload.object })
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('courses').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('courses').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('courses')
        //     .select('courses.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'courses.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('courses_promotionGroups','courses.id_courses','courses_promotionGroups.courses_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','courses_promotionGroups.promotionGroups_id')
        //     .where('id_courses',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('courses')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('courses').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('courses')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Courses