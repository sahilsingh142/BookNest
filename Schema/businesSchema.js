import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  
  category: {
    type: String,
    required: true,
  },

  businessName: {
    type: String,
    unique: true,
    required: true,
  },

  ownerName: {
    type: String,
    required: true,
  },

  village: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    unique: true,
    required: true,
  },

  services: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ]

});

export default mongoose.model("Business", businessSchema);