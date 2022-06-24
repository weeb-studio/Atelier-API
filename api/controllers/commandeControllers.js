const db = require('../models')
const Stripe = require("stripe");
const socket = require('../config/socket-client.config')

const Commande = db.commande

const stripe = Stripe(
    'sk_test_51JsMcWDHkYs3mdNXEYtAMkMWvdTSK4pDbu5QMKSI0lwhjydYtq2kEpPHEb6Fj1IQ0fZHvyDb6IfaNKV6bZL21XzL00NbItMEyI'
)

const createNewPaymentIntent = async (req, res, amount, description) => {
    if (!req.body.name) return res.status(400).json({
        message: 'Veuillez indiquer le nom de la cliente !'
    })
    if (!req.body.email) return res.status(400).json({
        message: 'Veuillez indiquer l\'adresse e-mail de la cliente !'
    })

    const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email
    })
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
    )
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'eur',
        customer: customer.id,
        payment_method_types: ['card'],
        description: description,
        setup_future_usage: 'off_session'
    })

    res.json({
        paymentIntent,
        client_secret: paymentIntent.client_secret,
        ephemeral_key_secret: ephemeralKey.secret,
        customer_id: customer.id
    })
}

const createPaymentIntentWithCustomerId = async (req, res, amount, description) => {
    const customerId = req.body.customer_id
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card'
        })

        await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'eur',
            customer: customerId,
            payment_method: paymentMethods.data[0].id,
            off_session: true,
            confirm: true,
            description: description
        })

        console.log('Payment methods : ', paymentMethods)

        res.json({pay_completed: true, message: 'OK pour le paiement.'})
    } catch (err) {
        // Error code will be authentication_required if authentication is needed
        console.log('Error code is: ', err.code)
        const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id)
        console.log('PI retrieved: ', paymentIntentRetrieved.id)
        res.status(400).json({
            message: 'Une erreur s\'est produite lors du paiement, veuillez réessayer !',
            error: {
                code: err.code,
                paymentIntentRetrievedId: paymentIntentRetrieved.id
            }
        })
    }
}

exports.createPaymentIntent = async (req, res) => {
    if (!req.body.amount) return res.status(400).json({
        message: 'Veuillez indiquer le montant de la facture !'
    })
    if (!req.body.description) return res.status(400).json({
        message: 'Veuillez indiquer le description de la commande !'
    })
    if (req.body.customer_id) {
        await createPaymentIntentWithCustomerId(req, res, req.body.amount, req.body.description)
    } else {
        await createNewPaymentIntent(req, res, req.body.amount, req.body.description)
    }
}

exports.stripeCheckout = async (req, res) => {
    try {
        const token = req.body.token
        const customer = await stripe.customers.create({
            email: req.body.email,
            name: req.body.name,
            source: token.id
        })
        const stripe_charge = await stripe.charges.create({
            amount: req.body.amount * 100,
            description: req.body.description,
            currency: 'EUR',
            customer: customer.id
        })
        res.json({
            message: 'Payment réussit, merci !',
            stripe_charge: stripe_charge,
            customer
        })
    } catch (e) {
        console.log(e)
        res.status(404).json({
            message: 'Une erreur est survenue lors du paiement !',
            error: e.message
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await Commande.find()
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Erreur lors de la récupération des conseillères',
            error: e.message,
        })
    }
}

exports.getByStatus = async (req, res) => {
    try {
        const response = await Commande.find({status: req.params.status})
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Erreur lors de la récupération des conseillères',
            error: e.message,
        })
    }
}

exports.create = async (req, res) => {
    try {
        const data = {
            ...req.body,
            conseillere: req.userId
        }
        const commande = new Commande(data)
        const response = await commande.save()
        socket.emit('notify', {
            title: 'Nouvelle commande Atelier',
            message: 'Nouvelle commande émit pour la cliente ' + response.cliente.firstname + ' ' +
                response.cliente.lastname + ' Pour l\'adresse : ' + response.cliente.address + ', ' +
                response.cliente.postal_code,
            cmd_bon: response._id,
            sender: req.userId,
            receiver: 'admin',
            type: 'CMDB'
        })
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Erreur lors de la récupération des conseillères',
            error: e.message,
        })
    }
}

exports.update = async (req, res) => {
    try {
        const data = req.body
        const response = await Commande.findOneAndUpdate(
            {_id: req.params.id},
            data
        )
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Erreur lors de la récupération des conseillères',
            error: e.message,
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const response = await Commande.findOneAndDelete(
            {_id: req.params.id},
        )
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({
            message: 'Erreur lors de la récupération des conseillères',
            error: e.message,
        })
    }
}
