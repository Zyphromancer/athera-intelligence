require("dotenv").config();
const { createApp } = require("./src/app");

const app = createApp();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Outrank webhook service listening on port ${port}`);
});
