import express, { Request, Response } from "express";
import cors from "cors";

import { Environment } from "./configs/environment";
import { router as superheroRouter } from "./modules/superheros/superhero.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import "./db/db";

const app = express();
const port = Environment.PORT;

app.use(cors());
app.use(express.json());

app.use("/superheros", superheroRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
