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
    const { text, email } = params as IParam;

    const user = await userServices.create(email);

    messageService.create({
      user_id: user.id,
      text: text
    })

    /** Refatorar e colocar dentro do Service */
    const connection = await connectionService.findBuUserId(user.id);

    if (!connection) {
      await connectionService.create({
        socket_id,
        user_id: user.id
      });
    } else {
      connection.socket_id = socket_id;
      await connectionService.create(connection);
    }

    const allMessages = await messageService.listByUser(user.id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionService.findBySocketId(socket_id);
    

    const message = await messageService.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id
    })

  });
});