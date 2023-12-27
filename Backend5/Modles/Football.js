
const mongoose= require('mongoose')
const footballScheme= new mongoose.Schema({
 Team:{
 type:String,
 required:true
 },
    // Define your schema fields based on the CSV column
  
 "Games Played": Number,
 Win: Number,
 Draw: Number,
 Loss:Number,
 "Goals For":Number,
  "Goals Against":Number,
  
 Points:Number,
 Year: Number
})
module.exports= mongoose.model('Football',footballScheme,'FotballData')