const Posts = require("../models/posts_Model");


const PostsController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.update(req.params.id,req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Posts.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
};

module.exports = PostsController;
