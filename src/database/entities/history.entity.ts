import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from './media.entity';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => User, (user) => user.id)
  user: User;

  @OneToMany((type) => Media, (media) => media.id)
  media: Media;

  @Column('datetime')
  date: Date;
}
