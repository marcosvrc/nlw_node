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
}

export { SettingsController };
