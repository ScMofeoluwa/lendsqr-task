import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationErrorItem } from "joi";

class RequestBodyMiddleware {
  validate(schema: AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error === undefined) {
        return next();
      }
      //@ts-ignore
      const errResponse = this.formatError(error?.details);
      return res.status(400).send({ message: errResponse, data: null });
    };
  }

  private formatError(arr: ValidationErrorItem[]) {
    return arr.map((err) => err.message);
  }
}

export default new RequestBodyMiddleware();
