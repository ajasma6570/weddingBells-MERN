import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    reviewContent : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const cateringSchema = mongoose.Schema ({
    name: {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    description : { 
        type: String,
        required: true
    },
    minAmount : {
        type : Number,
        required : true
    },
    maxAmount : {
         type:  Number,
         required : true 
    },
    phone : {
        type : Number,
        required : true
    },
    pincode :{
         type: Number,
         required : true
    },
    image : {
        type: Array,
        required: false
    },
    providerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isActive : {
        type: Boolean,
        default : false
    },
    requestStatus : {
        type : String,
        default : false,
        default: "pending"
    },
    review : [reviewSchema]
},{
    timestamps: true
  })


  
const Catering = mongoose.model("Catering",cateringSchema)

export default Catering;