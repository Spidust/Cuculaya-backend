const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Acc = new Schema({
    images: {type: Array, required: true},
    thumb: {type: String, required: true},
    desc: String,
    idAcc: Number,
    price: String
})

Acc.plugin(AutoIncrement, {inc_field: 'idAcc'});
const AccModel = mongoose.model('Acc', Acc);

module.exports = AccModel;