import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: err.errors || 'Erro interno do servidor.',
    });
  }
};