import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';

import { User } from '@/common/decorators';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { ITaskResponse } from './types/types-response.interface';

@Controller('tasks')
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @User() currentUser: UserEntity,
    @Body('task') createTaskDto: CreateTaskDto,
  ): Promise<ITaskResponse> {
    const task = await this.tasksService.createTask(currentUser, createTaskDto);
    return this.tasksService.buildTaskResponse(task);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<ITaskResponse> {
    const task = await this.tasksService.findOne(id);
    return this.tasksService.buildTaskResponse(task);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.tasksService.update(+id);
  }

  @Delete(':id')
  async deleteTask(@User('id') @Param('id') id: number) {
    return await this.tasksService.deleteTask(id);
  }
}
