const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const path = require('path');
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

exports.userInfo = (req, res, next) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

        UserModel.findById(req.params.id, (err, docs) => {
            if(!err) res.send(docs);
            else console.log('ID unknown : ' + err);
        }).select('-password')
}

exports.updateUser = async (req, res, next) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(404).send('ID unknown : ' + req.params.id)

    try {
         UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if(!err) {
                    return res.send(docs)
                } else {
                    return res.status(500).send({ message : err })
                }
            }
        )
    } 
    
    catch (err) {
        return res.status(500).json({ message: err});
    }

    // try {
    //     UserModel.findByIdAndUpdate(
    //         req.body.userId,
    //         { $set: {picture: "./images/profil" + fileName}},
    //         { new: true, upsert: true, setDefaultsOnInsert: true},
    //         (err, docs) => {
    //             if (!err) return res.send(docs);
    //             else {
    //                 return res.status(500).send({ message: err })
    //             }
    //         }
    //     )
    // }
    // catch (err) {
    //     return res.status(500).json({ message: err});
    // }
}

exports.deleteUser = async (req, res, next) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted."});
    }
    catch (err) {
        return res.status(500).json({ message : err });
    }
}

exports.follow = async (req, res, next) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow) )
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
    // add to the follower list 
    UserModel.findByIdAndUpdate(
        req.params.id,
        { $push : { following: req.body.idToFollow}},
        { new: true, upsert: true },
        (err, docs) => {
            if(!err) res.status(201).json(docs);
            else return res.status(400).json(err);
        }
    );
    UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $push: { followers: req.params.id}},
        { new: true, upsert: true },
        (err, docs) => {
            // if(!err) res.status(201).json(docs);
            if(err) return res.status(400).json(err);
        }
    )

    }
    catch (err) {
        return res.status(500).json({ message : err });
    }
}

exports.unfollow = async (req, res, next) => {
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull : { following: req.body.idToUnFollow}},
            { new: true, upsert: true },
            (err, docs) => {
                if(!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id}},
            { new: true, upsert: true },
            (err, docs) => {
                // if(!err) res.status(201).json(docs);
                if(err) return res.status(400).json(err);
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message : err });
    }
}

exports.getProfilPicture = (req, res, next) => {
    const fileName = req.body.pseudo + ".jpg";
    console.log('TEST', req.body);

    pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../images/profil/${fileName}`
        )
      );

    UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: { picture: './images/profil/' + fileName}},
        { new: true, upsert: true},
        (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(500).send({ message: err });
        }
     )
    }



    