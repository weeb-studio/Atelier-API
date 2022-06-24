const db = require('../models')
const Notification = db.notification

exports.getAll = async (req, res) => {
    try {
        const response = await Notification.find()
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(401).json({message: e.message})
    }
}

exports.create = async (req, res) => {
    try {
        const notification = new Notification(req.body)
        const response = await notification.save()
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(402).json({
            message: e.message,
        })
    }
}

exports.update = async (req, res) => {
    try {
        const response = await Notification.findOneAndUpdate({_id: req.params.id}, req.body)
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(402).json({
            message: e.message,
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const response = await Notification.findOneAndDelete({_id: req.params.id})
        res.json(response)
    } catch (e) {
        console.log(e)
        res.status(402).json({
            message: e.message,
        })
    }
}

const deleteNotification = async (item) => await Notification.findOneAndDelete({_id: item})

exports.deleteMany = async (req, res) => {
    try {
        req.body.ids.forEach(deleteNotification)
        res.json({status: 'OK'})
    } catch (e) {
        console.log(e)
        res.status(402).json({
            message: e.message,
        })
    }
}

const notificationIsRead = async (item) => await Notification.findOneAndUpdate({_id: item}, {is_read: true})

exports.asRead = async (req, res) => {
    try {
        req.body.ids.forEach(notificationIsRead)
        res.json({status: 'OK'})
    } catch (e) {
        console.log(e)
        res.status(402).json({
            message: e.message,
        })
    }
}
