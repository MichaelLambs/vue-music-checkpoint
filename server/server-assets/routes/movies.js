var router = require('express').Router()
var Tracks = require('../models/track')
var Users = require('../models/user')

// GET FAVORITE TRACKS BY USER
router.get('/api/track/:userId', (req,res,next) => {
    Tracks.findById(req.params.userId)
        .then(tracks => {
            res.send(tracks)
        })
        .catch(next)
})

router.post(/)