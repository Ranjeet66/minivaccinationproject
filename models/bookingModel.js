const mongoose =require("mongoose")
const mongoosePaginate = require('mongoose-paginate')
const Schema =mongoose.Schema

const bookingSchema = new Schema({
    userId:{
        type:String
    },
    slotTime:{
        type:String
    },
    email:{
        type:String
    },
    slotDate:{
        type:String
    },
    slotCenter:{
        type:String
    },
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    status:{
        type:String,
        enum:["BOOKED","PENDING","INQUERY"],
        default:"PENDING"
    },
    },
    {
        timestamps:true
})

bookingSchema.plugin(mongoosePaginate)  
let bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel