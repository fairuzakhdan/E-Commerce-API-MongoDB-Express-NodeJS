const mongoose = require('mongoose');
const Review = require('./Review');

const { Schema } = mongoose;

const productSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: Number,
  stock: Number,
  images: [{
    url: String,
    filename: String,
  }],
  status: {
    type: Boolean,
    default: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

productSchema.post('findOneAndDelete', async (product) => {
  if (product.reviews.length) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
