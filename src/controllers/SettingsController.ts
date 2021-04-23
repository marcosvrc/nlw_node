import { request, Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";


class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    const settingService = new SettingsService();
    try{
      const setting = await settingService.create({chat, username});
      return response.json(setting);
    }catch(err){
      return response.status(400).json({
        message: err.message,
      })
    }
  }

  async findByUserName(request: Request, response: Response) {
    const { username } = request.params;
    const settingService = new SettingsService();

    const setting = await settingService.findByUserName(username);

    return response.json(setting);
  }

  async update (request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingService = new SettingsService();

    const setting = await settingService.update(username, chat);

    return response.json(setting);
  }
}

export { SettingsController };
