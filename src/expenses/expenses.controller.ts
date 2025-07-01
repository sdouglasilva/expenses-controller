import { Controller,
  Get,
  Post,
  Body,
  UseGuards
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { AuthGuard} from '@nestjs/passport';
import { AuthUser } from '@/common/auth-user.decorator';
import { User } from '@/users/entities/user.entity';

@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService){
  }
  @Post()
  create(
    @Body() createExpenseDto: CreateExpenseDto,
    @AuthUser() user: User,
  ){
    return this.expensesService.create(createExpenseDto, user)
  }
  @Get()
  findAll(@AuthUser() user: User){
    return this.expensesService.findAll(user)
  }
}
