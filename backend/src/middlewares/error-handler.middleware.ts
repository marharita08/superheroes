import { Request, Response, NextFunction } from "express";

const errorHandler = async (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  const { message } = err;
  res.status(500).send(message);
  return next();
};

export { errorHandler };
