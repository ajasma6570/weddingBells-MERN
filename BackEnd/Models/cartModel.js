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
            from: {
                type: String,
                required: true 
            },
            to: {
                type: String,
                required: true,
            }
        }
    ],
    Vehicle : [
        {
            vehicleId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vehicle",
                required: true,
            },
            from: {
                type: String,
                required:true 
            },
            to: {
                type: String,
                required: true,
            }
        }
    ],
    Catering : [
        {
            cateringId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Catering",
                required: true,
            },
            from: {
                type: String,
                required:true 
            },
            to: {
                type: String,
                required: true,
            }
        }
    ]
});

const Cart = mongoose.model("Cart",cartSchema)

export default Cart;