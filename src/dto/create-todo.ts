import { IsNotEmpty, IsString, MaxLength, MinLength, ValidationArguments } from "class-validator";
import MESSAGE from "src/error/errors";

export class CreateTodoDto {
    @IsString({
        message: MESSAGE.IS_STRING
    })
    @IsNotEmpty({
        message: MESSAGE.NOT_EMPTY
    })
    @MinLength(3, {
        message: MESSAGE.MIN_LENGTH
    })
    @MaxLength(10, {
        message: MESSAGE.MAX_LENGTH
    })
    name: string;

    @IsString({
        message: MESSAGE.IS_STRING
    })
    @IsNotEmpty({
        message: MESSAGE.NOT_EMPTY
    })
    @MinLength(10, {
        message: MESSAGE.MIN_LENGTH
    })
    description: string;
}