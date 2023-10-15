import mongoose from 'mongoose'

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



const vehicelSchema = mongoose.Schema ({
    name: {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    seatCapacity : {
        type :Number,
        required : true
    },
    city : {
        type: String,
        required : true
    },
    model : {
        type : Number,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    service : {
        type : String,
        default : "vehicle"
    },
    freeKilometer : {
        type : Number,
        required : true
    },
    extraKilometerAmount : {
        type : Number,
        required : true
    },
    rentAmount : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        default : false
    },
    requestStatus : {
        type : String,
        required: true,
        default: "pending"
    },
    pincode : {
        type : Number,
        required: true
    },
    providerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    image: {
        type : Array,
        required: false
    },
    review : [reviewSchema]   
},{
    timestamps: true
  })

const vehicle = mongoose.model("Vehicle",vehicelSchema)

export default vehicle;