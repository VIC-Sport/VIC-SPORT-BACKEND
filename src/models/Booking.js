const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field"
    },
    date: { type: Date, required: true },
    timeSlot: String,
    startHour: Number, // 7
    endHour: Number, // 9
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

bookingSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
