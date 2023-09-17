const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

// Display the payment page (GET)
router.get('/', paymentController.showPaymentPage);

// Process a payment (POST)
router.post('/charge', paymentController.processPayment);

// Retrieve a list of all payments (GET)
router.get('/payments', paymentController.getAllPayments);

// Retrieve a specific payment by ID (GET)
router.get('/payments/:id', paymentController.getPaymentById);

// Refund a payment by ID (POST)
router.post('/payments/:id/refund', paymentController.refundPayment);

module.exports = router;