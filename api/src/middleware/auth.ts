import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    // decode jwt token data
    const decoded = jwt.verify(token, "your_super_secret_key_here");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== 'seller') {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  next();
}
