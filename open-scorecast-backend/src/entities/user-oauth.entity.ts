import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { OAuthProvider } from './oauth-provider.entity';

@Entity()
export class UserOAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userOAuths)
  user: User;

  @ManyToOne(() => OAuthProvider, (oauthProvider) => oauthProvider.userOAuths)
  oauthProvider: OAuthProvider;

  @Column()
  oauthId: string;

  @Column('text')
  accessToken: string;

  @Column('text', { nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
