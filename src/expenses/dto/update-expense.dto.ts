import { PartialType } from "@nestjs/mapped-types";
import { CreateExpenseDto } from "./create-expense.dto";
import { IsDateString, IsOptional } from "class-validator";
import { isPastOrPresentDate } from "@/common/validators/is-past-or-present-date-validator";
export class UpdateExpenseDto extends PartialType(CreateExpenseDto){
  @IsOptional()
  @IsDateString()
  @isPastOrPresentDate()
  date?: Date;
}


