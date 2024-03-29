/* eslint-disable no-underscore-dangle */
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const getAllOrder = async (req, res) => {
  const orders = await Order.find({}).populate('orderItems');
  console.log(orders);
  res.status(200).json(orders);
  return res;
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } });
  res.status(200).json(order);
  return res;
};

const createOrder = async (req, res) => {
  try {
    // Pastikan req.body.orderItems adalah array
    if (!Array.isArray(req.body.orderItems)) {
      // Handle kesalahan atau kembalikan respons yang sesuai
      return res.status(400).json({ error: 'Order items should be an array' });
    }

    // Sekarang Anda dapat menggunakan map pada orderItems
    const orderItemsIds = await Promise.all(req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    }));

    const orderItemsIdsResolved = orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    }));

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      user: req.body.user,
      orderItems: orderItemsIdsResolved,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice,
    });
    order.user = req.user._id;
    order = await order.save();

    if (!order) return res.status(400).send('the order cannot be created!');

    res.status(201).json(order);
  } catch (err) {
    console.log('ini error pada :', err.message);
  }
  return res;
};

const updateOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findByIdAndUpdate(orderId, {
    status: req.body.status,
  }, { new: true });
  if (!order) {
    return res.status(400).send('pesanan tidak dapat diperbarui');
  }
  res.status(201).json({
    status: 'success',
    message: 'order success diupdate',
  });
  return res;
};

const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderId });
  if (!order) {
    res.status(404).json({
      status: 'fail',
      message: 'Order Not Found',
    });
    return res;
  }
  res.status(201).json({
    status: 'success',
    message: 'Order Successfully deleted',
  });
  return res;
};

module.exports = {
  getAllOrder, getOrderById, createOrder, updateOrderById, deleteOrderById,
};
