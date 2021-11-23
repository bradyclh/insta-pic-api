import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { USER_STATUS } from '../enums/UserStatus';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  // Prevent password from being accidentally sent to frontend
  // https://github.com/typestack/class-transformer#skipping-specific-properties
  // Note: Set toPlainOnly will only block this column when returned by controller,
  //       you still can get this column on service.
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ type: 'enum', enum: USER_STATUS })
  status: USER_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Role, { eager: true, cascade: true })
  @JoinTable({ name: 'user_mapping_role' })
  roles: Role[];
}
