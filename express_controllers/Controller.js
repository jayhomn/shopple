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
exports.saleCreate = async (req, res) => {
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const company = req.params.companyName;

  const newSale = {
    amount: amount,
    description: description,
    company: company,
  };

  //check if company data exists in DB from companyName in request parameter
  if (await CompanyModel.exists({ companyName: company }) == true) {
    //if the company data does exist, proceed to add sale into db
    SaleModel.create(newSale)
      .then((sale) =>
        CompanyModel.findOneAndUpdate(
          { companyName: company },
          { $push: { sales: sale._id } },
          { new: true }
        )
      )
      .then((company) => res.json(company))
      .catch((error) => res.status(400).json(error));
  }
  else {
    res.status(404).json("Company does not exist")
  }


};

//delete sale by id
//note: responses aren't working properly but the request works as it should
exports.saleDelete = async (req, res) => {

  //find company by name and update the array containing the sale IDs (remove the sale id of the sale we want to delete)
  CompanyModel.findOneAndUpdate(
    { companyName: req.params.companyName },
    { $pull: { sales: req.params.saleID } },
    { returnNewDocument: true, maxTimeMS: 15000 })
    .catch((err) => res.status(400).json(err))

  //delete the sale data of the sale we wanna delete
  SaleModel.deleteOne({ _id: req.params.saleID })
    .then((sale) => res.json("Number of deleted items: " + sale.deletedCount))
    .catch((err) => res.status(400).json(err))
}