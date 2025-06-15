const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const avatar = require("../../public/images/avatar/avatar-default.png");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Họ và tên không được để trống!"],
      trim: true,
      maxlength: [50, "Họ và tên không được vượt quá 50 ký tự!"]
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại không được để trống!"],
      unique: true,
      trim: true,
      match: [
        /^0((3[2-9])|(5[6|8|9])|(7[0|6-9])|(8[1-5|8|9])|(9[0-9]))\d{7}$/,
        "Số điện thoại không hợp lệ!"
      ]
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      default: null,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng!"
      ]
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender"
      },
      default: null
    },
    dateOfBirth: {
      type: Date,
      default: null
    },
    address: {
      province: {
        type: String,
        trim: true
      },
      district: {
        type: String,
        trim: true
      },
      default: null
    },
    avatar: {
      type: String,
      default: avatar
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    reward_point: {
      type: Number,
      default: 0,
      min: [0, "Điểm thưởng không thể là số âm!"]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      select: false
    },
    verificationTokenExpires: {
      type: Date,
      select: false
    },
    status: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "owner", "admin"],
        message: "{VALUE} is not a valid role"
      },
      required: [true, "Role is required"],
      default: "customer"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    suppressReservedKeysWarning: true
  }
);

// Indexes for better query performance
userSchema.index({ role: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ status: 1 });
userSchema.index({ phone: 1 });

// Virtual for full user info
userSchema.virtual("fullInfo").get(function () {
  return `${this.fullName} (${this.phone}) - ${this.role}`;
});

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const User = mongoose.model("User", userSchema);

module.exports = User;
