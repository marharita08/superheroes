import express, { Request, Response } from "express";
import { Environment } from "./configs/environment";

const app = express();
const port = Environment.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
