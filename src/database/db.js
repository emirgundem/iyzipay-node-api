import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import nanoid  from 'nanoid'

const {Schema} = mongoose;

const {ObjectId} = Schema.Types;


const randomColorGenerator = () => {
    return Math.floor(Math.random() * 16777215).toString(16)

} 

console.log(randomColorGenerator())

const userSchema = new Schema({
    uid: {
        type : String,
        default : nanoid(),
        unique : true,
        required : true
    },

    locale : {
        type : String,
        required : true,
        default : 'TR',
        enum : ["tr","en" ]

    },

    role : {
        type : String,
        required : true,
        default : "user",
        enum : ["user","admin"]
        
    }

})