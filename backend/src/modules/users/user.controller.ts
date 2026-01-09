import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const result = await userService.register(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;
      const result = await userService.login(identifier, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const user_id = req.body.user_id; 
      const user = await userService.getProfile(user_id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}