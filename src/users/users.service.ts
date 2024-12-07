import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async getUserByName(username_: string): Promise<User> {
    return await this.userRepository.findOne({where: {username: username_}})
  }

  async createNewUser(createUserDto: CreateUserDto) {
    const existingUser = await this.checkIfUserExists(createUserDto.email)
    if (existingUser) {
      throw new ConflictException(`A user with this email already exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword, 
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role,
      email: createUserDto.email
    });

    return this.userRepository.save(newUser);

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkIfUserExists(email: string) {
    const user = await this.userRepository.findOne({where: {email}})

    if(user) {
      return true;
    }

    return null;
  }
}
