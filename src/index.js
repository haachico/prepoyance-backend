require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/test", (req, res) => {
//   res.json({ message: "Server is running" });
// });

const tasksRoutes = require("./routes/tasksRoutes");
app.use("/api", tasksRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, message });
});
