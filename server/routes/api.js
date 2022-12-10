const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/userSchema");
const request = require("request");
require("dotenv").config();
router.post("/user", async (req, res) => {
    const user = new User(req.body);
    try {
        user.save();
        res.status(201).send(user);
    } catch(e) {
        res.status(400).json(e);
    }
})

router.post("/orders", async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    try {
        const options = {
            amount: req.body.amount*100,
            currency: "INR",
            receipt: crypto.randomBytes(9).toString("hex")
        };

        instance.orders.create(options, (error, order) => {
            if(error) {
                return res.status(500).json({error:error});
            }
            res.json({order});
        })
    } catch(e) {
        console.log(e);
    }
})
router.get("/payment/:id", async(req, res) => {
    request(`https://rzp_test_mimGIRoojPvT79:4C1tz4qhDMrSFbErVqgYNPyu@api.razorpay.com/v1/payments/${req.params.id}`,(err, response, body)=>{
        res.json(JSON.parse(body))
    });
})
router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
			.update(sign.toString())
			.digest("hex");
		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;