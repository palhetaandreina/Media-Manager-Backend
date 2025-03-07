import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  type: boolean;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => User, (user) => user.media)
  user: User;

  @Column({ length: 50 })
  title: string;

  @Column()
  duration: number;

  @Column('datetime', { nullable: true })
  date: Date;
}
