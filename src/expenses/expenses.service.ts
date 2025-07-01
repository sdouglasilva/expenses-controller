import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from '@/users/entities/user.entity';


@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>
  ){}

  async create(createExpenseDto: CreateExpenseDto, user: User): Promise<Expense>{
    const newExpense = this.expensesRepository.create({
      ...createExpenseDto,
      user: user,
    });
    return this.expensesRepository.save(newExpense);
  }
  async findAll(user:User): Promise<Expense[]>{
    return this.expensesRepository.find({
      where:{
        user:{
          id: user.id
        },
      },
    });
  }
}
