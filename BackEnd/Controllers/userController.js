import dotenv from 'dotenv'
dotenv.config()
import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";
import twilio from "twilio";
import otpGenerator from "otp-generator";
import MobileOTP from "../Models/MobileOTPModel.js";
import jwt from "jsonwebtoken"

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;

const client = twilio(accountSid, authToken);

const userController = {
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
        password: HashedPassword,
      });

      await newUser.save();

      res
        .status(200)
        .json({
          status: 200,
          message: "Your account has been created successfully!",
        });
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userRole = "user";
      const userFind = await User.findOne({ email });

      if (!userFind) {
        return res.json({ status: 409, message: "User Not Found!!!" });
      }

      if (!userFind.isBlocked) {
        if (!userFind.isAdmin && !userFind.isBusinessAccount) {
          const PasswordMatch = await bcrypt.compare(
            password,
            userFind.password
          );

          if (PasswordMatch) {
            const token = generateToken(userFind.email, userRole );
            res.json({
              status: 200,
              message: "User logged in.",
              userdetails: {
                id: userFind._id,
                name: userFind.name,
                email,
                phone: userFind.phone,
                address: userFind.address,
                city: userFind.city,
                state: userFind.state,
                pincode: userFind.pincode,
                token: token,
              },
            });
          } else {
            res.json({ status: 409, message: "Password incorrect" });
          }
        } else {
          return res.json({
            status: 409,
            message: "Entry is restricted; it's not a business account",
          });
        }
      } else {
        return res.json({ status: 409, message: "User Account Blocked!!" });
      }
    } catch (err) {
      return res.json({ status: 500, error: err.errors });
    }
  },
  configMobOTP: async (req, res) => {
    try {
      const phone = req.body.phone;
      const existingOTP = await MobileOTP.findOne({ phone });

      if (existingOTP) {
        await MobileOTP.deleteOne({ phone });
      }
      const userData = await User.findOne({ phone: phone });
      if (userData) {
        if (userData.isBlocked === false) {
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

              res
                .status(200)
                .json({
                  status: 200,
                  message:
                    "An OTP (One-Time Password) has been sent to your mobile number",
                });
            })
            .catch((error) => {
              res.json({ status: 500, message: "Error sending OTP" });
            });
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
  createAccountOTP : async(req, res) => {

    try {
      const phone = req.body.phone;
      const existingOTP = await User.findOne({ phone:phone });

      if (existingOTP) {
       return res.json({status:400,message:"An account with this phone number already exists"}); 
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

              res
                .status(200)
                .json({
                  status: 200,
                  message:
                    "An OTP (One-Time Password) has been sent to your mobile number",
                });
            })
            .catch((error) => {
              res.json({ status: 500, message: "Error sending OTP" });
            }); 
          }
      }catch (error) {
        return res.json({ status: 500, message: "internal server error" });
      }
  },
  
  
};

export default userController;
