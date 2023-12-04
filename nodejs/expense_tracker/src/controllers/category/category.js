import Category from "../../models/category/category.js";
import httpStatus from "http-status";

export const createCategory = async (req, res) => {
  const data = req.body;

  //check if name already exist
  const nameExist = await Category.findOne({ name: data.name });
  if (nameExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Category name already exist",
    });
    return;
  }

  //create the category
  const category = await Category.create({
    user: req.user._id,
    name: data.name,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: category,
  });
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId).populate(
    "user"
  );
  if (!category) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Category not found",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: category,
  });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find({ user: req.user._id });

  res.status(httpStatus.OK).json({
    status: "success",
    data: categories,
  });
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;

  const exist = await Category.findOne({ _id: categoryId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Category not found",
    });
    return;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: categoryId },
    { name: req.body.name },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedCategory,
  });
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  const exist = await Category.findOne({ _id: categoryId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Category not found",
    });
    return;
  }

  await Category.findByIdAndDelete({ _id: categoryId });

  res.status(httpStatus.OK).json({
    status: "success",
    data: "category deleted",
  });
};
