const Category = require('../models/Category');

const getAllCategory = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
  return res;
};

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  res.status(200).json(category);
  return res;
};

const createCategory = async (req, res) => {
  const categories = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  };
  const newCategory = new Category(categories);
  await newCategory.save();
  res.status(201).json({
    status: 'success',
    message: 'Categorie added Successfully',
  });
  return res;
};

const updateCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const categories = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  };
  const newCategory = await Category.findByIdAndUpdate(categoryId, categories, { new: true });
  await newCategory.save();
  res.status(201).json({
    status: 'success',
    message: 'Category berhasil diperbarui',
  });
  return res;
};

const deleteCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).json({
      status: 'fail',
      message: 'Category Not Found',
    });
  }
  await category.deleteOne();
  res.status(201).json({
    status: 'success',
    message: 'Category berhasil dihapus',
  });
  return res;
};

module.exports = {
  getAllCategory, getCategoryById, createCategory, updateCategoryById, deleteCategoryById,
};
