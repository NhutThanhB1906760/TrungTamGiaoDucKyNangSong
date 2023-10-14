const knex = require('knex')(require('../database/dbConnect'));

const Assessment = {
    create: async (payload) => {
        return await knex('assessment')
            .insert(payload)
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
            .select("*").orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        return await knex('assessment')
            .select('*').orderBy('create_at', 'desc')
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