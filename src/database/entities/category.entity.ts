import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;
}
