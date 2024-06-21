import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ length: 50, nullable: true })
  provider: string;

  @Column({ length: 255, nullable: true, unique: true })
  provider_id: string;

  @Column('text', { nullable: true })
  refresh_token: string;
}
