import express from "express";
import nodemailer from "nodemailer";
import twilio from "twilio";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // 1. Send Email Notification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "santoshmishras951@gmail.com",
        subject: `New Portfolio Message: ${subject}`,
        text: `You have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);

      // 2. Send SMS Notification (Twilio)
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
          body: `New Portfolio Message from ${name}: ${message.substring(0, 100)}...`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: "+919668139559",
        });
      }

      res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
