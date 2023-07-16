const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String
    },
    status: {
      type: String
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQyMzFhZjRkNjBmZTIxMjFiNTYzMCIsImlhdCI6MTY4NTg5NTQwNSwiZXhwIjoxNjg2MzI3NDA1fQ.rmbdVWX6laR1xxA7zQhaqGIHjFJYj4wZQfy8LpUz-DweyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQyMzFhZjRkNjBmZTIxMjFiNTYzMCIsImlhdCI6MTY4NTg5NTQwNSwiZXhwIjoxNjg2MzI3NDA1fQ.rmbdVWX6laR1xxA7zQhaqGIHjFJYj4wZQfy8LpUz-Dw
// eyJpZCI6IjY0MjQyMzFhZjRkNjBmZTIxMjFiNTYzMCIsImlhdCI6MTY4NzI1MTgzMSwiZXhwIjoxNjg3NjgzODMxfQ.Gk01RTeKjb7RpDjHmK4qzRnOFPVgL1721YS7EKH0VTU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQyMzFhZjRkNjBmZTIxMjFiNTYzMCIsImlhdCI6MTY4NzI1MTk3OCwiZXhwIjoxNjg3NjgzOTc4fQ.PVRkx81pKQbozD2IFrT73JIQ3CzhqhDrNiw5qvNv5JM