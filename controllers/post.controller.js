const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');


const ObjectID = require('mongoose').Types.ObjectId;

// Permet d'afficher un post
exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 })
}

// Permet de creer un post
exports.createPost = async (req, res) => {

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file ? "./images/posts/" + req.file.filename : "",
        likers: [],
    });


    try {
        const post = await newPost.save();
        res.status(201).json(post);

    }
    catch (err) {
        return res.status(400).send(err);
    }
}

// Permet de modifier un post
exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    const updatedRecord = {
        message: req.body.message,
        picture: req.file ? "./images/posts/" + req.file.filename : "",

    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
}

// Permet de supprimer un post
exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
        });
}


// Permet de liker un post
exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $push: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )


    }
    catch (err) {
        return res.status(400).send(err);
    }
}

// Permet de unliker un post
exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    }
    catch (err) {
        return res.status(400).send(err);
    }

}
