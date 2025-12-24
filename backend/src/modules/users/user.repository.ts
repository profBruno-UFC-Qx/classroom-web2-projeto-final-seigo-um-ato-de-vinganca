import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";
import { Repository } from "typeorm";

export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repo.create(userData);
    return await this.repo.save(user);
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return await this.repo.findOne({
      where: [
        { email: email },
        { username: username }
      ]
    });
  }

  async findForLogin(identifier: string): Promise<User | null> {
    return await this.repo.createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :identifier OR user.username = :identifier", { identifier })
      .getOne();
  }

  async findById(id: number): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }
}