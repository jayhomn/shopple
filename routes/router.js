const router = require("express").Router(); //require express router

const Controller = require("../express_controllers/Controller.js");

router.get("/companies", Controller.companyListAll);
router.post("/companies", Controller.companyCreate);
router.get("/companies/:companyName", Controller.companyFindByName);
router.get("/companies/:companyName/sales", Controller.getAllSales);

router.get("/sales", Controller.saleListAll);
router.post("/companies/:companyName/sales", Controller.saleCreate);

module.exports = router;
// //If GET request on .../sales/, then respond with sales in JSON format
// //If there is an error, respond with error 400 and error message
// //find method is a mongoose method that returns a promise
// //This gets entire sale object list
// router.route("/").get((request, response) => {
//   Sale.find()
//     .then((sales) => response.json(sales))
//     .catch((error) => response.status(400).json("Error: " + error));
// });

// //POST request to add sale
// router.route("/add").post((request, response) => {
//   const company = { companyName: request.body.company };
//   const amount = Number(request.body.amount);
//   const description = request.body.description;
//   const endDate = Date.parse(request.body.endDate);

//   //create new sale
//   const newSale = new Sale({
//     company,
//     amount,
//     description,
//     endDate,
//   });

//   //Save new sale, and respond with error if unsuccessful
//   newSale
//     .save()
//     .then(() => response.json("Sale added."))
//     .catch((error) => response.status(400).json("Error: " + error));
// });

// //Object ids are created by mongodb

// //Get sale by id
// //GET request on .../sales/:id
// router.route("/:id").get((request, response) => {
//   Sale.findById(request.params.id)
//     .then((sale) => response.json(sale))
//     .catch((error) => response.status(400).json("Error: " + error));
// });

// //Delete sale by id
// //DELETE method on .../sales/:id
// router.route("/:id").delete((request, response) => {
//   Sale.findByIdAndDelete(request.params.id)
//     .then(() => response.json("Sale deleted."))
//     .catch((error) => response.status(400).json("Error: " + error));
// });

// //Update sale by id
// //UPDATE method on .../sales/:id
// router.route("/update/:id").post((request, response) => {
//   Sale.findById(request.params.id)
//     .then((sale) => {
//       sale.company = { companyName: request.body.company };
//       sale.amount = Number(request.body.amount);
//       sale.description = request.body.description;
//       sale.endDate = Date.parse(request.body.endDate);

//       sale
//         .save()
//         .then(() => response.json("Sale updated."))
//         .catch((error) => response.status(400).json("Error: " + error));
//     })
//     .catch((error) => response.status(400).json("Error: " + error));
// });

// module.exports = router;
