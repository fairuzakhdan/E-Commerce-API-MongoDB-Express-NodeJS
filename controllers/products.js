/* eslint-disable arrow-parens */
const Product = require('../models/Product');
// eslint-disable-next-line import/order
const fs = require('fs');
const ErrorHandler = require('../utils/errorHandler');

const getAllProduct = async (req, res) => {
  const products = await Product.find({}).populate('category');
  res.status(200).json({
    products,
  });
  return res;
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.status(200).json({
    status: 'success',
    product,
  });
  return res;
};

const createProduct = async (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name) {
    res.status(400).json({
      status: 'fail',
      message: 'please input product name',
    });
    return res;
  }
  const images = req.files && req.files.length > 0 ? req.files.map(file => ({
    url: file.path,
    filename: file.filename,
  })) : [];
  const products = new Product({
    code: newProduct.code,
    name: newProduct.name,
    description: newProduct.description,
    category: newProduct.category,
    price: newProduct.price,
    stock: newProduct.stock,
    images,
    status: newProduct.status,
  });
    // eslint-disable-next-line no-underscore-dangle
  products.author = req.user._id;
  await products.save();
  res.status(201).json({
    status: 'success',
    message: 'Product added Successfully',
  });
  return res;
};

const updateProductById = async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndUpdate(productId, req.body, { new: true });
  res.status(201).json({
    status: 'success',
    message: 'Product berhasil diupdate',
  });
  return res;
};

const deleteproductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId });
  if (!product) {
    res.status(404).json({
      status: 'fail',
      message: 'Product Not Found',
    });
    return res;
  }
  if (product.images && product.images.length > 0) {
    product.images.forEach(image => {
      fs.unlink(image.url, err => new ErrorHandler(err));
    });
  }
  res.status(201).json({
    status: 'success',
    message: 'Product berhasil didelete',
  });
  return res;
};

module.exports = {
  getAllProduct, createProduct, getProductById, updateProductById, deleteproductById,
};
