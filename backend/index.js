const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const apify = require("../backend/routes/apify");

app.use(cors("*"));
app.use(express.json());

app.use("/api", apify);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
