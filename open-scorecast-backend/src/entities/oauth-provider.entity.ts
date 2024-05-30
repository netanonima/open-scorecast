import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserOAuth } from './user-oauth.entity';

@Entity()
export class OAuthProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  authorizationUrl: string;

  @Column()
  tokenUrl: string;

  @Column()
  callbackUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserOAuth, (userOAuth) => userOAuth.oauthProvider)
  userOAuths: UserOAuth[];
}
