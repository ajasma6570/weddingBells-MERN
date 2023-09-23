import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/tokenGenerator.js";

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
          const token = generateToken(adminFind.email, adminRole );
          return res.status(200).json({
            status: 200,
            message: "Admin Loginned",
            adminDetails: {
              id: adminFind._id,
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
          return res
            .status(200)
            .json({
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
      return res.status(500).json({ error: error });
    }
  },
};

export default adminController;
