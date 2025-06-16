const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const fieldGruopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters!"]
    },
    description: {
      type: String,
      required: [true, "Description is required!"]
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    location: {
      address: {
        type: String,
        trim: true
      },
      province: {
        type: String,
        trim: true
      },
      district: {
        type: String,
        trim: true
      },
      required: [true, "Location is required!"]
    },
    images: { type: [String], required: [true, "Images is required!"] },
    status: {
      type: Number,
      default: 0 // true thì mới được kinh doanh
    }
  },
  { timestamps: true }
);

fieldGruopSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const FieldGroup = mongoose.model("FieldGroup", fieldGruopSchema);

module.exports = FieldGroup;
