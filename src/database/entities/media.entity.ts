import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  type: boolean;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Column({ length: 50 })
  title: string;

  @Column()
  duration: number;
}
