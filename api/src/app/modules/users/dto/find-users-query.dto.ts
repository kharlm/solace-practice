import { IsEnum, IsOptional } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class FindUsersQueryDto {
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;
}
