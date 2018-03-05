var router = require('express').Router()
var Tracks = require('../models/track')
var Users = require('../models/user')

// GET FAVORITE TRACKS BY USER
router.get('/api/tracks', (req, res, next) => {
    Tracks.find({userId: req.session.uid}) // FINDS TRACKS TIED TO userId BY SETTING IT TO SESSION ID
        .then(tracks => {
            res.send(tracks)
        })
        .catch(next)
})

router.post('/api/tracks', (req, res, next) => {
    req.body.userId = req.session.uid // GIVES TRACK USER ID
    Users.findById(req.session.uid)
        .then(user => {
            req.body.user = user.username
            Tracks.create(req.body)
                .then(track => {
                    res.send(track)
                })
                .catch(next)
        })
        .catch(next)
})

router.put('/api/tracks/:trackId', (req, res, next) => {
    Tracks.findByIdAndUpdate(req.params.trackId, req.body)
        .then(track => {
            return res.send(track)
        })
        .catch(next)
})

router.delete('/api/tracks/:trackId', (req, res, next) => {
    Tracks.findByIdAndRemove(req.params.trackId)
        .then(track => {
            return res.send('Deleted Track!')
        })
        .catch(next)
})

module.exports = router