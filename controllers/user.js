const User = require('../models/user')

exports.createUser = (req, res, next) => {
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageUrl: req.body.imageUrl
    })
    user.save().then(
        () => res.status(201).json({message: 'User saved successfully'})
    )
    .catch(
        error => res.status(400).json({ error })
    )
}

exports.getSingleUser = (req, res, next) => {
    User.findOne({
        _id: req.params.id
    }).then(
        user => res.status(200).json({user})
    ).catch(
        error => res.status(404).json({ error })
    )
}

exports.getAllUser = (req, res, next) => {
    User.find().then(
        users => res.status(200).json({ users })
    ).catch(
        error => res.status(400).json({ error })
    )
}

exports.updateUser = (req, res, next) => {
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageUrl: req.body.imageUrl
    })
    User.updateOne({ _id: req.params.id, user }).then(
        () => res.status(201).json({ message: 'User updated successfully !' })
    ).catch(
        error => res.status(400).json({ error })
    )
}

exports.deleteUser = (req, res, next) => {
    User.findOne({ 
        _id: req.params.id 
    }).then(
        () => res.status(200).json({message: 'User deleted !'})
    ).catch(
        error => res.status(404).json({ error })
    )
}
