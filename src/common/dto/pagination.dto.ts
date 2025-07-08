import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number; //Signo de interrogacion para decirle a ts que es opcional

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number
}
