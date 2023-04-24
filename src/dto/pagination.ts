import { IsNumber, IsOptional } from "class-validator";

export class Pagination {
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}