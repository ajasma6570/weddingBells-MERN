import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
});

const Cart = mongoose.model("Cart",cartSchema)

export default Cart;