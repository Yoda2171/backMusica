import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

 

  registerUser(createUserDto: CreateAuthDto) {
    const { username, password } = createUserDto;

    const newUser = this.authRepository.create({
      username,
      password,
    });

    return this.authRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    try {
      const dataFind = await this.authRepository.findOne({ where: { username } });

      if (!dataFind) {
        return {
          success: false,
          data: 'Usuario no encontrado',
        };
      }

      if (dataFind.password !== password) {
        return {
          success: false,
          data: 'Correo o contraseña Invalida',
        };
      }

      return {
        success: true,
        data: { ...dataFind },
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }

  getAllUsers() {

    
  }

  getUserById(id: string) {
    
  }

  updateUser(id: string, updateUserDto: UpdateAuthDto){
    
  }

  deleteUser(id: string): void {
    
  }
}
