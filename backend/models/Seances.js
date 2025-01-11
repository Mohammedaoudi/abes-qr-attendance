const mongoose=require('mongoose');


const SeanceShema=mongoose.Schema({


    nomSeance:{type:String},
    jour:{type:String,required:true},
    heureDebut:{type:String,required:true},
    heureFin:{type:String,required:true},
    semaine:{type:String,required:true},
    salle:{type:String},
    etudiants:[{type:mongoose.Schema.Types.ObjectId,ref:'Students'}],
 

    // other schemas
    professeur:{type:mongoose.Schema.Types.ObjectId,ref:'Professeurs'},
    element:{type:mongoose.Schema.Types.ObjectId,ref:'Elements'},

    
})
module.exports=mongoose.model('Seances',SeanceShema);