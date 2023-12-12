// import req from "express/lib/request.js";
import IncomeExpense from "../../models/incomeExpense/incomeExpense.js";
import httpStatus from "http-status";
export const createIncomeExpense = async (req, res) => {
  const data = req.body;
  const create = await IncomeExpense.create({
    amount: data.amount,
    desc: data.desc,
    type: data.type,
    user: req.user._id,
    category: data.categoryId,
  });
  res.status(httpStatus.CREATED).json({
    status: "Success",
    payload: create,
  });
};

export const getAllIncomeExpense = async (req, res) => {
  const get = await IncomeExpense.find({ user: req.user._id });
  res.status(httpStatus.OK).json({
    status: "Success",
    payload: get,
  });
};

export const getIncomeExpense = async (req, res) => {
  console.log("get single incomeExpense");
  const get = await IncomeExpense.findById(req.params.incomeExpenseId).populate(
    "user category"
  );
  console.log("get", get);
  if (!get) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "Error",
      payload: "IncomeExpense not found",
    });
    return;
  }
  res.status(httpStatus.OK).json({
    status: "Success",
    payload: get,
  });
};

export const updatedIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;
  const { amount, type, desc, categoryId } = req.body;
  console.log("updatedIncome", incomeExpenseId, amount, type, desc, categoryId);
  const exist = await IncomeExpense.findOne({ _id: incomeExpenseId });
  if (!exist) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "Error",
      payload: "incomeExpense not found",
    });
    return;
  }
  const updateIncomeExpense = await IncomeExpense.findByIdAndUpdate(
    { _id: categoryId },
    { type: type, amount: amount, desc: desc },
    { new: true }
  );
  console.log("updatedIncome", incomeExpenseId, amount, type, desc, categoryId);
  res.status(httpStatus.OK).json({
    status: "Success",
    payload: updateIncomeExpense,
  });
};

export const deleteIncomeExpense = async (req, res) => {
  const { incomeExpenseId } = req.params;
  const deleteincomeExpense = await IncomeExpense.findById({
    _id: incomeExpenseId,
  });
  if (!deleteincomeExpense) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "Error",
      payload: "incomeExpense not found",
    });
    return;
  }
  await IncomeExpense.findByIdAndUpdate({ _id: incomeExpenseId });
  res.status(httpStatus.OK).json({
    status: "Success",
    payload: "IncomeExpense deleled",
  });
};
