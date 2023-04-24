import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
import { CommonModuleModule } from './common-module/common-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from './entities/TodoEntity';

@Module({
	imports: [PremierModule, TodoModuleModule, CommonModuleModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "127.0.0.1",
			username: "root",
			password: "",
			entities: [TodoEntity],
			database: "database",
			synchronize: true
		  })],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
