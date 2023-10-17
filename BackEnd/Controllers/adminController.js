import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";
import Venue from '../Models/venueModel.js'
import Vehicle from '../Models/vehicleModel.js'
import Catering from '../Models/cateringModel.js'

const adminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const adminFind = await User.findOne({ email });

      if (!adminFind) {
        return res.json({ message: "Account Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, adminFind.password);
      if (passwordMatch) {
        if (adminFind.isAdmin) {
          const adminRole = "admin";
          const token = generateToken(adminFind.email, adminRole);
          return res.status(200).json({
            status: 200,
            message: "Admin Loginned",
            adminDetails: {
              _id: adminFind._id,
              name: adminFind.name,
              email,
              phone: adminFind.phone,
              address: adminFind.address,
              city: adminFind.city,
              state: adminFind.state,
              pincode: adminFind.pincode,
              token: token,
            },
          });
        } else {
          return res.status(200).json({
            status: 409,
            message: "Entry is restricted; it's not a admin account",
          });
        }
      } else {
        return res
          .status(200)
          .json({ status: 409, message: "Password incorrect" });
      }
    } catch (error) {
      return res.json({status:500, error: error });
    }
  },
  userList: async (req, res) => {
    try {
      const userDetails = await User.find({
        $and: [{ isAdmin: false }, { isBusinessAccount: false }, {isDelete: false}],
      });
      return res.json({ status: 200, userdetails: userDetails });
    } catch (error) {
      return res.json({ status: 500, message: error });
    }
  },
  BusinessList: async (req, res) => {
    try {
        const BusinessDetails = await User.find({
        $and: [{ isAdmin: false }, { isBusinessAccount: true }, {isDelete: false}],
      });
      return res.json({ status: 200, businessDetails: BusinessDetails });
    } catch (error) {
      return res.json({ status: 500, message: error });
    }
  },
  userBlock: async (req, res) => {
    const { userId } = req.body;
    try {
      const userFind = await User.findOne({ _id: userId });

      if (!userFind) {
        return res.json({ status: 404, message: "User not found" });
      }
 
      // Update the isBlocked property
      userFind.isBlocked = !userFind.isBlocked;

      // Save the updated user document
      await userFind.save();

      return res.json({ status: 200, message: "User status updated successfully" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },
  deleteUser : async(req, res) => {
    const {userId} = req.body;
    try{

    const userFind = await User.findOne({_id:userId})
    if (!userFind) {
      return res.json({ status: 404, message: "User not found" });
    }

    userFind.isDelete = !userFind.isDelete;

    await userFind.save()
    return res.json({ status: 200, message: "User Deleted successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "Internal server error" });
  }

  },
  userDetail: async(req, res) => {
    const {userId} = req.body;
    try{
    const userDetail = await User.findOne({_id:userId})
    if (!userDetail) {
      return res.json({ status: 404, message: "User not found" });
    }
    
    return res.json({ status: 200, userdetail: userDetail });
  }catch (error) {
    return res.json({ status: 500, message: "Internal server error" });
  }
  },
  userDetailEdit : async(req,res) => {
    try{
      const {name, email, phone, address, state, city, pincode ,userId} =req.body;
      const userFind = await User.findOne({ _id: userId });

      if (!userFind) {
        return res.json({ status: 400, message: "User not found" });
      }
  
      // Check if the email already exists in another user's account
      const existingEmailUser = await User.findOne({ _id: { $ne: userId }, email: email });
      if (existingEmailUser) {
        return res.json({ status: 400, message: "Email already exists in another account" });
      }
  
      // Check if the phone number already exists in another user's account 
      const existingPhoneUser = await User.findOne({ _id: { $ne: userId }, phone: phone });
      if (existingPhoneUser) {
        return res.json({ status: 400, message: "Phone number already exists in another account" });
      }

      if(!userFind.isBusinessAccount && !userFind.isAdmin){
        const dataobj = {
          name,
          email,
          phone,
          address,
          state,
          city,
          pincode,
        };
  
        const addressData = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: dataobj },
          { new: true }
        );
      
        return res.json({ status: 200, message: "user details updated successfully"});

      }else{
        return res.json({ status: 400, message: "its not a user Account" });
      }
     
      
    }catch(error){
      return res.json({ status: 500, message: "internal server error" });
    }
  },
  businessAccountBlock : async(req,res) => {
    const { userId } = req.body;
    try {
      const userFind = await User.findOne({ _id: userId });

      if (!userFind) {
        return res.json({ status: 404, message: "User not found" });
      }
 
      // Update the isBlocked property
      userFind.isBlocked = !userFind.isBlocked;

      // Save the updated user document
      await userFind.save();

      return res.json({ status: 200, message: "Business Account status updated successfully" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },
  deleteBusinessAccount : async(req, res) => {
    const {userId} = req.body;
    try{

    const userFind = await User.findOne({_id:userId})
    if (!userFind) {
      return res.json({ status: 404, message: "User not found" });
    }

    userFind.isDelete = !userFind.isDelete;

    await userFind.save()
    return res.json({ status: 200, message: "Business Account Deleted successfully" });
  } catch (error) {
    return res.json({ status: 500, message: "Internal server error" });
  }

  },
  businessDetail: async(req, res) => {
    const {userId} = req.body;
    try{
    const userDetail = await User.findOne({_id:userId})
    if (!userDetail) {
      return res.json({ status: 404, message: "User not found" });
    }

    return res.json({ status: 200, userdetail: userDetail });
  }catch (error) {
    return res.json({ status: 500, message: "Internal server error" });
  }
  },
  businessDetailEdit : async(req,res) => {
    try{
      const {name, email, phone, address, state, city, pincode ,userId} =req.body;
      const userFind = await User.findOne({ _id: userId });

      if (!userFind) {
        return res.json({ status: 400, message: "User not found" });
      }
  
      // Check if the email already exists in another user's account
      const existingEmailUser = await User.findOne({ _id: { $ne: userId }, email: email });
      if (existingEmailUser) {
        return res.json({ status: 400, message: "Email already exists in another account" });
      }
  
      // Check if the phone number already exists in another user's account
      const existingPhoneUser = await User.findOne({ _id: { $ne: userId }, phone: phone });
      if (existingPhoneUser) {
        return res.json({ status: 400, message: "Phone number already exists in another account" });
      }

      if(userFind.isBusinessAccount && !userFind.isAdmin){
        const dataobj = {
          name,
          email,
          phone,
          address,
          state,
          city,
          pincode,
        };
  
        const addressData = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: dataobj },
          { new: true }
        );
      
        return res.json({ status: 200, message: "Account details updated successfully"});

      }else{
        return res.json({ status: 400, message: "Its not Business Account" });
      }

    }catch(error){
      return res.json({ status: 500, message: "internal server error" });
    }
  },
  venueRequestList : async(req, res) => {
    try {
      const venueRequestList =await Venue.find({requestStatus:"pending"})
      res.status(200).json({status:200,venueRequestList})
    } catch (error) {
      res.status(500).json({message:error})
    }
    
  },
  vehicleRequestList : async(req, res) => {
    try {
      const vehicleRequestList =await Vehicle.find({requestStatus:"pending"})
      res.status(200).json({status:200,vehicleRequestList})
    } catch (error) {
      res.status(500).json({message:error})
    }
    
  },
  cateringRequestList : async(req, res) => {
    try {
      const cateringRequestList =await Catering.find({requestStatus:"pending"})
      res.json({status:200,cateringRequestList})
    } catch (error) {
      res.json({status:500,message:error})
    }
  },
cateringRequestHandle : async(req, res) => {
  try {
    const {id, value} = req.body
    const updatedDocument = await Catering.findByIdAndUpdate(
      id,
      { requestStatus: value },
      { new: true } 
    );
  
    if (updatedDocument) {
      res.json({ status:200,message: 'Service status updated successfully', updatedDocument });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({message:error})

  }
},
venueRequestHandle : async(req, res) => {
  try {
  

    const {id, value} = req.body
    const updatedDocument = await Venue.findByIdAndUpdate(
      id,
      { requestStatus: value },
      { new: true } 
    );
  
    if (updatedDocument) {
      res.json({ status:200,message: 'Service status updated successfully', updatedDocument });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }

  } catch (error) {
    res.status(500).json({message:error})
  }
},
vehicleRequestHandle : async(req, res) => {
  try {
    const {id, value} = req.body
    const updatedDocument = await Vehicle.findByIdAndUpdate(
      id,
      { requestStatus: value },
      { new: true } 
    );
  
    if (updatedDocument) {
      res.json({ status:200,message: 'Service status updated successfully', updatedDocument });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({message:error})
  }
},
getActiveVenue : async(req, res) => {
  try {
    const venueRequestList =await Venue.find({requestStatus:"accept"})
    res.status(200).json({status:200,venueRequestList})
  } catch (error) {
    res.status(500).json({message:error})
  }
},
getActiveVehicle : async(req, res) => {
  try {
    const vehicleRequestList =await Vehicle.find({requestStatus:"accept"})
    res.status(200).json({status:200,vehicleRequestList})
  } catch (error) {
    res.status(500).json({message:error})
  }
},
getActiveCatering : async(req, res) => {
  try {
    const cateringRequestList =await Catering.find({requestStatus:"accept"})
    res.json({status:200,cateringRequestList})
  } catch (error) {
    res.json({status:500,message:error})
  }

}



  
};

export default adminController;
