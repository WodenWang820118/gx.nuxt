import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn('varchar')
  id!: string;

  @Column('varchar')
  user_id!: string;

  @Column('varchar')
  title!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  image?: string;

  @Column('varchar', { nullable: true })
  category?: string;

  @Column('integer')
  quantity!: number;

  @Column('integer')
  price!: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
