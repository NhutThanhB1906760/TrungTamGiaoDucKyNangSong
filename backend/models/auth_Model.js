const knex = require('knex')(require('../database/dbConnect'));

class Auth {
    async register(payload) {
        await knex('accounts')
            .insert(payload)
            .then(() => {
            }).catch(err => {
                throw err
            })


        return this.findOne(payload.username)
    }
    async findOne(username) {
        try {
            let rows = await knex('accounts')
                .where({ username: username })
            return rows[0]
        } catch (err) {
            throw err
        }
    }
    async findAccountPer() {
        try {
            let rows = await knex('accounts')
                .whereNotNull('personnel_id')
            return rows
        } catch (err) {
            throw err
        }
    }
    async getAll() {
        try {
            let rows = await knex('accounts').select('*')
            return rows
        } catch (err) {
            throw err
        }
    }
    async update(id, payload) {
        try {
            await knex('accounts').where({ id: id }).update(payload)
            return true
        } catch (error) {
            throw error
        }
    }
    async deleteOne(id) {
        try {
            return await knex('accounts').where({ id: id }).del()

        } catch (error) {
            throw error
        }
    }
}

module.exports = Auth