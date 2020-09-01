let CompanyModel = require("../models/company.model");
let SaleModel = require("../models/sale.model");

//Express function to get all companies
exports.companyListAll = async (req, res) => {
  let allCompanies = await CompanyModel.find();
  res.json(allCompanies);
};

//Express function to get company by name
exports.companyFindByName = async (req, res) => {
  let company = await CompanyModel.find({
    companyName: req.params.companyName,
  });
  res.json(company);
};

//Express function to create company
exports.companyCreate = (req, res) => {
  let newCompany = new CompanyModel(req.body);
  newCompany
    .save()
    .then(() => res.json("Company added."))
    .catch((err) => res.status(400).json("Error " + err));
};

//Express function to get all Sales from specific company
exports.getAllSales = async (req, res) => {
  let allSales = await CompanyModel.find({
    companyName: req.params.companyName,
  }).populate("sales");
  res.json(allSales);
};

//all sales regardless of company
exports.saleListAll = async (req, res) => {
  let allSales = await SaleModel.find();
  res.json(allSales);
};

//create sale
exports.saleCreate = (req, res) => {
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const endDate = Date.parse(req.body.endDate);
  const company = req.params.companyName;

  const newSale = {
    amount: amount,
    description: description,
    endDate: endDate,
    company: company,
  };

  SaleModel.create(newSale)
    .then((sale) =>
      CompanyModel.findOneAndUpdate(
        { companyName: company },
        { $push: { sales: sale._id } },
        { new: true }
      )
    )
    .then((company) => res.json(company))
    .catch((error) => res.json(error));
};
