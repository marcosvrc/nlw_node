import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate{
  chat: boolean;
  username: string;
}

class SettingsService {

  private settingRepository: Repository<Setting>;

  constructor() {
    this.settingRepository = getCustomRepository(SettingsRepository);
  }

  async create({chat, username} : ISettingsCreate) {
  
    const userAlreadyExists = await this.settingRepository.findOne({
      username
    });

    if(userAlreadyExists){
      throw new Error("User already exists!");
    }

    const setting = this.settingRepository.create({
      chat,
      username
    });

    await this.settingRepository.save(setting);

    return setting;
  }

  async findByUserName(username: string) {
    const setting = await this.settingRepository.findOne({
      username,
    });

    return setting;
  }

  async update(username: string, chat: boolean) {
    const settings = await this.settingRepository
      .createQueryBuilder()
      .update(Setting)
      .set({chat})
      .where("username = :username", {
        username: username
      })
      .execute();
  }
}

export { SettingsService };