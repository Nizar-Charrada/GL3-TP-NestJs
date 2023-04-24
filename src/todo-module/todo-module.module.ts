import { Module } from '@nestjs/common';
import { TodoControllerController } from './todo-controller/todo-controller.controller';
import { TodoService } from './todo-service/todo-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from 'src/entities/TodoEntity';

@Module({
	imports: [TypeOrmModule.forFeature([TodoEntity])],
	controllers: [TodoControllerController],
	providers: [TodoService],
})
export class TodoModuleModule {}
