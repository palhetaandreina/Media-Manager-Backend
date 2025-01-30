import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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
}
