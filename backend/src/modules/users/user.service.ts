import { UserRepository } from "./user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.entity";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async register(data: User) {
    const existingUser = await this.userRepo.findByEmailOrUsername(data.email, data.username);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await this.userRepo.create({
      ...data,
      password: hashedPassword,
      role: 'authenticated',
      confirmed: true
    });
    
    const token = this.generateToken(user);
    const { password, ...userResponse } = user;
    
    return { jwt: token, user: userResponse };
  }

  async login(identifier: string, pass: string) {
    const user = await this.userRepo.findForLogin(identifier);

    if (!user || !user.confirmed || user.blocked) {
      throw new Error("Invalid credentials or user blocked");
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = this.generateToken(user);
    const { password, ...userResponse } = user;

    return {
      jwt: token,
      user: userResponse
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  private generateToken(user: User) {
    return jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "7d" }
    );
  }
}