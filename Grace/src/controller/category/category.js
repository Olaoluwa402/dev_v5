import Category from "../../models/category/category.js";
import httpStatus from "http-status";

export const createCategory = async (req, res) => {
  const data = req.body;
  //check if name already exist
  console.log("data", data);
  const nameExist = await Category.findOne({
    name: data.name,
    userId: req.user._id,
  });
  if (nameExist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "category name already exist",
    });
    return;
  }
  //create the category
  const create = await Category.create({
    userId: req.user._id,
    name: data.name,
  });
  res.status(httpStatus.CREATED).json({
    status: "category successfully created",
    payload: create,
  });
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.categoryId).populate(
    "userId"
  );
  console.log("category id", req.params.categoryId);
  if (!category) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "Categoty not found",
    });
    return;
  }
  res.status(httpStatus.OK).json({
    status: "success",
    payload: category,
  });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find({ userId: req.user._id });
  res.status(httpStatus.OK).json({
    status: "success",
    payload: categories,
  });
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const exist = await Category.findOne({ _id: categoryId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "Category not found",
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
    payload: updatedCategory,
  });
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const exist = await Category.findOne({ _id: categoryId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: "Category not found",
    });
    return;
  }
  await Category.findByIdAndDelete({ _id: categoryId });
  res.status(httpStatus.OK).json({
    status: "success",
    payload: "category deleted",
  });
};
