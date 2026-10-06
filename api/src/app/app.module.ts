import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../datasource';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({ ...dataSourceOptions, synchronize: false }), UsersModule],
})
export class AppModule {}
