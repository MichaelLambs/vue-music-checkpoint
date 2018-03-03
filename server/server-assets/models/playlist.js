var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Playlist'

var schema = new Schema({
    name: { type: String, required: true},
    userId: {type: ObjectId, ref: 'User'},
    song: {type: Array, default: []},
    trackId: {type: ObjectId, ref: 'Track'},
    trackLike: {type: Number, default: 1}
})

module.exports = mongoose.model(schemaName, schema)
