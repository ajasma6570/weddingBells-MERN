import Cart from "../Models/cartModel.js";


const cartController = {
    venueCart : async (req, res) => {
        const {userId, venueId, from, to} = req.body;
        try { 
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                venues: {
                  venueId: venueId, 
                  from: from,
                  to: to
                }
              }
            },
            { upsert: true, new: true }
          );
        
          return res.json({status:200,message:"added to cart Successfully",updatedCart});
        } catch (err) {
          return res.status(500).json({ error: 'Error updating cart' });
        }
      },
      vehicleCart : async (req, res) => {
        const {userId, vehicleId, from, to} = req.body;
      
        try {
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                Vehicle: {
                  vehicleId: vehicleId,
                  from: from,
                  to: to
                }
              }
            },
            { upsert: true, new: true }
          );
        
          return res.json({status:200,message:"added to cart Successfully",updatedCart});
        } catch (err) {
          return res.status(500).json({ error: 'Error updating cart' });
        }
      },
      cateringCart : async (req, res) => {
        const {userId, cateringId, from, to} = req.body;
      
        try {
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                Catering: {
                  cateringId: cateringId,
                  from: from,
                  to: to
                }
              }
            },
            { upsert: true, new: true }
          );
        
          return res.json({status:200,message:"added to cart Successfully",updatedCart});
        } catch (err) {
          return res.status(500).json({ error: 'Error updating cart' });
        }
      },
      getCartDetails : async(req, res) => {
        const {userId} = req.body
        try{
          const cartDetails =await Cart.findOne({userId}).populate('venues.venueId').populate('Vehicle.vehicleId').populate('Catering.cateringId')
          res.json({status:200,cartDetails})
        }catch(error){
          return res.status(500).json({ error: 'Error updating cart' });

        }
        
      },
      removeCartItem: async (req, res) => {
        try {
          const { userId, itemId, service } = req.body;
      
          if (service === "venues" || service === "Vehicle" || service === "Catering") {
            try {
              const result = await Cart.updateOne(
                { userId },
                { $pull: { [service]: { _id: itemId } } }
              );
      
              if (result.acknowledged) {
                if (result.matchedCount > 0 && result.modifiedCount > 0) {



                  const cart = await Cart.findOne({ userId });
                  if (
                    !cart.venues.length &&
                    !cart.Vehicle.length &&
                    !cart.Catering.length
                  ) {
                    // Delete the user's cart
                    await Cart.deleteOne({ userId });
                  }

                  res.json({ status: 200, message: "Item removed successfully" });
                } else {
                  res.json({ status: 404, message: `Item not found in the ${service}` });
                }
              } else {
                res.json({ status: 404, message: "Update operation not acknowledged" });
              }
            } catch (error) {
              res.status(500).json({ error: "An error occurred while removing the item" });
            }
          } else {
            res.status(400).json({ error: "Invalid service type" });
          }
        } catch (error) {
          res.status(500).json({ message: error });
        }
      }
      
      
}

export default cartController