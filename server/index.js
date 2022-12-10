const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require('./routes/api');
const app = express();

app.use(express.json());
app.use(cors());
app.use(apiRouter);
mongoose.connect("mongodb://localhost:27017/payment-gateway", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log("DB connected"))
.catch((e) => console.log(e))

const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});