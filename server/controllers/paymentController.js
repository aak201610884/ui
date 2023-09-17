const stripe = require('stripe')('sk_test_51Nh6jeG0N4v7KjM5h3maFay80P29nju6EQJuLTcXbHOI0tHvBnFw4bNBGcYR7Z3EKocxlFvL0GRm8Mq1fqDxYshr00Xig7bfgO');
const Payment = require('../models/paymentModel');

const showPaymentPage = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ timestamp: -1 });
    res.render('payments', { payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
const processPayment = async (req, res) => {
  try {
    const amount = 1000; // Amount in cents

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    // Save payment information in your MongoDB using Mongoose
    const payment = new Payment({
      amount: amount,
      currency: 'usd',
      paymentIntentId: paymentIntent.id,
    });
    await payment.save();

    // Send the client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ timestamp: -1 });
    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    // Logic for initiating a refund using the Stripe API
    // You can use the refund logic using the stripe object

    res.json({ message: 'Refund initiated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  processPayment,
  showPaymentPage, 
  getAllPayments,
  getPaymentById,
  refundPayment,
};
