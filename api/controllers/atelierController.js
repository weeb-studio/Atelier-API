const db = require('../models')
const moment = require('moment')
const Atelier = db.atelier

const update = async (item) => {
    const id = item._id
    const item_date = moment(item.program_date)
    const currentDate = moment()
    const isCurrentDay = item_date.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')
    const data = {status: isCurrentDay ? 'IN_COURSE' : 'FINISH'}
    await Atelier.findOneAndUpdate({_id: id}, data)
}

const changeStatus = async () => {
    const response = await Atelier.find({
        program_date: {$lt: new Date()},
        status: {$ne: 'FINISH'}
    })
    console.log(response.map(item => ({date: item.program_date, status: item.status})))
    response.forEach(update)
}

exports.createAtelier = async (req, res) => {
    try {
        const data = {
            ...req.body,
            conseillere: req.userId,
        }
        const response = await new Atelier(data).save()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.updateAtelier = async (req, res) => {
    try {
        const response = await Atelier.findOneAndUpdate({_id: req.params.id}, req.body)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.addNewSubscription = async (req, res) => {
    try {
        const newSubscription = req.body
        const atelier = await Atelier.findOne({_id: req.params.id})
        const subscriptions = [...atelier.subscriptions, newSubscription]
        const response = await atelier.update({subscriptions})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.deleteAtelier = async (req, res) => {
    try {
        const response = await Atelier.findOneAndDelete({_id: req.params.id})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.getAllAtelier = async (req, res) => {
    try {
        await changeStatus()
        const response = await Atelier.find().populate('conseillere hotesse').exec()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.getAteliersByStatus = async (req, res) => {
    try {
        await changeStatus()
        const response = await Atelier.find({status: req.params.status}).populate('conseillere hotesse').exec()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.getAllCityAteliers = async (req, res) => {
    try {
        await changeStatus()
        const response = await Atelier.find({city: req.params.city}).populate('conseillere hotesse').exec()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.getHotesseAteliers = async (req, res) => {
    try {
        await changeStatus()
        const response = await Atelier.find({hotesse: req.params.id}).populate('conseillere hotesse').exec()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}

exports.getConseillerAteliers = async (req, res) => {
    try {
        await changeStatus()
        const response = await Atelier.find({conseillere: req.params.id}).populate('conseillere hotesse').exec()
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Une erreur est survenue !',
            error: error.message,
        })
    }
}
