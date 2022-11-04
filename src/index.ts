import express from "express";
import "dotenv/config";
import { bankAccountRouter } from "./api/routes/bankAccount";
import { profileRouter } from "./api/routes/profile";
const app = express();
const port = +process.env.PORT_KEY;

app.use(express.json());

app.use("/profile", profileRouter);

app.use("/bankAccount", bankAccountRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
