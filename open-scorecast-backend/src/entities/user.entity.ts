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
  oauth_provider: string;

  @Column({ length: 255, nullable: true, unique: true })
  oauth_provider_id: string;

  @Column('text', { nullable: true })
  oauth_access_token: string;

  @Column('text', { nullable: true })
  oauth_refresh_token: string;

  @Column('text', { nullable: true })
  profile_picture_url: string;

  @Column('timestamp', { nullable: true })
  token_expiry: Date;
}
