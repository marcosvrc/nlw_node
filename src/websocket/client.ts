import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService"

interface IParam {
  text: string,
  email: string;
}

io.on("connect", (socket) => {
  const connectionService = new ConnectionsService();
  const userServices = new UsersService();
  const messageService = new MessagesService();

  socket.on("client_first_access", async (params) => {
    
    const socket_id = socket.id;
    const { text, email} = params as IParam;

    const user = await userServices.create(email);
    
    messageService.create({
      user_id: user.id,
      text: text
    })

    /** Refatorar e colocar dentro do Service */
    const connection = await connectionService.findBuUserId(user.id);
    
    if(!connection){
      await connectionService.create({
        socket_id,
        user_id: user.id
      });
    }else {
      connection.socket_id = socket_id;
      await connectionService.create(connection);
    }
    

    // Salvar a conexão com o socket_id, user_id
  })
});