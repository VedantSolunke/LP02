const express = require("express");
const path = require("path");

const app = express();
const PORT = 4001;

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
