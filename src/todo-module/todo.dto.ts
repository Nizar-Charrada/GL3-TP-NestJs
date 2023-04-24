import { TodoStatusEnum } from './TodoModel';
export class patchTodoDto {
	name?: string;
	description?: string;
	status?: TodoStatusEnum;
}
export class postTodoDto {
	name: string;
	description: string;
	status?: TodoStatusEnum;
}
