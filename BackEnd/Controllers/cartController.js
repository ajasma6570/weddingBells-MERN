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
        const {userId, cateringId, form, to} = req.body;
      
        try {
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                Catering: {
                  venueId: cateringId,
                  from: form,
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
      }
      
}

export default cartController