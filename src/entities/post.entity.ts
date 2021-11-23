import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Picture } from './picture.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // as active/inactive
  deletedAt?: Date;

  @ManyToMany(() => Picture, { eager: true, cascade: true })
  @JoinTable({ name: 'post_mapping_picture' })
  pics: Picture[];
}
