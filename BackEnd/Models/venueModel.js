import mongoose, { mongo } from "mongoose";

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

const venueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type : Number,
        required: true
    },
    phone: {
        type : Number,
        required: true
    },
    description: {
        type : String,
        required: true  
    },
    amount: {
        type : Number,
        required: true
    },
    pincode : {
        type: Number,
        required : true
    },
    isActive : {
        type: Boolean,
        required:true,
        default: false
    },
    requestAccept : {
        type : Boolean,
        required: true,
        default: false
    },
    service: {
        type: String,
        default: "venue"
    },
    city: {
        type: String,
        required: true
    },
    providerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    image: {
        type : Array,
        required: true
    },
    review : [reviewSchema]

},{
    timestamps: true
  });

const Venue = new mongoose.model("Venue",venueSchema);

export default Venue;