require("dotenv").config();

const express = require("express");
const cors = require("cors");

const port = process.env.API_PORT || 3332;

const app = express()

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));