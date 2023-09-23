import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";

const businessController = {
  signUp: async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        password,
      } = req.body;

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
      res
        .status(200)
        .json({
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
      console.log(error);
    }
  },
};

export default businessController;
