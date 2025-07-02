import { Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { AuthGuard} from '@nestjs/passport';
import { AuthUser } from '@/common/auth-user.decorator';
import { User } from '@/users/entities/user.entity';
import { UpdateExpenseDto } from './dto/update-expense.dto';

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
  @Get(':id')
  findOne(@Param('id')id: string, @AuthUser() user: User){
    return this.expensesService.findOne(id,user);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @AuthUser() user:User,
  ){
    return this.expensesService.update(id, updateExpenseDto, user)
  }
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id')id: string, @AuthUser() user : User){
    return this.expensesService.remove(id,user)
  }
}
