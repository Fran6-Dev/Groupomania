const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}

exports.createPost = async (req, res) => {

    const newPost = new postModel({
        posterId : req.body.posterId,
        message: req.body.message,
        picture : req.file !== null ? `./images/posts/${req.file.filename}` : "",
        video : req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        res.status(201).json(post);

    }
    catch(err) {
        return res.status(400).send(err);
    }
}

exports.updatePost = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

    const updatedRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set : updatedRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
}

exports.deletePost = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Delete error : " + err);
        });
}

exports.likePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

    try {
         PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: { likers: req.body.id }
            },
            {new: true},
            (err,docs) => {
                if (err) return res.status(400).send(err);
            }
        );
         UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $push: {likes : req.params.id}
            },
                {new: true},
                (err, docs) => {
                    if (!err) res.send(docs);
                    else return res.status(400).send(err);
                }
        )
    }
    catch (err){
        return res.status(400).send(err);
    }
}

exports.unlikePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        PostModel.findByIdAndUpdate(
           req.params.id,
           {
               $pull: { likers: req.body.id }
           },
           {new: true},
           (err,docs) => {
               if (err) return res.status(400).send(err);
           }
       );
        UserModel.findByIdAndUpdate(
           req.body.id,
           {
               $pull: {likes : req.params.id}
           },
               {new: true},
               (err, docs) => {
                   if (!err) res.send(docs);
                   else return res.status(400).send(err);
               }
       )
   }
   catch (err){
       return res.status(400).send(err);
   }

}

// exports.commentPost = (req, res) => {
//     if(!ObjectID.isValid(req.params.id))
//     return res.status(400).send('ID unknown : ' + req.params.id);

//     try {
//         return PostModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $push: {
//                     comments: {
//                         commenterId: req.body.commenterId,
//                         commenterPseudo: req.body.commenterPseudo,
//                         text: req.body.text,
//                         timestamp: new Date().getTime(),
//                     }
//                 }
                
//             },
//             console.log('test', req.body.commenterId),
//             { new: true },
//             (err,docs) => {
//                 if (!err) return res.send(docs);
//                 else return res.status(400).send(err);
//             }
//         );
//     } 
//     catch (err) {
//         return res.status(500).send(err);
//     }
// }
// exports.editCommentPost = (req, res) => {
    
// }

// exports.deleteCommentPost = (req, res) => {
    
// }