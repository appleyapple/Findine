const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:cmpt470@findine.mexlh.mongodb.net/findine?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = db
