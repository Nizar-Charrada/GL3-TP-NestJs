import { TodoStatusEnum } from "../todo-module/TodoModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import AddDate from "./Date";

@Entity("todo")
export default class TodoEntity extends AddDate{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar"
    })
    name: string;

    @Column({
        type: "varchar"
    })
    description: string;

    @Column({
        type: "enum",
        enum: TodoStatusEnum,
        default: TodoStatusEnum.waiting
    })
    status: TodoStatusEnum;
}