import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from '../users/entities/user.entity';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
    private readonly mailService: MailService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, user: User): Promise<Expense> {
    const newExpense = this.expensesRepository.create({
      ...createExpenseDto,
      user: user,
    });

    const savedExpense = await this.expensesRepository.save(newExpense);

    try {
      await this.mailService.sendMail(
        user.email,
        'Despesa Cadastrada',
        `Olá, ${user.name}! Sua despesa "${savedExpense.description}" no valor de R$ ${savedExpense.value} foi cadastrada com sucesso.`,
      );
    } catch (emailError) {
      console.error('O e-mail de confirmação não pôde ser enviado.', emailError);
    }

    return savedExpense;
  }

  async findAll(user: User): Promise<Expense[]> {
    return this.expensesRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async findOne(id: string, user: User): Promise<Expense> {
    const expense = await this.expensesRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!expense) {
      throw new NotFoundException(`Despesa com ID "${id}" não encontrada.`);
    }
    return expense;
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const expense = await this.findOne(id, user);
    Object.assign(expense, updateExpenseDto);
    return this.expensesRepository.save(expense);
  }

  async remove(id: string, user: User): Promise<void> {
    const expense = await this.findOne(id, user);
    await this.expensesRepository.remove(expense);
  }
}
