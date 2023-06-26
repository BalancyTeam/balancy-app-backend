import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

import { SubCategory } from '@/sub-categories/entities/sub-category.entity';

import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory, UserEntity])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
