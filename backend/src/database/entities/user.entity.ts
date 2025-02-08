import { IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { History } from './history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 50 })
  email: string;

  @OneToMany(() => History, (history) => history.user)
  history: History[];
}
