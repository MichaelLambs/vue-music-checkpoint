var router = require('express').Router()
var Tracks = require('../models/track')
var Users = require('../models/user')
var Playlists = require('../models/playlist')

router.get('/api/playlists', (req, res, next) => {
    Playlists.find({userId: req.session.uid}) // FINDS PLAYLISTS TIED TO userId BY SETTING IT TO SESSION ID
        .then(playlist => {
            res.send(playlist)
        })
        .catch(next)
})

router.get('/api/playlists/:playlistId', (req, res, next) => {
    Playlists.find({playlistId: req.params.playlistId})
        .then(playlist => {
            res.send(playlist)
        })
        .catch(next)
})

router.post('/api/playlists', (req, res, next) => {
    req.body.userId = req.session.uid // GIVES PLAYLIST USER ID
    Users.findById(req.session.uid)
        .then(user => {
            req.body.user = user.username
            Playlists.create(req.body)
                .then(playlist => {
                    res.send(playlist)
                })
                .catch(next)
        })
        .catch(next)
})


router.put('/api/playlists/:playlistId', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.playlistId, req.body)
        .then(playlist => {
            return res.send(playlist)
        })
        .catch(next)
})

router.delete('/api/playlists/:playlistId', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.playlistId)
        .then(playlist => {
            return res.send('Deleted Track!')
        })
        .catch(next)
})


module.exports = router