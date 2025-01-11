const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');



const QrCodeShema=mongoose.Schema({
    code: { type: String, required: true },
    seance:{type:mongoose.Schema.Types.ObjectId,ref:'Seances'},
    
});

//QrCodeShema.plugin(uniqueValidator);

module.exports=mongoose.model('QrCodes',QrCodeShema);
