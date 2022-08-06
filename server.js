const app = require("./index");

const connect = require("./src/configs/db");

app.listen(5000, async () => {
  try {
    await connect();
    console.log("Listening on port 5000");
  } catch (error) {
    console.log(error);
  }
});
