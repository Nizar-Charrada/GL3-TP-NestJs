import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

import { TodoStatusEnum } from "src/todo-module/TodoModel";
import { CreateTodoDto } from "src/dto/create-todo";

export class UpdateTodoTdo extends PartialType(CreateTodoDto) {
    id: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status?: TodoStatusEnum;
}