import express from "express";
import cors from "cors";
import ragRouter from "./routes/rag";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LawBandit RAG API is running 🚀");
});

app.use("/api/rag", ragRouter);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
