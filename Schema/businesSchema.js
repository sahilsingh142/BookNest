import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  businessName: {
    type: String,
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