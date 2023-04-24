import {
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Param,
	Body,
	Version,
	Query,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { TodoModel } from '../TodoModel';
import { patchTodoDto, postTodoDto } from '../todo.dto';
import {CreateTodoDto} from 'src/dto/create-todo';
import {SearchTodoDto} from 'src/dto/search-todo';
import {UpdateTodoTdo} from 'src/dto/update-todo';
import { TodoService } from '../todo-service/todo-service.service';
import { Pagination } from 'src/dto/pagination';


@Controller('todo')
export class TodoControllerController {
	constructor(private todoService: TodoService) {}
	@Get()
	getTodos(): TodoModel[] {
		return this.todoService.getTodos();
	}

	@Get()
    @Version("2")
    getTodosDb(@Query() queryParam: Omit<Pagination, keyof SearchTodoDto> & SearchTodoDto){
        return this.todoService.getAllDb(queryParam)
    }


	@Post()
    createTodo(@Body() body: CreateTodoDto){
        return this.todoService.addTodo(body);
    }

    @Version("2")
    @Post()
    createTodoDb(@Body() body: CreateTodoDto){
        return this.todoService.createTodoDb(body);
    }


	@Get(':id')
	getTodoById(@Param('id') id: string) {
		const todo = this.todoService.getTodoById(id);
		if (!todo) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return this.todoService.getTodoById(id);
	}
	@Delete(':id')
	deleteTodoById(@Param('id') id: string) {
		return this.todoService.deleteTodoById(id);
	}

	@Delete('/:id')
    @Version("2")
    deleteTodoDb(@Param('id') id: string){
        return this.todoService.deleteByIdDb(id);
    }


	@Patch(':id')
	updateTodoById(@Param('id') id: string, @Body() todo: UpdateTodoTdo) {
		const todoToUpdate = this.todoService.updateTodoById(id, todo);
		if (!todoToUpdate) {
			throw new NotFoundException("Todo doesn't exist");
		}
		return todoToUpdate;
	}

	@Version("2")
    @Patch()
    updateTodoDb(@Body() body: UpdateTodoTdo){
        return this.todoService.updateTodoDb(body);
    }

	@Get("/stats")
    @Version("2")
    getStatsTodoDb(){
        return this.todoService.getStats();
    }

	@Version("2")
    @Post("/restore/:id")
    restoreTodoDb(@Param('id') id: string){
        return this.todoService.restoreById(id)
    }
}
