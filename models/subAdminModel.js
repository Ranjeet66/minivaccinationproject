const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const subAdminSchema= new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    dateOfBirth: {
      type: String
    }, 
    profilePic: {
      type: String
    },
    address: {
        type: String
    },
    otp:{
        type:String
    },
    otpExpireTime:{
        type:Number,
        allowNull: true
    },
    otpVerify:{
        type:Boolean,
        default:false
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:'address'
      },     
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    userType:{
        type:String,
        enum:["ADMIN","SUB-ADMIN","USER"],
        default:"SUB-ADMIN"
    }
},
{ timestamps: true }
);

subAdminSchema.plugin(mongoosePaginate)  
const subAdminModel = mongoose.model('subAdmin',subAdminSchema);
module.exports = subAdminModel

subAdminModel.findOne(
    { status: { $ne: "DELETE" }, userType: "ADMIN" },
    (userErr, userRes) => {
      if (userErr) {
      } else if (userRes) {
        console.log("Default admin already exist");
      } else {
        let admin = {
          firstName: "Ranjeet",
          lastName: "Singh",
          email: "usergmail",
          mobileNumber: 1234567890,
          password: bcrypt.hashSync("12345678901"),
          userType: "ADMIN",
          otpVerify: true,
        };
        subAdminModel(admin).save((saveErr, saveAdmin) => {
          if (saveErr) {
          } else {
            console.log("Default admin created");
          }
        });
      }
    }
   ); 
