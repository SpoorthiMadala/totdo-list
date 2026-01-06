import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL
        },
        to: [
          {
            email: email
          }
        ],
        subject: "Your OTP for Todo App Verification",
        htmlContent: `
          <html>
            <body style="font-family: Arial;">
              <h2>Todo App Verification</h2>
              <p>Your OTP is:</p>
              <h1 style="letter-spacing:8px;">${otp}</h1>
              <p>Valid for 10 minutes.</p>
              <p><strong>Do not share this OTP.</strong></p>
            </body>
          </html>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      }
    );

    console.log("✅ OTP Email sent:", response.data.messageId);
    return { success: true, messageId: response.data.messageId };

  } catch (error) {
    console.error(
      "❌ Brevo API Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send OTP email via Brevo API");
  }
};
