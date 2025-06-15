const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const bookingSchema = new mongoose.Schema(
  {
    });

bookingSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
