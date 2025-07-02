import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from '@/users/entities/user.entity';
import { UpdateExpenseDto } from './dto/update-expense.dto';


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
  async findOne(id:string, user: User): Promise<Expense>{
    const expense = await this.expensesRepository.findOneBy({id, user:{id: user.id}});
    if(!expense){
      throw new NotFoundException(`Despesa com ID"${id} - Não encontrado"`)
    }
    return expense;
  }
  async update(id: string, updateExpenseDto: UpdateExpenseDto, user: User): Promise<Expense>{
    const expense = await this.findOne(id,user);
    Object.assign(expense, updateExpenseDto)
    return this.expensesRepository.save(expense);
  }
  async remove(id:string, user: User): Promise<Expense>{
    const expense = await this.findOne(id,user);
    return this.expensesRepository.remove(expense)
  }
}
