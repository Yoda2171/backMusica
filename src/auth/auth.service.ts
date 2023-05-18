import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private users: Auth[] = [
    { id:'sdasdasda', username:'pablo', password:'123456'},
  ];

  registerUser(createUserDto: CreateAuthDto): Auth {
    const { username, password } = createUserDto;
    const user: Auth = {
      id: uuid(),
      username,
      password,
    };
    this.users.push(user);
    return user;
  }

  loginUser(loginUserDto: LoginUserDto): Auth {
    const { username, password } = loginUserDto;
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }
    return user;
  }

  getAllUsers(): Auth[] {
    return this.users;
  }

  getUserById(id: string): Auth {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateAuthDto): Auth {
    const { username, password } = updateUserDto;
    const user = this.getUserById(id);
    user.username = username;
    user.password = password;
    return user;
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
