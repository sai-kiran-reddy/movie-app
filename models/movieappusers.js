const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        firstName:{
            type:String,
            required:true
        },
        LastName:{
            type:String,
            required:true
        },
        emailId:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        favouriteMovies:{
            type:Array,
            required:false
        }
    },{timestamps : true}
)

const MovieUserModal = mongoose.model('userdata',userSchema);

module.exports = MovieUserModal;