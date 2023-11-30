import CategoryModel from "../../Models/Category.js";
import httpStatus from "http-status";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const nameExist = await CategoryModel.findOne({ name: name });
    if (nameExist) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        payload: "Name already Exist",
      });
      return;
    }

    const createName = await CategoryModel.create({
      name,
    });
    res.status(httpStatus.CREATED).json({
      status: "success",
      payload: createName,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(httpStatus.OK).json({
      status: "success",
      payload: categories,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  const catId = req.params.id;

  try {
    const category = await CategoryModel.findById({_id: catId });
    if (!category) {
      res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        payload: "Category Not Found",
      });
      return;
    }
    res.status(httpStatus.OK).json({
      status: "success",
      payload: category,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      payload: error.message,
    });
  }
};
