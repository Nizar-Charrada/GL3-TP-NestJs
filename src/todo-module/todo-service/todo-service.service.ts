import { Inject, Injectable } from '@nestjs/common';
import { UUID_TOKEN } from 'src/common-module/common-module.module';
import { patchTodoDto, postTodoDto } from '../todo.dto';
import { TodoModel } from '../TodoModel';
import { CreateTodoDto } from 'src/dto/create-todo';
import { UpdateTodoTdo } from 'src/dto/update-todo';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  TodoEntity from 'src/entities/TodoEntity';
import { TodoStatusEnum } from '../TodoModel';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Pagination } from 'src/dto/pagination';
import { SearchTodoDto } from 'src/dto/search-todo';
import { SelectQueryBuilder } from 'typeorm';


class Paginate{
    constructor(
        public query: SelectQueryBuilder<TodoEntity>, 
        private queryString: Pagination,
    ){}

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 3
        const skip = (page - 1) * limit
        this.query = this.query.offset(skip).limit(limit)
        return this;
    }
}


@Injectable()
export class TodoService {
	constructor(@Inject(UUID_TOKEN) private uuid,
		@InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>) {}

		
	private todos: TodoModel[] = [];
	getTodos(): TodoModel[] {
		return this.todos;
	}

	getAllDb({status, data, ...pagination}: Omit<Pagination, keyof SearchTodoDto> & SearchTodoDto){
        const qb = this.todoRepository.createQueryBuilder("todo");
        if(data) 
            qb.where("todo.name Like :data", { data: '%' + data + '%' })
            .orWhere("todo.description Like :data", { data: '%' + data + '%' })
        if(status) qb.orWhere("todo.status= :statusParam", { statusParam: status });
        const feature = new Paginate(qb, pagination).paginating();
        return feature.query.getMany();
    }


	addTodo(todo: CreateTodoDto) {
		const newTodo = new TodoModel(Object.assign(todo, { id: this.uuid() }));
		this.todos.push(newTodo);
		return newTodo;
	}
	getTodoById(id: string): TodoModel {
		return this.todos.find((todo) => todo.id === id);
	}
	deleteTodoById(id: string): number {
		const intitalLength = this.todos.length;
		this.todos = this.todos.filter((todo) => todo.id !== id);
		return intitalLength - this.todos.length;
	}
	updateTodoById(id: string, todo: UpdateTodoTdo) {
		const newTodo = this.todos.find((todo) => todo.id === id);
		if (!newTodo) {
			return null;
		}
		const { name, description, status } = todo;
		if (name) {
			newTodo.name = name;
		}
		if (description) {
			newTodo.description = description;
		}
		if (status) {
			newTodo.status = status;
		}
		return newTodo;
	}
	createTodoDb(data: CreateTodoDto){
        const todo = new TodoEntity();
        
        todo.name = data.name;
        todo.description = data.description;
        todo.status = TodoStatusEnum.waiting;

        return this.todoRepository.save(todo);
    }
	async getByIdDb(id: string) {
        const todo = await this.todoRepository.findOne({ where: [{ id: id }] });
        if(!todo) throw new BadRequestException("ToDo Not Found");
        return todo
    }
	async deleteByIdDb(id: string){
        const todo = await this.todoRepository.findOneBy({id})
        console.log(id)
        if(!todo) throw new NotFoundException("Todo doesn't exist.")

        this.todoRepository.softDelete(id)
        return todo;
    }

	async updateTodoDb(data: UpdateTodoTdo) {
        const elem = await this.todoRepository.findOneBy({id: data.id});
        if(!elem) throw new NotFoundException("Todo doesn't exist.")

        elem.description = data.description ?? elem.description;
        elem.name = data.name ?? elem.name;
        elem.status = data.status ?? elem.status;

        return this.todoRepository.save(elem);
    }

	restoreById(id: string){
        return this.todoRepository.restore(id);
    }

	async getStats(){
        return {
            actif: await this.todoRepository.countBy({status: TodoStatusEnum.actif}),
            done: await this.todoRepository.countBy({status: TodoStatusEnum.done}),
            waiting: await this.todoRepository.countBy({status: TodoStatusEnum.waiting}),
        }
    }

	

}
