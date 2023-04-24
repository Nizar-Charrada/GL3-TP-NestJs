import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import MESSAGE from "src/error/errors";
import { TodoStatusEnum } from "src/todo-module/TodoModel";

export class SearchTodoDto {
    @IsOptional()
    @IsString({
        message: MESSAGE.IS_STRING
    })
    @MaxLength(10, {
        message: MESSAGE.MAX_LENGTH
    })
    data: string;

    @IsOptional()
    @IsEnum(TodoStatusEnum)
    status?: TodoStatusEnum;
}