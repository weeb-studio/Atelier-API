const socket = require('socket.io')
const db = require('./api/models')
const Notification = db.notification

module.exports = (server) => {
    let io = socket(server, {
        cors: {
            origin: '*',
            method: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        socket.on('connect', () => {
            console.log('User connected!')
        })

        socket.on('disconnect', () => {
            console.log('User disconnected!')
        })

        socket.on('notify', async (data) => {
            try {
                const notification = new Notification(data)
                const response = await notification.save()
                io.emit('notify', response)
            } catch (e) {
                console.log(e)
            }
        })
    })
}
