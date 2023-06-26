import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '@/users/entities/user.entity';

import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (subCategory) => subCategory.subCategories)
  userId: number;

  constructor(payload?: CreateSubCategoryDto) {
    if (!payload) return;
    this.name = payload.name;
  }
}
