const knex = require('knex')(require('../database/dbConnect'));

const Attendance = {
    create: async (payload) => {
        return await knex('attendance')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('attendance').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('attendance').where(payload)
            .select("*")
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('attendance')
        //     .select('attendance.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'attendance.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('attendance_promotionGroups','attendance.id_attendance','attendance_promotionGroups.attendance_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','attendance_promotionGroups.promotionGroups_id')
        //     .where('id_attendance',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('attendance')
            .select('*')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('attendance').where({id:id})
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('attendance')
        .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Attendance