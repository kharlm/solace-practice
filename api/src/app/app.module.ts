import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../datasource';
import { NotesModule } from './modules/notes/notes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({ ...dataSourceOptions, synchronize: false }), UsersModule, NotesModule],
})
export class AppModule {}
