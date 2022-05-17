const express = require("express");
const csvtojson = require("csvtojson");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/convertToJson", function (req, res) {
  const csvFilePath = "airports.csv";
  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return res.status(200).json({ result: jsonObj });
    });
});

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "ManakNight Digital",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      payment,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// routers
const router = require("./routes/orderRouter");
app.use("/", router);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at port 5000");
});
