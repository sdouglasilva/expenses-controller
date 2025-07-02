import { isPastOrPresentDate } from '@/common/validators/is-past-or-present-date-validator';
import{
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min
} from 'class-validator';

export class CreateExpenseDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  description:string;

  @IsDateString()
  @IsNotEmpty()
  @isPastOrPresentDate()
  date:Date;

  @IsNumber({maxDecimalPlaces:2})
  @Min(0.01)
  value:number;
}