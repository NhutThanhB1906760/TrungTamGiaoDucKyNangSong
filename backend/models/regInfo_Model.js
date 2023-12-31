const knex = require('knex')(require('../database/dbConnect'));

const RegInfo = {
    create: async (payload) => {
        return await knex('registration_information')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    countNumber: async (id) => {
        return await knex('registration_information')
            .select('*')
            .where('class_id', id)
            .whereNot('status', 2)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('registration_information').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('registration_information').where(payload)
            .select("*").orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('registration_information')
        //     .select('registration_information.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'registration_information.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('class_promotionGroups','registration_information.id_class','class_promotionGroups.class_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','class_promotionGroups.promotionGroups_id')
        //     .where('id_class',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('registration_information')
            .select('*').orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('registration_information').where({ id: id })
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('registration_information')
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = RegInfo