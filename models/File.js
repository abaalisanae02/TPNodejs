const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename:  {type: String},
    data: {type: Buffer}
});

module.exports = mongoose.model('File', fileSchema);