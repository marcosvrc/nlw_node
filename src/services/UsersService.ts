import { UsersRepository } from "../repositories/UsersRepository"
import { Repository, getCustomRepository } from "typeorm"
import { User } from "../entities/User"

class UsersService {

  private userRepository: Repository<User>;
  
  constructor(){
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string){
    const userRepository = new UsersRepository();
    
    //Verificando se usuário existe
    const userExists = await this.userRepository.findOne({
      email
    })

    //Se existir, retornar user
    if(userExists){
      return userExists;
    }

    const user = this.userRepository.create({
      email
    })

    //Se não existir, salvar no banco de dados
    await this.userRepository.save(user);

    return user;
  }

}

export { UsersService };