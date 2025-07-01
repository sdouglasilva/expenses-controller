import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Expense]), AuthModule],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
