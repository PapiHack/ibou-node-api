const express = require('express')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

mongoose.connect('mongodb+srv://papidev:y4tqoqPbAheZRNQt@api-cluster-z1oi8.mongodb.net/db_test',
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(bodyParser.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

module.exports = app