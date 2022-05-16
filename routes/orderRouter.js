// import controllers review, products
const orderController = require("../controllers/orderController");

// router
const router = require("express").Router();

// use routers
router.post("/addOrder", orderController.addOrder);

module.exports = router;
