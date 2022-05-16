const db = require("../models");

// create main Model
const Order = db.orders;

// 1. create order
const addOrder = async (req, res) => {
  const order = await Order.create({
    from_airport: req.body.from_airport,
    from_country: req.body.from_country,
    to_airport: req.body.to_airport,
    to_country: req.body.to_country,
    total: req.body.total,
    stripe_id: req.body.stripe_id,
    status: req.body.status,
  });
  res.status(200).send(order);
  console.log(order);
};

module.exports = {
  addOrder,
};
