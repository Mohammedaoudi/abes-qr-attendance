const mongoose=require('mongoose')

const elementShema=mongoose.Schema({
   
    libelleElement: { type: String, unique: true, required: true },
    description: { type: String },
    seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seances',required: false}],
    professeurs: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeurs',required: false },
    filieres: { type: mongoose.Schema.Types.ObjectId, ref: 'Filieres',required: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required:false},
    semestre:{type:mongoose.Schema.Types.ObjectId,ref:'Semestres'}

})
module.exports=mongoose.model("Elements",elementShema);



