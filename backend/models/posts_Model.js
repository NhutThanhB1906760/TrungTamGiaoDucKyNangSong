const knex = require('knex')(require('../database/dbConnect'));

const Posts = {
    create: async (payload) => {
        return await knex('posts')
            .insert(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    update: async (id, payload) => {
        return await knex('posts').where({ id: id })
            .update(payload)
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    find: async (payload) => {
        return await knex('posts').where(payload)
            .select("*").orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    getAll: async () => {
        // return await knex('posts')
        //     .select('posts.*',
        //     'promotion_time.*','promotion_groups.*'
        //     ).join('promotion_time', 'posts.promotionTime_id', 'promotion_time.id_promotionTime')
        //     .join('posts_promotionGroups','posts.id_posts','posts_promotionGroups.posts_id')
        //     .join('promotion_groups','promotion_groups.id_promotionGroups','posts_promotionGroups.promotionGroups_id')
        //     .where('id_posts',15)
        //     .then((row) => {
        //         console.log(row);
        //         return row
        //     }).catch(err => {
        //         throw err
        //     })

        return await knex('posts')
            .select('*').orderBy('create_at', 'desc')
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    delete: async (id) => {
        return await knex('posts').where({ id: id })
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
    deleteAll: async () => {
        return await knex('posts')
            .del()
            .then((row) => {
                return row
            }).catch(err => {
                throw err
            })
    },
}


module.exports = Posts