const knex = require('knex')(require('../database/dbConnect'));

class Auth {
    async register(payload) {
        await knex('account')
            .insert({ name: payload.name, password: payload.password, username: payload.username })
            .then(() => {
            }).catch(err => {
                throw err
            })


        return this.findOne(payload.username)
    }
    async findOne(username) {
        try {
            let rows = await knex('account')
                .where({ username: username })
            return rows[0]
        } catch (err) {
            throw err
        }
    }
    async getAll() {
        try {
            let rows = await knex('account').select('*')
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
            await knex('accounts').where({ id: id }).del()
            return true
        } catch (error) {
            throw error
        }
    }
}

module.exports = Auth