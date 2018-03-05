var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'User'
const SALT_FACTOR = 10;

var schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    songOrder : [{type: ObjectId, ref: 'Track'}],
    playlists : [{type: ObjectId, ref: 'Playlist'}]
})

// GENERATES THE HASH FROM THE PASSWORD WE PASS IT AND ENCRYPTS IT SALT X 13
schema.statics.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

// ENCRYPTS INPUTED PASSWORD AND CHECKS AGAINST SAVED ENCRYPTED PASSWORD
schema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}


module.exports = mongoose.model(schemaName, schema)
// pushed into user.songoger
