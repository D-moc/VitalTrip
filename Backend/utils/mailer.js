import nodemailer from "nodemailer";

export const sendResetEmail = async (email, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"VitalTrip Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your VitalTrip Password",
      html: `
        <div style="font-family:sans-serif;">
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password. This link will expire in 10 minutes:</p>
          <a href="${link}" 
             style="display:inline-block;background:#20b2aa;color:white;
             padding:10px 20px;border-radius:5px;text-decoration:none;">
             Reset Password
          </a>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log(`Password reset email sent to ${email}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
