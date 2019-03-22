const router = require('express').Router();
let User = require('../models/user');
var ObjectID = require('mongodb').ObjectID
const passport = require('passport');

//User routes

router.get('/getUser/:id_user', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        ObjectID(req.params.id_user);
    }
    catch (err) {
        return res.json({ "Status": "Invalid Id" })
    }
    let user = await User.findOne({ _id: ObjectID(req.params.id_user) }).catch(err => err);
    if (!user)
        return res.json({ "Status": "User not found" });
    return res.json(user);
})

router.get('/getAllUsers', passport.authenticate('jwt', { session: false }), async (req, res) => {

    let users = await User.find().catch(err => err)
    return res.json(users);
})

module.exports = router;