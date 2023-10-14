const knex = require('knex')(require('../database/dbConnect'));

const ClassNotification = {
    create: async (payload) => {
        return await knex('class_notification')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('class_notification').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('class_notification').where(payload)
            .select("*").orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        return await knex('class_notification')
            .select('*').orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('class_notification').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('class_notification')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = ClassNotification