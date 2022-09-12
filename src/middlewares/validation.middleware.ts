import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
const validationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validateData = await schema.validate(data);
      req.body = validateData;
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: error.errors?.join(", "),
      });
    }
  };

export default validationMiddleware;
