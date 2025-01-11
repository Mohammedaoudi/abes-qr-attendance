const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const FiliereSchema=mongoose.Schema({

    nomFiliere:{type:String,required:true,unique:true},
    descriptionFiliere:{ type: String },
    shortNom:{ type: String },
    typeFiliere:{type:String},
    professeurs:[{type:mongoose.Schema.Types.ObjectId,ref:'Professeurs'}],
    // departements:{type:mongoose.Schema.Types.ObjectId,ref:'Departements'},
    semestres:[{type:mongoose.Schema.Types.ObjectId,ref:'Semestres'}],
    coordinateur:{type:mongoose.Schema.Types.ObjectId,ref:'Professeurs'},
    elements:[{type:mongoose.Schema.Types.ObjectId,ref:'Elements'}],


})
FiliereSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Filieres',FiliereSchema);