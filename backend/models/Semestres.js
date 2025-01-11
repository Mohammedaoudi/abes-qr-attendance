const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const SemestreSchema=mongoose.Schema({
    nomSemestre:{type: String,required:true,unique:true},
    filiere:{type:mongoose.Schema.Types.ObjectId,ref:'Filieres',required:false},
    elements:[{type:mongoose.Schema.Types.ObjectId,ref:'Elements'}],
    seances:[{type:mongoose.Schema.Types.ObjectId,ref:'Seances'}],
})

SemestreSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Semestres',SemestreSchema);