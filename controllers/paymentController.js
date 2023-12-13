import axios from "axios";

// Handle Gcash payment
export const handlePaymentGcashController = async (req, res) => {
  try {
    const { referenceNumber, cart } = req.body;

    // Perform necessary validation

    // Send Gcash payment request to your backend or handle as needed
    const response = await axios.post("/api/v1/payment/gcash/process", {
      referenceNumber,
      cart,
    });

    // Process the response and send appropriate data back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
