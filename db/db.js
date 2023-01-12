const mongoose = require('mongoose');




// create new Schema
const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName:{
        type:String,
        default:'Ag'
    },
    Age: {
        type: Number,
        min:1,
        max:100,
    },
    Adresse:{
        City:String,
        Neighborhood:String
    },
    Hobbies: {
        type: [{
            msj: {
                type: String,
                default: "Hello"
            }
        }],
        default: [{msj:"10"},{msj:"20"}],
    },
    Email: {
        type: String,
        required:true,
        lowercase:true
    },
    Password:{
        type:String,
        required:true,
        lowercase:true,
        validate:{
            validator: (e)=> e.length > 8,
            message: props => `the password length sould be greater than 8`
        }
    },
    Date:{
        type: Date,
        default:() => new Date()
    }
    
  });

module.exports=mongoose.model('User', userSchema);
  