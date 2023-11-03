import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay"
import crypto  from "crypto"
import Cart from '../Models/cartModel.js'
import Order from "../Models/orderModel.js"
import generateUniqueBookingID from "../utils/generateUniqueBookingID.js";



const paymentController = {

    orders : async (req, res) => { 
        try { 

            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY,
                key_secret:process.env.RAZORPAY_SECRET_KEY,
            });
    
            const options = {
                amount: req.body.amount * 100,
                currency: "INR",
                receipt: crypto.randomBytes(10).toString("hex"),
            };
    
            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Something Went Wrong!" });
                }
                res.status(200).json({ data: order });
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    },
    verify :async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                req.body.response;
                const userId = req.body.userId

            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
                .update(sign.toString())
                .digest("hex");
            if (razorpay_signature === expectedSign) {
                console.log("sucess");
                const cartDetails =await Cart.findOne({userId}).populate('venues.venueId').populate('Vehicle.vehicleId').populate('Catering.cateringId')
                
                if (cartDetails) {

                  const uniqueBookingID = generateUniqueBookingID();
                  const newOrderData = {
                    userId: userId,
                    bookingId:uniqueBookingID,
                    venues: [],
                    Vehicle: [],
                    Catering: [],
                  };
          
                  if (cartDetails.venues.length > 0) {
                    cartDetails.venues.forEach((venueItem) => {
                      newOrderData.venues.push({
                        venueId: venueItem.venueId._id,
                        bookedDates: venueItem.bookedDates,
                      });
                    });
                  }
          
                  if (cartDetails.Vehicle.length > 0) {
                    cartDetails.Vehicle.forEach((vehicleItem) => {
                      newOrderData.Vehicle.push({
                        vehicleId: vehicleItem.vehicleId._id,
                        bookedDates: vehicleItem.bookedDates,
                      });
                    });
                  }
          
                  if (cartDetails.Catering.length > 0) {
                    cartDetails.Catering.forEach((cateringItem) => {
                      newOrderData.Catering.push({
                        cateringId: cateringItem.cateringId._id,
                        bookedDates: cateringItem.bookedDates,
                      });
                    });
                  }
          
                  const newOrder = new Order(newOrderData);
          
                  try {
                    const savedOrder = await newOrder.save();
                    console.log('Saved order');
                  } catch (error) {
                    console.error('Error saving order:', error);
                  }
                    const deletedUser = await Cart.findOneAndDelete({ userId });

                    if (deletedUser) {
                      console.log(`User with ID ${userId} has been deleted.`);
                    } else {
                      console.log(`User with ID ${userId} not found or already deleted.`);
                    }
                    
                   
                    return res.status(200).json({ detail:uniqueBookingID,message: "Payment verified successfully" });

                  } else {
                    console.log("No cart");
                  }
               
            } else {
                console.log("400");
                return res.status(400).json({ message: "Invalid signature sent!" });
            }  
        } catch (error) {
            console.log("500");
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }
}

export default paymentController