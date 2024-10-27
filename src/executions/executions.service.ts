import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateExecutionDto,
  ExecutionCreationAttributes,
} from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Execution } from './entities/execution.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ExamService } from 'src/exam/exam.service';

@Injectable()
export class ExecutionsService {
  constructor(
    @InjectRepository(Execution)
    private executionRepository: Repository<Execution>,
    private userService: UsersService,
  ) {}
  async createExecution(
    createExecutionDto: CreateExecutionDto,
  ): Promise<Execution> {
    try {
      const existingUser = await this.userService.getUser(
        createExecutionDto.userId,
      );
      const userHasExecutionOpen = await this.executionRepository.findOne({
        where: {
          userId: existingUser?.userId,
          examId: createExecutionDto.examId,
        },
      });

      if (userHasExecutionOpen) {
        throw new ConflictException(
          'This user already has open incompleted exam',
        );
      }

      const execution = this.executionRepository.create(
        createExecutionDto as ExecutionCreationAttributes,
      );
      const createExecution = await this.executionRepository.save(execution);

      console.warn('Execution created successfully');
      return createExecution;
    } catch (error) {
      console.error('Error creating execution:', error);
      throw new ConflictException(
        'This user already has open incompleted exam',
      );
    }
  }

  findAll() {
    return `This action returns all executions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} execution`;
  }

  update(id: number, updateExecutionDto: UpdateExecutionDto) {
    return `This action updates a #${id} execution`;
  }

  remove(id: number) {
    return `This action removes a #${id} execution`;
  }
}
