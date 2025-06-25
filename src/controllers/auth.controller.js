// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Tìm user theo email
//     const user = await User.findOne({ email: username }).select("+password");

//     if (!user) {
//       return res.status(400).json({ message: "Email không tồn tại!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Mật khẩu không chính xác!" });
//     }

//     if (user.status !== "ACTIVE") {
//       return res.status(403).json({ message: "Tài khoản chưa được kích hoạt!" });
//     }

//     const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d"
//     });

//     user.password = undefined; // ẩn mật khẩu khỏi response
//     res.status(200).json({ access_token: accessToken, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Lỗi server!" });
//   }
// };

// exports.loginWithGoogle = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email không hợp lệ!" });
//     }

//     let user = await User.findOne({ email });

//     if (!user) {
//       // Tạo mới user nếu chưa tồn tại
//       user = await User.create({
//         fullName: email.split("@")[0],
//         email,
//         password: "GOOGLE_LOGIN", // dummy
//         status: "ACTIVE",
//         role: "USER"
//       });
//     }

//     const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d"
//     });

//     res.status(200).json({ access_token: accessToken, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Lỗi server!" });
//   }
// };
