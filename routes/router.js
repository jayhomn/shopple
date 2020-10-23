const router = require("express").Router(); //require express router

const Controller = require("../express_controllers/Controller.js");

router.get("/companies", Controller.companyListAll);
router.post("/companies", Controller.companyCreate);
router.get("/companies/:companyName", Controller.companyFindByName);
router.get("/companies/:companyName/sales", Controller.getAllSales);

router.get("/sales", Controller.saleListAll);
router.post("/companies/:companyName/sales", Controller.saleCreate);
router.delete("/companies/:companyName/sales/:saleID", Controller.saleDelete);

module.exports = router;