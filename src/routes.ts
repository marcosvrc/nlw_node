import { Router } from "express"
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";
import { MessagesController } from "./controllers/MessagesController";
import { ConnectionsController } from "./controllers/ConnectionsController";

const routes = Router();
const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
//const connectionsController = new ConnectionsController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUserName);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);
//routes.post("/connections", connectionsController.create);


export { routes }