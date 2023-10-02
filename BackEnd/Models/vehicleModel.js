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
    amount : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        default : false
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    requestStatus : {
        type : Boolean,
        required: true,
        default: false
    },
    pincode : {
        type : Number,
        required: true
    },
    image: {
        type : Array,
        required: false
    },
    review : [reviewSchema]
})

const vehicle = mongoose.model("Vehicle",vehicelSchema)

export default vehicle;