import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

var Usuario = new mongoose.Schema({
    username: String,
    password: String
});

Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);