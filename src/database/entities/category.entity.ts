import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;
}
