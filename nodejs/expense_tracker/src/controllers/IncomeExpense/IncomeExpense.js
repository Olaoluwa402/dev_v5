import IncomeExpense from "../../models/incomeExpense/incomeExpense.js";
import httpStatus from "http-status";

export const createIncomeExpense = async (req, res) => {
  const data = req.body;

  //create the IncomeExpense
  const incomeExpense = await IncomeExpense.create({
    amount: data.amount,
    desc: data.desc,
    type: data.type,
    user: req.user._id,
    category: data.categoryId,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: incomeExpense,
  });
};

export const getIncomeExpense = async (req, res) => {
  const incomeExpense = await IncomeExpense.findById(
    req.params.incomeExpenseId
  ).populate("user category");
  if (!incomeExpense) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: incomeExpense,
  });
};

export const getAllIncomeExpenses = async (req, res) => {
  const result = await IncomeExpense.find({ user: req.user._id });

  res.status(httpStatus.OK).json({
    status: "success",
    data: result,
  });
};

export const updateIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;
  const { amount, type, desc, categoryId } = req.body;
  const exist = await IncomeExpense.findOne({ _id: incomeExpenseId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  const updatedIncomeExpense = await IncomeExpense.findByIdAndUpdate(
    { _id: incomeExpenseId },
    { amount: amount, type: type, desc: desc, category: categoryId },
    { new: true }
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: updatedIncomeExpense,
  });
};

export const deleteIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;

  const exist = await IncomeExpense.findOne({ _id: incomeExpenseId });
  if (!exist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "IncomeExpense not found",
    });
    return;
  }

  await IncomeExpense.findByIdAndDelete({ _id: incomeExpenseId });

  res.status(httpStatus.OK).json({
    status: "success",
    data: "IncomeExpense deleted",
  });
};
