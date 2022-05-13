import express from "express"
import dotenv from "dotenv"
import path from "path"
import * as sessionAuth from "./middleware/sessionAuth"
import * as routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

sessionAuth.register(app);

routes.register(app);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
