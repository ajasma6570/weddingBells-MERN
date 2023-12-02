import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true 
    },
    bookingId : {
        type: "string",
        require : true,
    },
    isCancelled : {
        type: Boolean,
        required: true,
        default : false
    },
    status : {
        type : String,
        required: true,
        default : "pending" //confirm //completed
    },
    GpayNumber: {
        type :Number,
        required: false,
    },
    cancelPaymentStatus :{
        type: String,
        required: false,
                  //processing  , Refund completed 
    },
    refundRefId : {
        type: String,
        required: false
    },
    venues: [
        {
            venueId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Venue",
                required: true,
            },
            bookedDates : []
        }
    ],
    Vehicle : [
        {
            vehicleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vehicle",
                required: true,
            },
            bookedDates : []
        }
    ],
    Catering : [
        {
            cateringId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Catering",
                required: true,
            },
            bookedDates : []
        }
    ]
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema)

export default Order;