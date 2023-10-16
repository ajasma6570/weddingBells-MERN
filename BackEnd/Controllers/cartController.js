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
        console.log("started");
        const {userId} = req.body
        try{
          const cartDetails =await Cart.findOne({userId}).populate('venues.venueId').populate('Vehicle.vehicleId').populate('Catering.cateringId')
         console.log(cartDetails);
          res.json({status:200,cartDetails})
        }catch(error){
          return res.status(500).json({ error: 'Error updating cart' });

        }
        
      }
      
}

export default cartController