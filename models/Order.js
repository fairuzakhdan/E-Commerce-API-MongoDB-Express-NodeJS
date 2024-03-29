const mongoose = require('mongoose');
const OrderItem = require('./OrderItem');

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true,
  }],
  shippingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.post('findOneAndDelete', async (doc) => {
  if (doc.orderItems.length) {
    await OrderItem.deleteMany({ _id: { $in: doc.orderItems } });
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
