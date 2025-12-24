import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (allowedRoles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({ message: "Token error" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: "Token malformatted" });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!req.body) {
        req.body = {};
      }

      req.body.userId = decoded.id;
      req.body.userRole = decoded.role;
      
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};