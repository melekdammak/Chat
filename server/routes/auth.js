const router = require('express').Router();
let User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// JWT auth
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ "Message": "User not found" })
    if (!bcrypt.compareSync(req.body.password, user.password)) return res.json({ "Message": "Wrong pwd" })
    const Token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    return res.json({ "Message": "Connected", "Token": Token })
});

router.post('/register', async (req, res) => {
    let form = req.body;
    const password = bcrypt.hashSync(req.body.password, salt);
    form.password = password;
    let result = await User.create(form).catch(err => err)
    return res.send(result);

})

module.exports = router;