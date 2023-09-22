const knex = require('knex')(require('../database/dbConnect'));

const Courses_proGroups = {
    create: async (payload) => {
        return await knex('courses_progroups')
            .insert({ courses_id: payload.courses_id, promotionGroups_id: payload.promotionGroups_id })
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('courses_progroups').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('courses_progroups').where(payload)
            .select("*")
            .then((row) => {
                console.log(row);
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        return await knex('courses_progroups')
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('courses_progroups').where({ id: id })
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('courses_progroups')
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Courses_proGroups