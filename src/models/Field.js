const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const fieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters!"]
    },
    type: {
      type: String,
      required: [true, "Sports type is required!"],
      enum: ["football", "tennis", "basketball", "badminton"]
    },
    fieldGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FieldGroup",
      required: true
    },
    pricePerHour: {
      type: Number,
      required: true
    },
    images: {type: [String], required: true},
    isAvailable: {
      type: Boolean,
      default: true
    },
    note: String,
    status: {
      type: Number,
      default: flase
    },
  },
  { timestamps: true }
);

fieldSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;
