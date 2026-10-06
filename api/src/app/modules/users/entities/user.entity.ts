import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  Patient = 'patient',
  Physician = 'physician',
  Advocate = 'advocate',
  Internal = 'internal',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  // Existing rows and users created without a type become patients.
  @Column({ type: 'enum', enum: UserType, default: UserType.Patient })
  type: UserType;
}
