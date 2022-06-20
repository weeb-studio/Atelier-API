const db = require('../models')
const Commande = db.hotesse_commande

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
            hotesse: req.userId
        }
        const commande = new Commande(data)
        const response = await commande.save()
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
