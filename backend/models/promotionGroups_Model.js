const knex = require('knex')(require('../database/dbConnect'));

const PromotionGroups = {
    create: async (payload) => {
        return await knex('promotion_groups')
            .insert({ name: payload.name, min: payload.min, max: payload.max,value:payload.value})
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('promotion_groups').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('promotion_groups').where(payload)
            .select("*")
            .then((row) => {
                console.log(row);
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        return await knex('promotion_groups')
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('promotion_groups').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('promotion_groups')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = PromotionGroups