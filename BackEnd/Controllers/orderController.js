import Order from "../Models/orderModel.js"

const orderController = {

    getOrderDetail : async(req,res)=> {
        const {userId} = req.body;
        try{
        const orderDetails = await Order.find({ userId })
        .populate('venues.venueId')
        .populate('Vehicle.vehicleId')
        .populate('Catering.cateringId')
        
       
          const combinedOrders ={
            Venues:[],
            Vehicle:[],
            Catering:[]
          }


          orderDetails.forEach((order) => {
            if (order.venues.length > 0 && !order.isCancelled)  {
              const venue = {
                _id: order._id,
                userId: order.userId,
                bookingId: order.bookingId,
                orderStatus: order.status,
                isCancelled: order.isCancelled,
                orderdate: order.createdAt,
                venues: order.venues.map((venue) => ({
                  ...venue.venueId.toObject(),
                  bookedDates: venue.bookedDates,
                  _id: venue._id,
                })),
              }; 
              combinedOrders.Venues.push(venue);
            }
      
            if (order.Vehicle.length > 0 && !order.isCancelled) {
              const vehicle = {
                _id: order._id,
                userId: order.userId,
                bookingId: order.bookingId,
                orderStatus: order.status,
                isCancelled: order.isCancelled,
                orderdate: order.createdAt,
                Vehicle: order.Vehicle.map((vehicle) => ({
                  ...vehicle.vehicleId.toObject(),
                  bookedDates: vehicle.bookedDates,
                  _id: vehicle._id,
                })),
              };
              combinedOrders.Vehicle.push(vehicle);
            }
      
            if (order.Catering.length > 0 && !order.isCancelled) {
              const catering = {
                _id: order._id,
                userId: order.userId,
                bookingId: order.bookingId,
                orderStatus: order.status,
                isCancelled: order.isCancelled, 
                orderdate: order.createdAt,
                Catering: order.Catering.map((catering) => ({
                  ...catering.cateringId.toObject(),
                  bookedDates: catering.bookedDates,
                  _id: catering._id,
                })),
              };
              combinedOrders.Catering.push(catering); 
            }
          });
        res.json({status:200,combinedOrders})
 
        }catch(error){
          return res.status(500).json({ error });
        }
    },  

    cancelOrder:async(req, res)=> {
      try{

      const {itemId,GpayNumber} = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        itemId,
        {
          $set: {
            isCancelled: true,
            GpayNumber: GpayNumber,
            cancelPaymentStatus: "Processing",
            status:"Cancelled by user" // You can set the desired payment status
          },
        },
        { new: true }
      );
    
      if (!updatedOrder) {
        return res.json({ status: 404 });
      }

      res.json({status:200}) 

      }catch(error){
        return res.status(500).json({ error });
      }
    },

    getCancelOrder :async(req, res)=> {
      
      const {userId} = req.body;
      try{
      const orderDetails = await Order.find({ userId })
      .populate('venues.venueId')
      .populate('Vehicle.vehicleId')
      .populate('Catering.cateringId')
      
     
        const cancelOrders ={
          Venues:[],
          Vehicle:[],
          Catering:[]
        }


        orderDetails.forEach((order) => {
          if (order.venues.length > 0 && order.isCancelled)  {
            const venue = {
              _id: order._id,
              userId: order.userId,
              bookingId: order.bookingId,
              orderStatus: order.status,
              isCancelled: order.isCancelled,
              orderdate: order.createdAt,
              refundStatus: order.refundRefId,
              updateDate:order.updatedAt,
              cancelPaymentStatus: order.cancelPaymentStatus,
              venues: order.venues.map((venue) => ({
                ...venue.venueId.toObject(),
                bookedDates: venue.bookedDates,
                _id: venue._id,
              })),
            };
            cancelOrders.Venues.push(venue);
          }
    
          if (order.Vehicle.length > 0 && order.isCancelled) {
            const vehicle = {
              _id: order._id,
              userId: order.userId,
              bookingId: order.bookingId,
              orderStatus: order.status,
              isCancelled: order.isCancelled,
              refundStatus: order.refundRefId,
              orderdate: order.createdAt,
              updateDate:order.updatedAt,
              cancelPaymentStatus: order.cancelPaymentStatus,
              Vehicle: order.Vehicle.map((vehicle) => ({
                ...vehicle.vehicleId.toObject(),
                bookedDates: vehicle.bookedDates,
                _id: vehicle._id,
              })),
            };
            cancelOrders.Vehicle.push(vehicle);
          }
    
          if (order.Catering.length > 0 && order.isCancelled) {
            const catering = {
              _id: order._id,
              userId: order.userId,
              bookingId: order.bookingId,
              orderStatus: order.status,
              isCancelled: order.isCancelled, 
              refundStatus: order.refundRefId,
              orderdate: order.createdAt,
              updateDate:order.updatedAt,
              cancelPaymentStatus: order.cancelPaymentStatus,
              Catering: order.Catering.map((catering) => ({
                ...catering.cateringId.toObject(),
                bookedDates: catering.bookedDates,
                _id: catering._id,
              })),
            };
            cancelOrders.Catering.push(catering); 
          }
        });

      res.json({status:200,cancelOrders})

      }catch(error){
        return res.status(500).json({ error });
      }
    },
    adminGetOrderUserDetails :async(req, res)=> {
      try {
        const userData = await Order.find({ isCancelled: "false" }).populate('userId');
        userData.reverse();
        res.json({ status: 200, userData });
      } catch (error) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    },
    viewOrderDetails : async(req, res) => {
      const {userId} = req.body
      try{
        const orderDetails =await Order.findOne({_id:userId}).populate('venues.venueId').populate('Vehicle.vehicleId').populate('Catering.cateringId').populate("userId")
        res.json({status:200,orderDetails})
      }catch(error){
        return res.status(500).json({ error: 'Error updating cart' });

      }
      
    },
    adminGetOrderCancelUserDetails :async(req, res)=> {
      try {
        const userData = await Order.find({ isCancelled: "true" }).populate('userId');
        userData.reverse();
        res.json({ status: 200, userData });
      } catch (error) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      }
    }
   
}

export default orderController ;