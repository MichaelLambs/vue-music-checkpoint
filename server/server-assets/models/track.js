var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Track'

var schema = new Schema({
    artistName: { type: String},
    trackName: { type: String},
    previewUrl: {type: String},
    artworkUrl100: {type: String},
    userId: {type: ObjectId, ref: 'User'},
    trackLike: {type: Number, default: 0}
})

module.exports = mongoose.model(schemaName, schema)
