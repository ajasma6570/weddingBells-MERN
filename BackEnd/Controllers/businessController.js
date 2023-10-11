import dotenv from "dotenv";
dotenv.config();
import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";
import MobileOTP from "../Models/MobileOTPModel.js";
import twilio from "twilio";
import otpGenerator from "otp-generator";
import Venue from "../Models/venueModel.js"
import Vehicle from '../Models/vehicleModel.js'

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;

const client = twilio(accountSid, authToken);

const businessController = {
  signUp: async (req, res) => {
    try {
      const { name, email, phone, address, city, state, pincode, password } =
        req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

      if (existingUser) {
        let message;
        if (existingUser.email === email) {
          message = "An account with this email already exists";
        } else if (existingUser.phone == phone) {
          message = "An account with this phone number already exists";
        }

        return res.json({ status: 409, message });
      }

      const HashedPassword = await bcrypt.hash(password, 10);
      const newUser = User({
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        isBusinessAccount: true,
        password: HashedPassword,
      });

      await newUser.save();
      res.status(200).json({
        status: 200,
        message: "Your Business account has been created successfully!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {

    try {
      const { email, password } = req.body;

      const UserFind = await User.findOne({ email });

      if (!UserFind) {
        return res.json({ status: 409, message: "User Not Found!!" });
      }

      const PasswordMatch = await bcrypt.compare(password, UserFind.password);

      if (PasswordMatch) {
        if (!UserFind.isAdmin && UserFind.isBusinessAccount) {
          if (!UserFind.isBlocked) {
            const businessRole = "business";
            const token = generateToken(UserFind.email, businessRole);
            return res.json({
              status: 200,
              message: "Business Account Loginned",
              Businessdetails: {
                id: UserFind._id,
                name: UserFind.name,
                email,
                phone: UserFind.phone,
                address: UserFind.address,
                city: UserFind.city,
                state: UserFind.state,
                pincode: UserFind.pincode,
                token: token,
              },
            });
          } else {
            return res.json({ status: 409, message: "Account Blocked" });
          }
        } else {
          return res.json({
            status: 409,
            message: "Entry is restricted; it's not a user account",
          });
        }
      } else {
        return res.json({ status: 409, message: "Password incorrect" });
      }
    } catch (error) {
      return res.json({ status: 409, message:error});

    }
  },
  configOTP: async (req, res) => {
    try {
      const phone = req.body.phone;
      const existingOTP = await MobileOTP.findOne({ phone });

      if (existingOTP) {
        await MobileOTP.deleteOne({ phone });
      }
      const userData = await User.findOne({ phone: phone });
      if (userData) {
        if (userData.isBlocked === false) {
          if (userData.isBusinessAccount === true) {
            const OTP = otpGenerator.generate(4, {
              digits: true,
              alphabets: false,
              upperCaseAlphabets: false,
              lowerCaseAlphabets: false,
              specialChars: false,
            });
            console.log(OTP);

            client.messages
              .create({
                body: `Welcome back to Your Weding Bells account, please enter the otp to Change Password ${OTP}`,
                from: twilioNum,
                to: "+918891645456",
              })
              .then(async () => {
                const HashedOTP = await bcrypt.hash(OTP, 10);

                const newOTP = new MobileOTP({
                  phone,
                  OTP: HashedOTP,
                });

                const result = await newOTP.save();

                res.status(200).json({
                  status: 200,
                  message:
                    "An OTP (One-Time Password) has been sent to your mobile number",
                });
              })
              .catch((error) => {
                res.json({ status: 500, message: "Error sending OTP" });
              });
          } else {
            res.json({ status: 400, message: "It's not a business Account" });
          }
        } else {
          // Handle the case when userData.block is not 0
          res.json({ status: 400, message: "User is blocked" });
        }
      } else {
        // Handle the case when userData is not found
        res.json({ status: 404, message: "User not found!!" });
      }
    } catch (error) {
      res.json({ status: 500, message: "internal sever error" });
    }
  },
  CheckOTP: async (req, res) => {
    try {
      const { OTP, phone } = req.body;

      const UserData = await MobileOTP.findOne({ phone: phone });
      if (UserData) {
        const MatchOTP = await bcrypt.compare(OTP, UserData.OTP);

        if (MatchOTP) {
          await MobileOTP.deleteOne({ phone: phone });
          res.json({ status: 200, message: "OTP verified Successfully" });
        } else {
          res.json({
            status: 400,
            message: "Your enteres OTP is wrong, Try again",
          });
        }
      } else {
        res.Json({ status: 400, message: "its an expired otp" });
      }
    } catch (error) {
      res.json({ status: 500, messgae: "internal server Error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { phone, password } = req.body;

      const HashedPassword = await bcrypt.hash(password, 10);

      const findUser = await User.updateOne(
        { phone: phone },
        { $set: { password: HashedPassword } }
      );

      return res.json({ status: 200, message: "Password reset successfully" });
    } catch (error) {
      return res.json({ status: 500, message: "internal server error" });
    }
  },
  createAccountOTP: async (req, res) => {
    try {
      const phone = req.body.phone;
      const existingOTP = await User.findOne({ phone: phone });

      if (existingOTP) {
        return res.json({
          status: 400,
          message: "An account with this phone number already exists",
        });
      }

      if (!existingOTP) {
        const OTP = otpGenerator.generate(4, {
          digits: true,
          alphabets: false,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        console.log(OTP);

        client.messages
          .create({
            body: `Welcome back to Your Weding Bells account, please enter the otp to Change Password ${OTP}`,
            from: twilioNum,
            to: "+918891645456",
          })
          .then(async () => {
            const HashedOTP = await bcrypt.hash(OTP, 10);

            const newOTP = new MobileOTP({
              phone,
              OTP: HashedOTP,
            });

            const result = await newOTP.save();

            res.status(200).json({
              status: 200,
              message:
                "An OTP (One-Time Password) has been sent to your mobile number",
            });
          })
          .catch((error) => {
            res.json({ status: 500, message: "Error sending OTP" });
          });
      }
    } catch (error) {
      return res.json({ status: 500, message: "internal server error" });
    } 
  }, 
  BusinessUpdateDetails : async(req,res) => {
    try{
      const userId = req.body.userId;
      const {name, email, phone, address, state, city, pincode } =req.body;

      const userFind = await User.findOne({ _id: userId });
      // if(phone.length !== 10){
      //   return res.json({ status: 400, message: "Please enter 10 digits phone number." });
      // }

      // if(pincode !== 6){
      //   return res.json({ status: 400, message: "Please enter 6 digit pincode" });

      // }

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
      
        const userDetails = await User.findOne({ _id: userId });

        return res.json({ status: 200, message: "Update details successfully" ,userdetails: {
          id: userDetails._id,
          name: userDetails.name,
          email:userDetails.email,
          phone: userDetails.phone,
          address: userDetails.address,
          city: userDetails.city,
          state: userDetails.state,
          pincode: userDetails.pincode,
        },});
      
    }catch(error){
      return res.json({ status: 500, message: "internal server error" });
    }
  },
  BusinessVenueAdd: async (req, res) => {
    const { name, city, capacity, phone, pincode, description, amount, userId } = req.body;
 
    const arrImages = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        arrImages.push(req.files[i].filename);
      }
    }

    try {
      const newVenue = new Venue({
        name,
        city,
        capacity,
        phone,
        pincode,
        description,
        amount,
        image: arrImages, // Assuming "images" is the field name for the uploaded images
        providerId: userId, // Assuming "provider" is another field
      });
  
      await newVenue.save();
  
      res.json({status:200, message: 'Venue saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving venue' });
    }
  },
  BusinessVehicleAdd: async(req, res) => {
    const { name, city, seatCapacity, model, phone, pincode, description, rentAmount, freeKms, extraKmsCharge, userId } = req.body;
 
    const arrImages = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        arrImages.push(req.files[i].filename);
      }
    }

    try {
      const newVehicle = new Vehicle({
        name,
        city,
        seatCapacity,
        model,
        phone,
        pincode,
        description,
        rentAmount,
        freeKilometer:freeKms,
        extraKilometerAmount:extraKmsCharge,
        image: arrImages, // Assuming "images" is the field name for the uploaded images
        providerId: userId, // Assuming "provider" is another field
      });
  
      await newVehicle.save();
  
      res.json({status:200,message: 'Vehicle saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving Vehicle' });
    }

  },
  BusinessCateringAdd : async(req, res) => {
    const { name, city, phone, pincode, description, minAmount, maxAmount, userId } = req.body;
 
    const arrImages = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        arrImages.push(req.files[i].filename);
      }
    }
    try {
      const newCatering = new Venue({
        name,
        city,
        phone,
        pincode,
        description,
        minAmount,
        maxAmount,
        image: arrImages, // Assuming "images" is the field name for the uploaded images
        providerid: userId, // Assuming "provider" is another field
      });
  
      await newCatering.save();
  
      res.status(200).json({ message: 'Catering saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving Catering' });
    }


  },
  RoleAuth : async(req,res) => {
    try{
      const role = req.role
      res.json({status:200,role:role,message :"Authenticated"})
    }catch(error){
      res.json({status:500, message:error})
    }
  }

  
     
}
 
export default businessController;
