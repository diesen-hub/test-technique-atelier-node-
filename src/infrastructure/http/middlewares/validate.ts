import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

interface Schemas {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}

export function validate(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schemas.params)
        req.params = schemas.params.parse(req.params) as Record<string, string>;
      if (schemas.query)
        req.query = schemas.query.parse(req.query) as Record<string, string>;
      if (schemas.body) req.body = schemas.body.parse(req.body) as unknown;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: err.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err);
    }
  };
}
