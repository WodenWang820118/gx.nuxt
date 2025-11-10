import 'reflect-metadata';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string; // Firebase UID

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  photo_url?: string;

  @Column({ type: 'varchar', length: 50, default: 'email' })
  auth_provider!: string; // 'email', 'google'

  @Column({ type: 'boolean', default: false })
  email_verified!: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
