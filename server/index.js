import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { studentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/Student.js";
import { Admin } from "./models/Admin.js";
// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  const books = await Book.find({});
  return res.json(books);
});

app.use(cookieParser());
dotenv.config();
app.use("/auth", AdminRouter);
app.use("/student", studentRouter);
app.use("/book", bookRouter);
app.use("/dashboard", async (req, res) => {
  // Note the correct order: req, res
  try {
    const studentCount = await Student.countDocuments();
    const adminCount = await Admin.countDocuments();
    const bookCount = await Book.countDocuments();
    return res.json({
      ok: true,
      student: studentCount,
      admin: adminCount,
      book: bookCount,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
