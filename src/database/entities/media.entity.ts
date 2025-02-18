import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { History } from './history.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  type: boolean;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @OneToMany(() => History, (history) => history.media)
  history: History[];

  @Column({ length: 50 })
  title: string;

  @Column()
  duration: number;
}
