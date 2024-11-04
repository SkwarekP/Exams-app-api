import {
  ConflictException,
  Injectable,
  NotFoundException,
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

  async updateExecution(executionId: string, updateExecutionDto: UpdateExecutionDto): Promise<Execution> {
    const execution = await this.executionRepository.findOne({where: {executionId: executionId}})
    if(!execution) {
      throw new NotFoundException('Execution not found');
    }

    console.log("execution", execution)
    //@TODO save new answer to the array correctly
    const updateExecution = Object.assign(execution, updateExecutionDto)

    return updateExecution
  }

  async findExecution(executionId: string): Promise<Execution> {
    const execution = await this.executionRepository.findOne({where: {executionId: executionId}})

    if(!execution) {
      throw new NotFoundException("Execution not found")
    }

    return execution;
  }

  remove(id: number) {
    return `This action removes a #${id} execution`;
  }
}
