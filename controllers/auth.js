const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
    User.findOne({ login: req.body.login })
    .then(
        user => {
            if(!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(req.body.password, user.password)
            .then(
                valid => {
                    if(!valid) {
                        return res.status(401).json({message: 'Mot de passe incorrect !'})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { payload: 
                                {
                                    userId: user._id,
                                    login: user.login,
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                }  
                            },
                            'RANDOM_SECRET_TOKEN',
                            { expiresIn: '24h' }
                        )
                    })
                })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(
        hash => {
            const user = new User({
                login: req.body.login,
                password: hash,
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
    )
    .catch(error => res.status(500).json({ error }))
}