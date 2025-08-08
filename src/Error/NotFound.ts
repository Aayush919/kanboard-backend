import { NextFunction, Request, Response } from "express";
import { ErrorResponse,STATUS_CODE } from "../Api";


const NotFound: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
  return ErrorResponse(res, STATUS_CODE.NOT_FOUND,`Route not found : ${req.originalUrl}`)
};

export { NotFound };
