const cors = require('cors')
const helmet = require('helmet')
const db = require('./api/models')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const dbConfig = require('./api/config/db.config')

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())
app.use(compression())
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }))
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*')
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
   )
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
   }
   next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connecte to the database.
db.mongoose.connect(dbConfig.URL).then(() => {
   console.log('Connect to the database...')
})
db.mongoose.connection.on('error', (error) => {
   console.log('Connection error to the database ', error)
   process.exit()
})

// routes
app.use('/uploads', express.static('uploads'))
app.get('/', (req, res) => {
   res.json({ message: "Bienvenue sur l'API BiGooDee Atelier." })
})
app.use('/', require('./api/routes/auth.route'))
app.use('/', require('./api/routes/user.route'))
app.use('/', require('./api/routes/atelier.route'))
app.use('/', require('./api/routes/produit.route'))
app.use('/', require('./api/routes/catalogue.route'))
app.use('/', require('./api/routes/contact.route'))
app.use('/', require('./api/routes/point.route'))
app.use('/', require('./api/routes/cadeau.route'))
app.use('/', require('./api/routes/panier.route'))
app.use('/', require('./api/routes/commande.route'))
app.use('/', require('./api/routes/hotesse-commande.route'))
app.use('/', require('./api/routes/profilBeaute.route'))
app.use('/', require('./api/routes/plage.route'))
app.use('/', require('./api/routes/planning.route'))

// set port, listen for requests
const PORT = 3500
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`)
})
