import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ){}

  async getUsers(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<Users> {
    return await this.userRepository.findOne({where: {userId}});
  }

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
