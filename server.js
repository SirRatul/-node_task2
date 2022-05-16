const express = require("express");
const csvtojson = require("csvtojson");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

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

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log(stripeSecretKey, stripePublicKey);

// routers
const router = require("./routes/orderRouter");
app.use("/", router);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at port 5000");
});
