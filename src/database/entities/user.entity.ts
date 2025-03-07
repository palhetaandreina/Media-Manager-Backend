import { IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from './media.entity';

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

  @OneToMany(() => Media, (media) => media.user)
  media: Media[];
}
