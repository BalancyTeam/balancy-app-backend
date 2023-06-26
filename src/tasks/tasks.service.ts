import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';
import { ITaskResponse } from './types/types-response.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async createTask(
    currentUser: UserEntity,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    task.userId = currentUser.id;
    return await this.taskRepository.save(task);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  update(id: number) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    const task = await this.findOne(id);
    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }
    return await this.taskRepository.delete({ id });
  }

  buildTaskResponse(task: TaskEntity): ITaskResponse {
    return { task };
  }
}
