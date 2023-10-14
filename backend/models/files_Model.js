const knex = require('knex')(require('../database/dbConnect'));
const fs = require('fs');
const path = require('path');
const Files = {
    create: async (payload) => {
        return await knex('files')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
   
    find: async (payload) => {
        return await knex('files').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('files').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        return await knex('files')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        const name=await Files.find({id:id})
        console.log(name);
        var relativePath = "../uploads/" + name[0].name_change;
        console.log(relativePath);
        const absolutePath = path.resolve(__dirname, relativePath);
        console.log(absolutePath)
        fs.unlinkSync(absolutePath);
        return await knex('files').where({ id: id })
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('files')
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Files